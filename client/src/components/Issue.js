import React from 'react';
import { DragSource } from 'react-dnd'

const issueSource = {
    beginDrag: (props) => {
        return {
            issue: props.issue,
            from: props.from
        }
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class Issue extends React.Component {
    render() {
        const { issue, isDragging } = this.props;
        return this.props.connectDragSource(
            <div className='well' style={isDragging ? { opacity: '0' } : {}}>
                <div className='heading'>
                    <div className="header">
                        <h4>{issue.name}</h4>
                    </div>
                </div>
                <hr className='divider' />
                <div>
                    <div className="pull-left" role="group">
                        <span className={'text-muted'} title={'key'}>{issue.name_key}</span>
                    </div>
                    <div className="pull-right" role="group">
                        <span className="label label-warning" title={'priority'}><span className="glyphicon glyphicon-arrow-up">{issue.priority}</span>&#09;</span>
                        <span className="badge" title={'story points'}>{issue.story_points}</span>
                    </div>
                </div>
            </div>)
    }
}

export default DragSource('issue', issueSource, collect)(Issue)