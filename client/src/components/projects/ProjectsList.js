import React from 'react';
import ProjectsListRow from './ProjectsListRow';
import { Table } from 'react-bootstrap';


const ProjectsList = ({ projects }) => {
    const projectsItems = projects.map(proj =>
        <ProjectsListRow key={proj._id} project={proj} />
    )
    return (
        <Table striped responsive>
            <thead>
                <tr>
                    <th>Ava</th>
                    <th>Project</th>
                    <th>Key</th>
                    <th>Project lead</th>
                    <th>Start date</th>
                </tr>
            </thead>
            <tbody>
                {projectsItems}
            </tbody>
        </Table>
    )
};

export default ProjectsList;