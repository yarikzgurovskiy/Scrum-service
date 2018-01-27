import React from 'react';

const ProjectDetails = ({ project }) => {
    return (
        <table className="table table-th-block">
            <tbody>
                <tr><td className="active">Key</td><td>{project.name_key}</td></tr>
                <tr><td className="active">Creation Date</td><td>{new Date(project.start_date).toLocaleString()}</td></tr>
            </tbody>
        </table>
    )
}

export default ProjectDetails;