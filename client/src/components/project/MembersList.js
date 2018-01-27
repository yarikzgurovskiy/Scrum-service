import React from 'react';
import { Link } from 'react-router-dom';

const MembersList = ({ members }) => {
    if (members.length === 0) return (<h4>No members yet</h4>)
    const membersRows = members.map(m => {
        return (<Link to={`/profile/${m._id}`} key={m._id} href="/profile/<%=member._id%>" className="list-group-item">{m.first_name} {m.last_name}</Link>)
    });

    return (
        <div>
            <h4>Members list:<span className="badge badge-secondary">{members.length}</span></h4>
            <div className="list-group">
                {membersRows}
            </div>
        </div>

    )
}

export default MembersList;