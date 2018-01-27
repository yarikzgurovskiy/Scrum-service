import React from 'react';

import AuthorMessage from './AuthorMessage';
import UserMessage from './UserMessage';
import FlipMove from 'react-flip-move';

const MessageList = ({ messages, currentUser }) => {
    const messagesList =
        messages.map(message =>
            message.author._id.toString() === currentUser._id.toString()
                ? (<UserMessage key={message._id} message={message} />)
                : (<AuthorMessage key={message._id} message={message} />)
        )
    return (
        <FlipMove typeName={'ul'} className={'chat'} easing="ease-out">
            {messagesList}
        </FlipMove>
    )
}

export default MessageList;