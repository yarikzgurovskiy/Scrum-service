import React from 'react';
import {Grid} from 'react-bootstrap';
import Header from '../containers/Header';

const Layout = props => {
    return (
        <div className="layout">
            <Header/>
            <Grid>
                {props.children}
            </Grid>
        </div>
    )
};

export default Layout;