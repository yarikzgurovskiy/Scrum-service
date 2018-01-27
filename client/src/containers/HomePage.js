import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { Redirect, withRouter } from 'react-router-dom';

import auth from '../auth/index';

class HomePage extends Component {

    onStartButtonClick = () => {
        const { history } = this.props;
        if (auth.isUserAuth()) {
            history.push('/projects');
        } else history.push('/signin');
    }

    render() {
        return (
            <Jumbotron>
                <h1 className='text-center'>ZGURA</h1>
                <p className='text-center'>Project managment system based on Scrum</p>
                <p className='text-center'><Button onClick={this.onStartButtonClick} bsStyle="primary">Get started</Button></p>
            </Jumbotron>
        )
    }
}

export default withRouter(HomePage);