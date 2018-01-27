import React from 'react';

import { FormGroup, ControlLabel, PageHeader, Alert, Button } from 'react-bootstrap';
import moment from 'moment';
import { Line } from 'react-chartjs-2';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectActions from '../actions/projectActions';

const timeFormat = 'MM/DD/YYYY HH:mm';

class ReportsTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSprint: (this.props.sprint) ? this.props.sprint : this.props.project.sprints[0]
        }
    }

    enumerateDaysOfSprint = (sprint) => {
        let startDate = moment(sprint.start_date).startOf('day');
        var lastDate = moment(sprint.finish_date).startOf('day');

        let now = startDate, dates = [];

        while (now.isBefore(lastDate) || now.isSame(lastDate)) {
            dates.push(now.toDate());
            now.add(1, 'd');
        }
        return dates;
    }

    mapSprintActionsToData = (execution) => {
        return execution.map(exec => {
            return { x: moment(exec.date).format(timeFormat), y: exec.story_points };
        })
    }

    mapSprintIdealEffort = (sprint) => {
        return [
            { x: moment(sprint.execution[0].date).format(timeFormat), y: sprint.execution[0].story_points },
            { x: moment(sprint.finish_date).format(timeFormat), y: 0 }
        ]
    }

    newDate = (days) => {
        return moment().add(days, 'd').toDate();
    }
    newDateString = (days) => {
        return moment().add(days, 'd').format(timeFormat);
    }

    getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    onSelectedSprintChanged = (e) => {
        let value = e.target.value;
        let selectedSprint = this.props.project.sprints.find(s => s._id === value);
        return this.setState({ selectedSprint });
    }

    render() {
        const { selectedSprint } = this.state;
        if (this.props.project.sprints.length === 0) {
            return (
                <Alert bsStyle="warning">
                    <h4 className={'text-center'}>No sprints in project! Back to backlog and start a new one</h4>
                    <div className="text-center"><Button onClick={() => this.props.changeTab('backlog')} bsStyle={'info'}>Return to backlog</Button></div>
                </Alert>
            )
        }


        const data = {
            labels: this.enumerateDaysOfSprint(selectedSprint),
            datasets: [
                {
                    label: "Issue execution",
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    fill: false,
                    lineTension: 0.1,
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.mapSprintActionsToData(selectedSprint.execution),
                },
                {
                    label: "Ideal effort",
                    backgroundColor: 'rgba(75,34,192,0.4)',
                    borderColor: 'rgba(75,34,192,1)',
                    fill: false,
                    lineTension: 0.1,
                    borderCapStyle: 'butt',
                    borderDash: [10],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 0,
                    pointHoverRadius: 0,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 0,
                    pointRadius: 0,
                    pointHitRadius: 0,
                    data: this.mapSprintIdealEffort(selectedSprint),
                }
            ]
        };
        const options = {
            scales: {
                xAxes: [{
                    type: "time",
                    time: {
                        format: timeFormat,
                        round: 'hour',
                        tooltipFormat: 'll HH:mm',
                        displayFormats: {
                            'millisecond': 'MMM DD',
                            'second': 'MMM DD',
                            'minute': 'MMM DD',
                            'hour': 'MMM DD',
                            'day': 'MMM DD',
                            'week': 'MMM DD',
                            'month': 'MMM DD',
                            'quarter': 'MMM DD',
                            'year': 'MMM DD',
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    }
                },],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Story points'
                    }
                }]
            }
        };

        return (
            <div>
                <FormGroup >
                    <ControlLabel>Choose sprint:</ControlLabel>
                    <select className="form-control" name="type" value={selectedSprint._id} onChange={this.onSelectedSprintChanged} required>
                        {this.props.project.sprints.map(s => (<option key={s._id} value={s._id}>{s.name}</option>))}
                    </select>
                </FormGroup >
                <PageHeader>Burndown Chart <small>{selectedSprint.name}</small></PageHeader>
                <Line data={data} options={options} />
            </div >
        )
    }

}

const mapStateToProps = state => {
    let sprint = state.project.sprints.find(s => s.isActive);
    let response = {};
    if (sprint) response.sprint = sprint;
    return {
        ...response,
        project: state.project,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(projectActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportsTab);