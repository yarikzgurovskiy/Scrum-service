import React from 'react';
import { Tab, Table } from 'react-bootstrap';

const ProfileDetails = ({ user }) => {
    return (
        <Tab.Pane>
            <h4>Profile details</h4>
            <Table responsive className={'table-th-block'}>
                <tbody>
                    <tr><td className="active">Username</td><td>{user.username}</td></tr>
                    <tr><td className="active">Email</td><td>{user.email}</td></tr>
                    <tr><td className="active">Registration Date</td><td>{new Date(user.registration_date).toLocaleString()}</td></tr>
                    <tr><td className="active">Country</td><td>{user.country}</td></tr>
                    <tr><td className="active">City</td><td>{user.city}</td></tr>
                    <tr><td className="active">Gender</td><td>{user.gender}</td></tr>
                    <tr><td className="active">Projects count</td><td>{user.projects.length}</td></tr>
                    <tr><td className="active">Facebook</td><td>{user.facebook}</td></tr>
                    <tr><td className="active">LinkedIn</td><td>{user.linkedIn}</td></tr>
                </tbody>
            </Table>
        </Tab.Pane>
    )
}

export default ProfileDetails