import React from 'react';
import { Alert, Panel, Col } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';

import SignInForm from "../../components/auth/SignInForm";
import auth from '../../auth/index';

class SignInPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: "",
                password: ""
            },
            message: {
                visibility: false,
                text: '',
                type: ''
            }
        };
    }

    componentWillMount() {
        const { location } = this.props;
        if (location.state) {
            this.setState({ message: location.state.message });
        }
    }

    setFormState = (e) => {
        let field = e.target.name;
        let value = e.target.value;
        let user = Object.assign({}, this.state.user);
        user[field] = value;
        return this.setState({ user: user });
    };

    saveUser = (e) => {
        e.preventDefault();
        const { actions, history } = this.props;
        actions.loginUser(this.state.user)
            .then(() => { history.push('/projects'); })
            .catch(err => {
                console.log(err.message);
                this.setState({
                    message: {
                        visibility: true,
                        text: 'Invalid username or password!',
                        type: 'danger'
                    }
                })
            });
    };

    handleAlertDismiss = () => {
        let message = { ...this.state.message, visibility: false };
        this.setState({ message });
    }

    render() {
        if(auth.isUserAuth()) this.props.history.push('/projects');
        const title = <div className="text-center"><h4>Please Sign In</h4></div>;
        return (
            <div>
                <Col md={6} mdOffset={3} sm={8} smOffset={2} xs={10} xsOffset={1}>
                    <Panel header={title} bsStyle={'info'}>
                        {this.state.message.visibility &&
                            <Alert bsStyle={this.state.message.type} onDismiss={this.handleAlertDismiss}>
                                <h4><center>{this.state.message.text}</center></h4>
                            </Alert>}
                        <SignInForm
                            user={this.state.user}
                            onChange={this.setFormState}
                            onSave={this.saveUser}
                        />
                        <hr className="divider" />
                        New here? <Link to="/signup">Join us</Link>
                    </Panel>
                </Col>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(userActions, dispatch)
    }
};

export default withRouter(connect(null, mapDispatchToProps)(SignInPage));