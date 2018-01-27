import React from 'react';

export default class AuthorMessage extends React.Component {
    render() {
        const { message } = this.props;
        return (
            <li className="right clearfix">
                <span className="chat-img pull-right">
                    <img src={message.author.avatar_link} alt="User Avatar" width="40" height="40" className="img-circle" />
                </span>
                <div className="chat-body clearfix">
                    <div className="header">
                        <small className=" text-muted"><span className="glyphicon glyphicon-time"></span>{new Date(message.date).toLocaleString()}</small>
                        <strong className="pull-right primary-font">{message.author.first_name} {message.author.last_name}</strong>
                    </div>
                    <p className="pull-right">{message.message}</p>
                </div>
            </li>
        )
    }
}