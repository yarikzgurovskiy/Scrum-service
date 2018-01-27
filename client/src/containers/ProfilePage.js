import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions';
import { withRouter } from 'react-router-dom';

import { getUser } from '../api/users';

import ProfileForm from '../components/profile/ProfileForm';
import ProfileDetails from '../components/profile/ProfileDetails';
import ProfileView from '../components/profile/ProfileView';

import { Row, Col, Panel, Nav, NavItem, Alert } from 'react-bootstrap';


class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'details',
            message: {
                type: '',
                text: '',
                visibility: false
            },
            isCurrentAuth: false,
            isFetching: false
        };
        if (props.user) {
            this.state = Object.assign({}, this.state, { user: props.user, isCurrentAuth: true });
        } else {
            getUser(props.match.params.id)
                .then(res => { this.setState({ user: res.user }); })
                .catch(err => console.log(err));
        }
    }

    componentWillReceiveProps({ user, isCurrentAuth }) {
        this.setState({ user, isCurrentAuth });
    }

    onChangeEditForm = (e) => {
        let field = e.target.name;
        let value = e.target.value;
        let user = { ...this.state.user, [field]: value };
        return this.setState({ user });
    }

    onSaveEditChanges = (e) => {
        e.preventDefault();
        const { match, actions } = this.props;
        console.log(this.state.user);
        this.setState({ isFetching: true });
        actions.updateUserInfo(match.params.id, this.state.user)
            .then(() => {
                let message = { text: 'You successfully update profile!', type: 'success', visibility: true }
                this.handleTabChanged('details');
                this.setState({ message: message });
            })
            .catch(err => {
                console.log(err);
                let message = { text: 'Fecth error! Try again', type: 'danger', visibility: true }
                this.setState({ message: message });

            })
            .then(() => this.setState({ isFetching: false }))
    }

    handleTabChanged = (name) => {
        this.setState({ activeTab: name });
        this.handleAlertDismiss();
    }

    handleAlertDismiss = () => {
        let message = { ...this.state.message, visibility: false };
        this.setState({ message });
    }

    isValidImageSize = (img) => {
        if (img.size > 2 * 1024 * 1024) {
            let message = { text: 'Invalid image size! (maximum 2MB)', type: 'danger', visibility: true }
            this.setState({ message });
            return false;
        }
        return true;
    }

    onAvaChanged = (e) => {
        const reader = new FileReader();
        let img = e.target.files[0];
        if (!this.isValidImageSize(img)) return;
        reader.onloadend = () => {
            let image = Object.assign({}, { mimetype: img.type, data: btoa(reader.result) });
            let userToUpd = Object.assign(this.state.user, { avatar_link: image });
            this.setState({ user: userToUpd });
        }
        reader.readAsBinaryString(img);
    }

    render() {
        const { user, isCurrentAuth, activeTab, message } = this.state;
        const currentTab = activeTab === 'details'
            ? (<div>
                {user && <ProfileDetails user={user} />}</div>)
            : (< ProfileForm
                user={user}
                onChange={this.onChangeEditForm}
                onSave={this.onSaveEditChanges}
                isFetching={this.state.isFetching}
            />);

        const tabNav = (
            <div>
                {isCurrentAuth
                    &&
                    <Nav bsStyle="pills"
                        justified
                        bsSize='lg'>
                        <NavItem
                            onClick={() => this.handleTabChanged('details')}
                            active={activeTab === 'details'}
                        >Details</NavItem>
                        <NavItem
                            onClick={() => this.handleTabChanged('edit')}
                            active={activeTab === 'edit'}
                        >Edit</NavItem>
                    </Nav>}
            </div>
        );


        return (
            <div id={'main'} >
                <Row id={'real-estates-detail'}>
                    <Col lg={4} md={4} xs={12}>
                        {user &&
                            <ProfileView
                                user={user}
                                enableToEdit={activeTab === 'edit'}
                                onAvaChanged={this.onAvaChanged}
                            />
                        }
                    </Col>
                    <Col lg={8} md={8} xs={12}>
                        <Panel>
                            {tabNav}
                            <hr className='divider' />
                            {message.visibility &&
                                <Alert bsStyle={message.type} onDismiss={this.handleAlertDismiss}>
                                    <h4><center>{message.text}</center></h4>
                                </Alert>}
                            {currentTab}
                        </Panel>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { match } = ownProps;
    if (state.authUser._id) {
        if (state.authUser._id.toString() === match.params.id) {
            return { user: state.authUser, isCurrentAuth: true };
        }
    }
    return { user: null };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage));