import React from 'react';
import IssueList from '../components/IssueList';
import { Row, Col, Alert, Button, Tab, Checkbox } from 'react-bootstrap';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectActions from '../actions/projectActions';
import moment from 'moment';

class SprintTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibilityFilter: false
        }
    }

    changeItemStatus = (itemId, fromStatus, toStatus) => {
        const { sprint, project } = this.props;
        this.props.actions.changeItemStatus(project._id, sprint._id, itemId, fromStatus, toStatus)
            .then(() => { console.log('change status') })
            .catch(err => { throw err; });
    }

    onCompleteSprint = () => {
        this.props.actions.completeSprint(this.props.project._id, this.props.sprint._id)
            .then(() => {
                console.log('completed');
            })
            .catch(err => { console.log(err); })
    }

    filterIssueList = (list, filter) => {
        if (list) return list.filter(x => (x.performers.findIndex(p => p === filter) > -1));
    }

    onChangeFilter = () => {
        this.setState(prevState => { return { visibilityFilter: !prevState.visibilityFilter } })
    }


    render() {
        let { sprint, todoList, inprogressList, doneList } = this.props;
        const { visibilityFilter } = this.state;
        if (!sprint) {
            return (
                <Alert bsStyle="warning">
                    <h4 className={'text-center'}>No active sprint! Back to backlog and start a new one</h4>
                    <div className="text-center"><Button onClick={() => this.props.changeTab('backlog')} bsStyle={'info'}>Return to backlog</Button></div>
                </Alert>
            );
        }

        const tabHeader = (
            <div>
                <Row>
                    <Col md={8} sm={8} lg={8}>
                        <h1>{sprint.name}</h1>
                        <div className={'text-muted'}>{new Date(sprint.start_date).toLocaleString('ukr')} - {new Date(sprint.finish_date).toLocaleString('ukr')}</div>

                    </Col>
                    <Col md={4} sm={4} lg={4}>
                        <p className='text-muted'><span className="glyphicon glyphicon-time"> {moment(sprint.finish_date).diff(moment.now(), 'd')} days remaining</span></p>
                        <hr className='divider' />
                        <Button type="button" block onClick={this.onCompleteSprint}>Complete sprint</Button>
                    </Col>
                </Row>
            </div>
        )

        return (
            <Tab.Pane >
                {tabHeader}
                <Checkbox onChange={this.onChangeFilter} checked={this.state.visibilityFilter} inline>
                    Assignee to me</Checkbox>
                <hr className='divider' />
                <Row>
                    <Col md={4} sm={4}>
                        <IssueList
                            title={'To Do'}
                            name={'do'}
                            list={visibilityFilter ? this.filterIssueList(todoList, this.props.user._id) : todoList}
                            changeStatus={this.changeItemStatus}
                        />
                    </Col>
                    <Col md={4} sm={4}>
                        <IssueList
                            title={'In Progress'}
                            name={'inprogress'}
                            list={visibilityFilter ? this.filterIssueList(inprogressList, this.props.user._id) : inprogressList}
                            changeStatus={this.changeItemStatus}
                        />
                    </Col>
                    <Col md={4} sm={4}>
                        <IssueList
                            title={'Done'}
                            name={'done'}
                            list={visibilityFilter ? this.filterIssueList(doneList, this.props.user._id) : doneList}
                            changeStatus={this.changeItemStatus}
                        />
                    </Col>
                </Row>
            </Tab.Pane>
        );
    }
}

const mapStateToProps = state => {
    let sprint = state.project.sprints.find(s => s.isActive);
    let lists = {};
    if (sprint) {
        let issues = sprint.issues;
        lists = {
            todoList: issues.filter(x => x.status === 'do'),
            inprogressList: issues.filter(x => x.status === 'inprogress'),
            doneList: issues.filter(x => x.status === 'done'),
        }
    }

    return {
        ...lists,
        project: state.project,
        sprint,
        user: state.authUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(projectActions, dispatch)
    }
}

export default DragDropContext(HTML5Backend)(connect(
    mapStateToProps,
    mapDispatchToProps,
)(SprintTab))