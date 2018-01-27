const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

let Project = require('../models/project').Project;
let User = require('../models/user').User;
let Item = require('../models/item').Item;
let Sprint = require('../models/sprint').Sprint;

const image = require('../modules/image');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

async function getAllUserProjects(req, res) {
    try {
        let projects = (await User.findById(req.user._id)
            .populate({
                path: 'projects',
                model: Project,
                options: {
                    sort: { start_date: -1 }
                },
                populate: [
                    { path: 'lead', model: User },
                    { path: 'members', model: User }
                ]
            })
            .exec()).toObject().projects;
        if (req.query.q) {
            let query = req.query.q.toLowerCase().trim();
            projects = projects.filter(project => {
                return project.name.toLowerCase().trim().includes(query);
            });
        }

        //divide by pieces
        let limit = parseInt(req.query.limit);
        if (!limit) limit = 5;

        let currentPage = parseInt(req.query.p);
        if (!currentPage) currentPage = 1;

        if (currentPage <= 0) return res.status(400).json({ success: false, message: "Bad request" });

        let pages = Math.ceil(projects.length / limit);
        let projectsToShow = projects.slice((currentPage - 1) * limit, currentPage * limit);

        let response = { limit, pages, count: projects.length, projects: projectsToShow, success: true };
        res.json(response);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ 'message': err.message });
    }
};

async function getProject(req, res) {
    let id = req.params.id;
    try {
        let project = await Project.findById(mongoose.Types.ObjectId(id))
            .populate([
                { path: 'lead', model: User },
                { path: 'members', model: User },
                {
                    path: 'issues', model: Item,
                    options: {
                        sort: { priority: -1, story_points: -1 }
                    }
                },
                { path: 'chat.author', model: User },
                {
                    path: 'sprints', model: Sprint, populate: {
                        path: 'issues', model: 'Item'
                    }
                }
            ])
            .exec();
        if (project) {
            res.json({ success: true, project });
        } else {
            res.status(404).json({ message: `No project with id ${id}` });
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

async function createProject(req, res) {
    let projectToCreate = req.body.newProject;
    let userId = req.body.userId;
    try {
        projectToCreate.lead = userId;
        let project = await Project.create(new Project(projectToCreate));
        await User.findByIdAndUpdate(
            userId,
            { $addToSet: { 'projects': project } },
            { new: true })
            .exec();
        res.json({ success: true, message: 'Project successfully created' })
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: 'Project with this name or key already exists' });
    }
}

async function deleteProject(req, res) {
    let id = req.params.id;
    try {
        let project = await Project.findById(mongoose.Types.ObjectId(id))
            .populate([
                { path: 'lead', model: User },
                { path: 'members', model: User, select: 'projects' },
                { path: 'sprints', model: Sprint, populate: { path: 'issues', model: Item } }])
            .exec();
        for (let is of project.issues) {
            project.issues.pull(is);
            project.save();
            await deleteItem(is);
        }
        for (let sprint of project.sprints) {
            for (let is of sprint.issues) await deleteItem(is._id);
            sprint.remove();
        }
        for (let m of project.members) {
            m.projects.pull(project);
            m.save();
        }
        project.lead.projects.pull(project);
        project.lead.save();
        await image.deleteImage(project._id);
        project.remove();
        res.json({ success: true, message: 'Successfully delete project' });
    } catch (err) { res.status(500).json({ message: err.message }); }
}

async function updateProject(req, res) {
    let id = req.params.id;
    let projectInfo = req.body.projectInfo;
    try {
        if (typeof (projectInfo.image_url) !== 'string') {
            projectInfo.image_url = await image.loadImage(projectInfo.image_url.mimetype, projectInfo.image_url.data, id);
        }
        let project = await Project.findByIdAndUpdate(mongoose.Types.ObjectId(id), projectInfo, { new: true }).exec();
        if (project) res.json({ success: true, project });
        else res.status(500).json({ message: `Unable to update projects ${id}` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function deleteItem(itemId) {
    try {
        let item = await Item.findById(mongoose.Types.ObjectId(itemId))
            .populate({ path: 'performers', model: User, select: 'issues' })
            .exec();
        item.performers.forEach(perf => {
            perf.issues.pull(item);
            perf.save();
        });

        return item.remove();
    } catch (err) { throw err; }
}

async function deleteProjectItem(req, res) {
    let projectId = req.params.id;
    let itemId = req.params.itemId;
    try {
        await deleteItem(itemId);
        res.json({ success: true, message: 'Successfully delete item' });
    } catch (err) { res.status(500).json({ message: err.message }); }
}

async function createProjectItem(req, res) {
    let id = req.params.id;
    let item = req.body.item;
    item.author = req.body.authorId;
    try {
        let project = await Project.findById(id).exec();
        item.name_key = `${project.name_key}-${++project.item_counter}`;
        item = await Item.create(new Item(item));
        project.issues.push(item);

        await Promise.all(item.performers.map(async x => {
            let user = await User.findById(mongoose.Types.ObjectId(x)).exec();
            user.issues.push(item);
            user.save();
        }));
        project.save();
        res.json({ success: true, message: 'Successfully create new item' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function newMessage(req, res) {
    let id = req.params.id;
    try {
        let project = await Project.findById(id).exec();
        project.chat.push({ message: req.body.text, author: req.body.authorId });
        project.save();
        res.json({ success: true, message: 'Message published' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function startSprint(req, res) {
    let id = req.params.id;
    let newSprint = req.body.sprint;
    newSprint.isActive = true;

    try {
        let project = await Project.findById(id).exec();
        let estimate = 0;
        for (let itemId of newSprint.issues) {
            estimate += (await Item.findById(itemId).select('story_points').exec()).story_points;
        }
        newSprint.estimate = estimate;
        let sprint = await Sprint.create(new Sprint(newSprint));
        sprint.execution.push({ story_points: estimate });
        sprint.save();
        for (let itemId of sprint.issues) {
            project.issues.pull(itemId);
        }
        project.sprints.push(sprint);
        project.save();
        res.json({ success: true, message: 'Start sprint' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function completeSprint(req, res) {
    let projectId = req.params.id;
    let sprintId = req.params.sprintId;
    try {
        let project = await Project.findById(projectId).exec();
        let sprint = await Sprint.findById(sprintId)
            .populate([{
                path: 'issues', model: Item
            }]).exec();
        sprint.isActive = false;
        let notCompletedIssues = sprint.issues.filter(i => i.status !== 'done');
        for (let issue of notCompletedIssues) {
            sprint.issues.pull(issue);
            project.issues.push(issue);
        }
        sprint.save();
        project.save();
        res.json({ success: true, message: "Completed sprint" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function updateItemStatus(req, res) {
    let sprintId = req.params.sprintId;
    let itemId = req.params.itemId;
    let fromStatus = req.body.fromStatus;
    let toStatus = req.body.toStatus;
    try {
        let sprint = await Sprint.findById(sprintId).exec();
        let issue = await Item.findByIdAndUpdate(itemId, { status: toStatus }).exec();
        if (fromStatus === 'done') {
            sprint.execution.push({ story_points: sprint.estimate + issue.story_points });
            sprint.estimate += issue.story_points;
        }
        if (toStatus === 'done') {
            sprint.execution.push({ story_points: sprint.estimate - issue.story_points });
            sprint.estimate -= issue.story_points;
        }
        sprint.save();
        res.json({ success: true, message: 'Successfully change item status' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function addMemberToProject(req, res) {
    let id = req.params.id;
    let email = req.body.email;
    try {
        let user = (await User.find({ email }).exec())[0];
        if (user) {
            let project = await Project.findByIdAndUpdate(id, { $addToSet: { 'members': user } }).exec();
            
            user.projects.addToSet(project);
            user.save();
            res.json({ success: true, message: "Add new member", user })
        } else {
            res.status(404).json({ message: "No user" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllUserProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    deleteProjectItem,
    createProjectItem,
    newMessage,
    startSprint,
    updateItemStatus,
    addMemberToProject,
    completeSprint
}