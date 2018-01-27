import React from 'react';

export default class UserMessage extends React.Component {
    render() {
        const { message } = this.props;
        return (
            <li className="left clearfix" >
                <span className="chat-img pull-left">
                    <img src={message.author.avatar_link} width="40" height="40" alt="User Avatar" className="img-circle" />
                </span>
                <div className="chat-body clearfix">
                    <div className="header">
                        <strong className="primary-font">You</strong><small className="pull-right text-muted">
                            <span className="glyphicon glyphicon-time"></span>{new Date(message.date).toLocaleString()}</small>
                    </div>
                    <p>{message.message}</p>
                </div>
            </li>
        )
    }
}
