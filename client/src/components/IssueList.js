import React from 'react';
import { DropTarget } from 'react-dnd';
import Issue from './Issue';
import { Panel } from 'react-bootstrap';
import FlipMove from 'react-flip-move';

const issueListTarget = {
    drop(props, monitor) {
        const item = Object.assign({}, monitor.getItem())
        if (item.from !== props.name) {
            props.changeStatus(item.issue._id, item.from, props.name);
        }
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
}

const IssueList = props => {
    const { list } = props;
    const listStyle = (props.name === 'do')
        ? 'danger'
        : (props.name === 'inprogress')
            ? 'warning'
            : 'success';
    const title = <div className="text-center"><h5>{props.title}</h5></div>
    return props.connectDropTarget(
        <div>
            <Panel header={title} bsStyle={listStyle}>
                <FlipMove easing="ease-out" duration={100}>
                    {list.map(issue => (
                        <Issue from={props.name} issue={issue} key={issue._id} />
                    ))}
                </FlipMove>
            </Panel>
        </div >
    )
}

export default DropTarget('issue', issueListTarget, collect)(IssueList)