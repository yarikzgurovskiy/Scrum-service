import React from 'react';
import { Pagination } from 'react-bootstrap';

const Paginator = ({ items, activePage, onPageChanged }) => {
    return (
        <div className={'text-center'}>
            <Pagination
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                items={items}
                maxButtons={5}
                activePage={activePage}
                onSelect={onPageChanged}
            />
        </div>
    )
}

export default Paginator;