import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

const Filter = ({ filter, handleFilterChange, handleFilterClean }) => {
    return (
        <InputGroup role={'search'}>
            <FormControl
                placeholder={'Search...'}
                type={"text"}
                name={"filter"}
                value={filter}
                onChange={handleFilterChange}
            />
            <div className="input-group-btn">
                <button className="btn btn-default" type="button" id="clearFilter" onClick={handleFilterClean} ><i className="glyphicon glyphicon-erase"></i></button>
            </div>
        </InputGroup>
    )
}

export default Filter;