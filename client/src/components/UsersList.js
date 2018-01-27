import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const UsersList = ({ users }) => {
    const usersItems = users.map(u =>
        (
            <tr key={u._id}>
                <td><img src={u.avatar_link} width="25" height="25" alt={`${u.name} logo`} /></td>
                <td><Link to={`/profile/${u._id}`}>{u.first_name} {u.last_name}</Link></td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.projects.length}</td>
                <td>{u.role}</td>
            </tr>
        )
    )
    return (
        <Table striped responsive>
            <thead>
                <tr>
                    <th>Ava</th>
                    <th>Fullname</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Projects</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                {usersItems}
            </tbody>
        </Table>
    )
};

export default UsersList;