import React from 'react';
import { Tab, Panel, Glyphicon } from 'react-bootstrap';

import MessageList from '../components/chat/MessageList';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectActions from '../actions/projectActions';


class ChatTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageText: ''
        }

    }

    scrollTabToBottom = () => {
        let elem = document.getElementById('bottom');
        if (elem) {
            elem.scrollIntoView(false);
            window.scrollTo(window.pageXOffset, window.pageYOffset);
        }
    }

    componentDidMount = () => this.scrollTabToBottom();
    componentDidUpdate = () => this.scrollTabToBottom();

    onChangeInput = (e) => this.setState({ [e.target.name]: e.target.value });

    onSendMessage = () => {
        this.setState({ messageText: '' });
        this.props.actions.sendMessage(this.props.project._id, this.state.messageText, this.props.user._id);
    }

    render() {
        const { project, user } = this.props;
        const header = (<div><Glyphicon glyph="comment" /> Project Chat</div>)

        const footer = (
            <div className="input-group">
                <input onChange={this.onChangeInput} id="btn-input" type="text" name="messageText" value={this.state.messageText} className="form-control input-sm" placeholder="Type your message here..." />
                <span className="input-group-btn">
                    <button disabled={!(this.state.messageText.length > 0)} onClick={this.onSendMessage} type={'submit'} className="btn btn-warning btn-sm" id="btn-chat">Send</button>
                </span>
            </div>
        )

        return (
            <Tab.Pane >
                <div id="chat">
                    <Panel header={header} footer={footer}>
                        <MessageList messages={project.chat} currentUser={user} />
                        <div id='bottom'></div>
                    </Panel>
                </div>
            </Tab.Pane>
        )
    }
}

const mapStateToProps = state => {
    return {
        project: state.project
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(projectActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatTab);
