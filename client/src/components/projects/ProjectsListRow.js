import React from 'react';
import { Link } from 'react-router-dom';

const ProjectsListRow = ({ project }) => {
    return (
        <tr>
            <td><img src={project.image_url} width="25" height="25" alt={`${project.name} logo`} /></td>
            <td><Link to={`/projects/${project._id}`}>{project.name}</Link></td>
            <td>{project.name_key}</td>
            <td><Link to={`/profile/${project.lead._id}`}>{project.lead.first_name} {project.lead.last_name}</Link></td>
            <td>{new Date(project.start_date).toLocaleDateString()}</td>
        </tr>
    )
}

export default ProjectsListRow;