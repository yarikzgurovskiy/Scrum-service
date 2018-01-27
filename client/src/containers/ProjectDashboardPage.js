import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectActions from '../actions/projectActions';

import { Row, Nav, NavItem, Col, Tab, FormControl, Button, InputGroup, Glyphicon } from 'react-bootstrap';
import { PacmanLoader } from 'react-spinners';

import ChatTab from './ChatTab';
import ProjectSettingsTab from './ProjectSettingsTab';
import BacklogTab from './BacklogTab';
import SprintTab from './SprintTab';
import ReportsTab from './ReportsTab';
import { withRouter } from 'react-router-dom';

import { subscribe, unsubscribe } from '../api/socket';

import toastr from 'toastr';

class ProjectDashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'backlog',
            isLead: true,
            project: {},
            text: '',
            memberEmail: ''
        }
        const { actions, match } = this.props;
        actions.loadProject(match.params.id)
            .then(res => {
                this.setState({ project: res.project });
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleTabChanged = (name) => {
        this.setState({ activeTab: name });
    }

    componentWillMount = () => {
        subscribe(this.props.project._id, () => {
            this.props.actions.loadProject(this.props.project._id);
        });
    }
    componentWillUnmount = () => {
        unsubscribe(this.props.project._id);
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({ project: nextProps.project });
    }

    onInputChanged = (e) => {
        this.setState({ ...this.state.memberEmail, [e.target.name]: e.target.value });
    }

    inviteMember = () => {
        if (this.state.memberEmail === this.props.user.email) {
            toastr.warning('You can not add self to project!');
            this.setState({ memberEmail: '' });
            return;
        }
        this.props.actions.addMember(this.props.project._id, this.state.memberEmail)
            .then(() => { toastr.success('Successfully add new member!') })
            .catch(err => { if (err.message === 'No user') toastr.warning('No such user!') })
            .then(this.setState({ memberEmail: '' }))
    }

    render() {
        const { activeTab, project } = this.state;
        const { user } = this.props;
        if (!project._id) return (<PacmanLoader />);
        if (!this.props.isProjectMember && !this.props.isProjectLead) return (<div>You are not member of this project!</div>);

        const currentTab = activeTab === 'chat'
            ? (<ChatTab
                messages={project.chat}
                user={user}
            />)
            : activeTab === 'backlog'
                ? ((project._id) && <BacklogTab />)
                : activeTab === 'sprint'
                    ? (<SprintTab changeTab={this.handleTabChanged} />)
                    : activeTab === 'reports'
                        ? (<ReportsTab changeTab={this.handleTabChanged} />)
                        : (<ProjectSettingsTab />)

        return (
            <Row>
                <Tab.Container id="left-tabs-example">
                    <Row className="clearfix">
                        <Col sm={3} md={3} xs={3} id={'projectSidebar'}>
                            <hr className="divider" />
                            <ul className="nav nav-sidebar">
                                <div className="navbar-header">
                                    <span><img className={'img-rounded'} src={project.image_url} width="50" height="50" alt='Brand Logo' />  {project.name}</span>
                                </div>
                            </ul>
                            <hr className="divider" />
                            <Nav bsStyle="pills" stacked>
                                <NavItem
                                    onClick={() => this.handleTabChanged('backlog')}
                                    active={activeTab === 'backlog'}
                                >Backlog</NavItem>
                                <NavItem
                                    onClick={() => this.handleTabChanged('sprint')}
                                    active={activeTab === 'sprint'}
                                >Active sprint</NavItem>
                                <NavItem
                                    onClick={() => this.handleTabChanged('reports')}
                                    active={activeTab === 'reports'}
                                >Reports</NavItem>
                                <NavItem
                                    onClick={() => this.handleTabChanged('chat')}
                                    active={activeTab === 'chat'}
                                >Chat</NavItem>
                                {this.props.isProjectLead && <NavItem
                                    onClick={() => this.handleTabChanged('settings')}
                                    active={activeTab === 'settings'}
                                >Settings</NavItem>}

                            </Nav>
                            <hr className="divider" />
                            {this.props.isProjectLead &&
                                <div>
                                    <span className="text-muted">Project Team</span>
                                    <InputGroup>
                                        <FormControl
                                            placeholder={'Invite new member'}
                                            type={"email"}
                                            name={"memberEmail"}
                                            value={this.state.memberEmail}
                                            onChange={this.onInputChanged}
                                        />
                                        <InputGroup.Addon>
                                            <Button onClick={this.inviteMember} bsStyle={'info'} disabled={!(this.state.memberEmail.length > 0)}>
                                                <Glyphicon glyph="plus-sign" />
                                            </Button>
                                        </InputGroup.Addon>
                                    </InputGroup>
                                    <hr className='divider' />
                                </div>
                            }
                        </Col>
                        <Col sm={9} md={9} xs={9}>
                            <Tab.Content animation>
                                {currentTab}
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Row >
        )
    }
}

const mapStateToProps = (state) => {
    let isProjectLead = false;
    let isProjectMember = false;
    if (state.project._id) {
        isProjectLead = state.project.lead._id.toString() === state.authUser._id.toString();
        isProjectMember = (state.project.members.findIndex(m => m._id.toString() === state.authUser._id.toString()) > -1);
    }

    return {
        project: state.project,
        user: state.authUser,
        isProjectLead,
        isProjectMember
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(projectActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectDashboardPage));