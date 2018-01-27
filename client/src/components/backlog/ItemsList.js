import React from 'react';
import ItemListRow from './ItemListRow';
import FlipMove from 'react-flip-move';

const ItemsList = ({ issues, onIssueEdit, onIssueDelete, handleSelect }) => {
    const itemsList = (issues.length > 0)
        ? issues.map(i => {
            return (
                <ItemListRow
                    key={i._id}
                    issue={i}
                    onIssueDelete={onIssueDelete}
                    onIssueEdit={onIssueEdit}
                    handleSelect={handleSelect}
                />)
        })
        : <div></div>
    return (
        <FlipMove typeName={'ul'} className={'list-group'} id='backlog'>
            {itemsList}
        </FlipMove>
    )
}

export default ItemsList;