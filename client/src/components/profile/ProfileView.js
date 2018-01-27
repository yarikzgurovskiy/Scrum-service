import React from 'react';
import { Panel } from 'react-bootstrap';
import Avatar from '../Avatar';

const ProfileView = ({ user, onAvaChanged, enableToEdit }) => {
    return (
        <Panel>
            <div className="text-center" id="author">
                <Avatar
                    image={user.avatar_link}
                    enableToEdit={enableToEdit}
                    onImageChanged={onAvaChanged} />
                <h3>{user.first_name} {user.last_name}</h3>
                <small className="label label-warning">{user.role}</small>
                <p className="sosmed-author">
                    <a href={`https://t.me/${user.telegram}`} target={'blank'}><i className="fa fa-telegram" title="Telegram"></i></a>
                    <a href={`https://github.com/${user.github}`} target={'blank'}><i className="fa fa-github" title="GitHub"></i></a>
                </p>
            </div>
        </Panel>
    )
}

export default ProfileView;