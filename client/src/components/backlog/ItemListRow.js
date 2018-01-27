import React from 'react';

class ItemsListRow extends React.Component {
    render() {
        const { issue, onIssueEdit, onIssueDelete, handleSelect } = this.props;
        return (
            <li className='list-group-item clearfix' >
                <div className="pull-left" role="group">
                    <input form="sprint" type="checkbox" name="issues" onChange={handleSelect} id="checkbox" value={issue._id} />
                </div>
                {issue.name}
                <div className="pull-right" role="group" >
                    <span className={'text-muted'}>{issue.name_key}</span>
                    <span className="label label-warning"><span className="glyphicon glyphicon-arrow-up">{issue.priority}</span>&#09;</span>
                    <span className="badge">{issue.story_points}</span>
                    <button type="button" className="btn btn-xs btn-info img-circle" onClick={() => onIssueEdit(issue._id)}>&#9998;</button>
                    <button type="button" className="btn btn-xs btn-danger img-circle" onClick={() => onIssueDelete(issue._id)}>&#xff38;</button>
                </div>
            </li>
        )
    }
}

export default ItemsListRow;