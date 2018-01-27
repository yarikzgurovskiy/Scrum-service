import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectActions from '../actions/projectActions';

import ProjectsList from './../components/projects/ProjectsList';
import ProjectCreateModal from '../components/projects/ProjectCreateModal';
import Paginator from '../components/Paginator';
import Filter from '../components/Filter';

import toastr from 'toastr';
import { SyncLoader } from 'react-spinners';

import * as apiProjects from '../api/projects';

const defaultProject = { name: '', name_key: '' };

class ProjectsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            projectsCount: 0,
            newProject: defaultProject,
            showCreateModal: false,
            limit: 7,
            pages: 0,
            currentPage: 1,
            filter: ''
        }
    }
    componentDidMount() { this.loadProjects(); }

    showModal = () => this.setState({ showCreateModal: true });
    hideModal = () => this.setState({ showCreateModal: false, newProject: defaultProject });

    loadProjects = () => {
        const { filter, limit, currentPage } = this.state;
        apiProjects.getAllProjects(filter, limit, currentPage)
            .then(response => this.setState({
                projects: response.projects,
                limit: response.limit,
                projectsCount: response.count,
                pages: response.pages
            }))
            .catch(err => console.log(err));
    }

    onChangeCreateForm = (e) => {
        let field = e.target.name;
        let value = e.target.value;
        if (field === 'name_key') value = value.toUpperCase();
        return this.setState({ newProject: { ...this.state.newProject, [field]: value } });
    }

    onCreateProject = (e) => {
        this.hideModal();
        e.preventDefault();
        this.props.actions.createProject(this.props.user._id, this.state.newProject)
            .then(() => {
                this.handleFilterClean();
                toastr.success('Project successfully created!');
            })
            .catch(err => { console.log(err) });
    }

    onPageChanged = (pageNumber) => {
        this.setState({ currentPage: pageNumber }, this.loadProjects);
    }

    handleFilterChange = (e) => {
        this.setState({ filter: e.target.value, currentPage: 1 }, this.loadProjects);
    }
    handleFilterClean = () => {
        this.setState({ filter: "", currentPage: 1 }, this.loadProjects);
    }

    render() {
        const projectsList = (this.state.projects.length > 0)
            ? (<ProjectsList projects={this.state.projects} />)
            : (this.state.filter.length > 0)
                ? (<h2 className='text-center'>No such projects</h2>)
                : (this.props.user.projects && this.props.user.projects.length === 0)
                    ? (<h2 className='text-center'>No projects! Create a new one!</h2>)
                    : (<div className='text-center'><SyncLoader color={'#cefff7'} /></div>)

        return (
            <Row>
                <Row>
                    <Col mdOffset={1} sm={5} md={5}>
                        <Filter
                            filter={this.state.filter}
                            handleFilterChange={this.handleFilterChange}
                            handleFilterClean={this.handleFilterClean}
                        />
                    </Col>
                    <Col mdOffset={1} sm={4} md={4}>
                        <Button bsStyle="primary" block onClick={this.showModal}>Create project</Button>
                        <ProjectCreateModal
                            project={this.state.newProject}
                            show={this.state.showCreateModal}
                            onHide={this.hideModal}
                            onChange={this.onChangeCreateForm}
                            onCreateProject={this.onCreateProject}
                        />
                    </Col>
                </Row>
                <hr className="divider" />
                <Col sm={10} smOffset={1} md={10} mdOffset={1}>
                    {projectsList}
                </Col>
                <div>{(this.state.projectsCount > this.state.limit)
                    && (<Paginator
                        items={this.state.pages}
                        activePage={this.state.currentPage}
                        onPageChanged={this.onPageChanged}
                    />)}
                </div>
            </Row >
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.authUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(projectActions, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectsPage));

