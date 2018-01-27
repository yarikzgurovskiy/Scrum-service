import React from 'react';
import SignUpForm from '../../components/auth/SignUpForm';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import { Col, Panel, Alert } from 'react-bootstrap';
import validator from 'email-validator';
import auth from '../../auth/index';

const defaultUser = {
    first_name: { status: null, value: '', error: 'First name must start with capital letter!' },
    last_name: { status: null, value: '', error: 'Last name must start with capital letter!' },
    username: { status: null, value: '', error: 'Username must be at least 5 characters!' },
    password: { status: null, value: '', error: 'Passwords must be at least 6 characters!' },
    password2: { status: null, value: '', error: 'Passwords must be the same!' },
    email: { status: null, value: '', error: 'Invalid email!' },
}

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: defaultUser,
            message: { visibility: false, text: '', type: '' }
        };
    }

    fieldValidation = (name, value) => {
        switch (name) {
            case 'first_name': {
                if (value.match("^[A-Z][a-z]+(([\\'\\,\\.\\-][a-z])?[a-z]*)*$")) return 'success';
                else if (value) return 'error';
                else return null;
            }
            case 'last_name': {
                if (value.match("^[A-Z][a-z]+(([\\'\\,\\.\\-][a-z])?[a-z]*)*$")) return 'success';
                else if (value) return 'error';
                else return null;
            }
            case 'username': {
                if (value.length >= 5) return 'success';
                else if (value) return 'error';
                else return null;
            }
            case 'password': {
                if (value.length >= 6) return 'success';
                else if (value) return 'error';
                else return null;
            }

            case 'password2': {
                if (value === this.state.user.password.value) return 'success';
                else if (value) return 'error';
                else return null;
            }

            case 'email': {
                if (validator.validate(value)) return 'success';
                else if (value) return 'error';
                else return null;
            }
            default: return null;
        }
    }

    setFormState = (e) => {
        let field = e.target.name;
        let value = e.target.value;
        let status = this.fieldValidation(field, value);
        let user = { ...this.state.user, [field]: { ...this.state.user[field], value, status } };
        if (field === 'password') {
            user = { ...user, password2: { ...this.state.user.password2, status: (value === this.state.user.password2.value) ? 'success' : 'error' } };
        }
        return this.setState({ user });
    };

    isFormValid = () => {
        let isValid = true;
        for (let field in this.state.user) {
            isValid = isValid && (this.fieldValidation(field, this.state.user[field].value) === 'success');
            if (!isValid) return isValid;
        }
        return isValid;
    }

    saveUser = async (e) => {
        e.preventDefault();
        const { user } = this.state;
        let newUser = {};
        Object.keys(user).map(u => newUser[u] = user[u].value);
        this.props.actions.createUser(newUser)
            .then(() => {
                this.props.history.push('/signin', {
                    message: {
                        visibility: true,
                        text: 'You successfuly registered! Sign in',
                        type: 'success'
                    }
                });
            })
            .catch(err => {
                this.setState({
                    message: {
                        visibility: true,
                        text: 'Username or Email already exist',
                        type: 'warning'
                    }
                })
            })
    };

    handleAlertDismiss = () => {
        let message = { ...this.state.message, visibility: false };
        this.setState({ message });
    }

    render() {
        if (auth.isUserAuth()) this.props.history.push('/projects');
        const title = <div className="text-center"><h4>Create account</h4></div>;
        const isFormValid = this.isFormValid();
        return (
            <Col md={6} mdOffset={3} sm={6} smOffset={3} xs={10} xsOffset={1}>
                <Panel header={title} bsStyle={'info'}>
                    {this.state.message.visibility &&
                        <Alert bsStyle={this.state.message.type} onDismiss={this.handleAlertDismiss}>
                            <h4><center>{this.state.message.text}</center></h4>
                        </Alert>}
                    <SignUpForm
                        user={this.state.user}
                        onChange={this.setFormState}
                        onSave={this.saveUser}
                        isFormValid={isFormValid}
                    />
                    <hr className="divider" />
                    Already Registered? <Link to="/signin">Login here</Link>
                </Panel>
            </Col >
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(userActions, dispatch)
    }
};
export default withRouter(connect(null, mapDispatchToProps)(SignUpPage));