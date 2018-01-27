import React from 'react';

import { Tab, Panel, Button, Alert } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectActions from '../actions/projectActions';

import ItemForm from '../components/backlog/ItemForm';
import ItemsList from '../components/backlog/ItemsList';
import SprintCreateModal from '../components/SprintCreateModal';
import auth from '../auth/index';

import toastr from 'toastr';

const defaultIssue = {
    name: '',
    story_points: '',
    priority: 3,
    type: 'story',
    performers: []
}

const defaultSprint = {
    goal: '',
    name: '',
    finish_date: '',
}

class BacklogTab extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            issue: defaultIssue,
            issues: [],
            sprint: defaultSprint,
            showCreateModal: false
        }
    }

    onIssueChanged = (e) => {
        let field = e.target.name;
        let value;
        if (field === 'performers') value = [].slice.call(e.target.selectedOptions).map(o => { return o.value; });
        else value = e.target.value;
        return this.setState({ issue: { ...this.state.issue, [field]: value } });
    }

    onIssueCreate = (e) => {
        e.preventDefault();
        this.props.actions.createItem(this.props.project._id, this.state.issue, auth.getUserId())
            .then(() => console.log('item created'))
            .catch(err => { console.log(err) });
    }

    onIssueDelete = (id) => {
        this.props.actions.deleteItem(id, this.props.project._id)
            .then(() => {
                console.log('deleted');
                let issues = this.state.issues.filter(i => id !== i);
                this.setState({ issues });
            })
            .catch(err => console.log(err));
    }


    handleSelect = (e) => {
        const newSelection = e.target.value;
        let newSelectionArray;

        if (this.state.issues.indexOf(newSelection) > -1) newSelectionArray = this.state.issues.filter(s => s !== newSelection);
        else newSelectionArray = [...this.state.issues, newSelection];
        this.setState({ issues: newSelectionArray });

    }

    onCreateSprint = (e) => {
        e.preventDefault();
        this.hideModal();
        let newSprint = this.state.sprint;
        newSprint.issues = this.state.issues;
        this.props.actions.startSprint(this.props.project._id, newSprint)
            .then(() => {
                toastr.success(`Sprint ${this.state.sprint.name} has successfully been started`);
                this.setState({ sprint: defaultSprint, issues: [] });
            })
            .catch(err => { console.log(err); toastr.danger('Sprint don\'t started!') });

    }

    showModal = () => this.setState({ showCreateModal: true });
    hideModal = () => this.setState({ showCreateModal: false, sprint: defaultSprint });

    onDateChanged = (date) => {
        this.setState({ sprint: { ...this.state.sprint, finish_date: date } })
    }

    onChangeInput = (e) => {
        this.setState({ sprint: { ...this.state.sprint, [e.target.name]: e.target.value } });
    }

    isEnableStartSprint = () => {
        return (this.props.project.sprints.findIndex(s => s.isActive) > -1);
    }

    render() {

        return (
            <Tab.Pane>
                {(this.state.issues.length > 0) && (this.isEnableStartSprint()
                    ? (<Alert bsStyle="warning">
                        <h4 className={'text-center'}>{`You can not start sprint, because you 've already have active`}</h4>
                    </Alert>)
                    : < Button
                        bsStyle={'success'}
                        block
                        type={'button'}
                        onClick={this.showModal}>
                        Start sprint
                    </Button>)}
                < SprintCreateModal
                    sprint={this.state.sprint}
                    show={this.state.showCreateModal}
                    onHide={this.hideModal}
                    onCreateSprint={this.onCreateSprint}
                    onDateChanged={this.onDateChanged}
                    onChange={this.onChangeInput}
                />
                <Panel>
                    <h3 className="subheader">Backlog</h3>
                    <hr className="divider" />
                    {(this.props.project.issues.length > 0)
                        ?
                        (<div>
                            <label><span className="badge">Story points</span></label>
                            <label><span className="label label-warning"><span className="glyphicon glyphicon-arrow-up"></span>Priority</span></label>
                            <ItemsList
                                issues={this.props.project.issues}
                                onIssueDelete={this.onIssueDelete}
                                handleSelect={this.handleSelect}
                                onIssueEdit={this.onIssueEdit}
                            />
                        </div>)
                        : (<Alert bsStyle="info">
                            <h4 className={'text-center'}>This is your team backlog. Create and estimate new issues</h4>
                        </Alert>)}

                    <ItemForm
                        issue={this.state.issue}
                        onChange={this.onIssueChanged}
                        onCreateIssue={this.onIssueCreate}
                        lead={this.props.project.lead}
                        performers={this.props.project.members} />
                </Panel>
            </Tab.Pane >
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

export default connect(mapStateToProps, mapDispatchToProps)(BacklogTab);