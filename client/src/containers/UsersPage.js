import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import { withRouter, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as projectActions from '../actions/projectActions';

import Paginator from '../components/Paginator';
import UsersList from '../components/UsersList';

import { SyncLoader } from 'react-spinners';

import * as apiUsers from '../api/users';

class UsersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            usersCount: 0,
            limit: 7,
            pages: 0,
            currentPage: 1,
        }
    }
    componentDidMount() {
        this.loadUsers();
    }

    loadUsers = () => {
        const { limit, currentPage } = this.state;
        apiUsers.getAllUsers(limit, currentPage)
            .then(response => this.setState({
                users: response.users,
                limit: response.limit,
                usersCount: response.count,
                pages: response.pages
            }))
            .catch(err => console.log(err));
    }

    onPageChanged = (pageNumber) => {
        this.setState({ currentPage: pageNumber }, this.loadUsers);
    }

    render() {
        if (this.props.user._id && !(this.props.user.role === 'admin')) {
            return (<Redirect to={{
                pathname: '/error',
                state: {
                    status: 401,
                    message: 'You must be Admin'
                }
            }} />)
        }
        const usersList = (this.state.users.length > 0)
            ? (<UsersList users={this.state.users} />)
            : (<div className='text-center'><SyncLoader color={'#cefff7'} /></div>)

        return (
            <Row>
                <hr className="divider" />
                <Col sm={10} smOffset={1} md={10} mdOffset={1}>
                    {usersList}
                </Col>
                <div>{(this.state.usersCount > this.state.limit)
                    && (<Paginator
                        items={this.state.pages}
                        activePage={this.state.currentPage}
                        onPageChanged={this.onPageChanged}
                    />)}
                </div>
            </Row >
        )
    }
}

const mapStateToProps = state => {
    console.log(state.authUser, 'asas');
    return {
        user: state.authUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(projectActions, dispatch)
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersPage));