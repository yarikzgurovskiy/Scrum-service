import React from 'react';
import { ControlLabel, FormControl, Button, FormGroup, Col, Form, Glyphicon, InputGroup, Row, HelpBlock } from 'react-bootstrap';

const SignUpForm = ({ onSave, user, onChange, isFormValid }) => {
    return (
        <Form onSubmit={onSave} >
            <Row>
                <Col md={6}>
                    <FormGroup controlId={'first_name'} validationState={user.first_name.status}>
                        <ControlLabel htmlFor={'first_name'}>First Name</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>
                                <Glyphicon glyph="user" />
                            </InputGroup.Addon>
                            <FormControl
                                required
                                placeholder={'First name'}
                                autoFocus
                                type={'text'}
                                name={'first_name'}
                                value={user.first_name.value}
                                onChange={onChange}
                            />
                        </InputGroup>
                        {(user.first_name.status === 'error') && <HelpBlock>{user.first_name.error}</HelpBlock>}
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup controlId={'last_name'} validationState={user.last_name.status}>
                        <ControlLabel htmlFor={'last_name'}>Last Name</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>
                                <Glyphicon glyph="user" />
                            </InputGroup.Addon>
                            <FormControl
                                required
                                type={'text'}
                                placeholder={'Last name'}
                                name={'last_name'}
                                value={user.last_name.value}
                                onChange={onChange}
                            />
                        </InputGroup>
                        {(user.last_name.status === 'error') && <HelpBlock>{user.last_name.error}</HelpBlock>}
                    </FormGroup>
                </Col>
            </Row>
            <FormGroup controlId={'username'} validationState={user.username.status}>
                <ControlLabel htmlFor={'username'}>Username</ControlLabel>
                <InputGroup>
                    <InputGroup.Addon>
                        <Glyphicon glyph="user" />
                    </InputGroup.Addon>
                    <FormControl
                        required
                        type={'text'}
                        name={'username'}
                        placeholder={'Username'}
                        value={user.username.value}
                        onChange={onChange}
                    />
                </InputGroup>
                {(user.username.status === 'error') && <HelpBlock>{user.username.error}</HelpBlock>}
            </FormGroup>
            <FormGroup controlId="email" validationState={user.email.status}>
                <ControlLabel htmlFor={"email"}>Email</ControlLabel>
                <InputGroup>
                    <InputGroup.Addon>
                        <Glyphicon glyph="envelope" />
                    </InputGroup.Addon>
                    <FormControl
                        required
                        type={"email"}
                        placeholder={'Email'}
                        name={"email"}
                        value={user.email.value}
                        onChange={onChange}
                    />
                </InputGroup>
                {(user.email.status === 'error') && <HelpBlock>{user.email.error}</HelpBlock>}
            </FormGroup>
            <Row>
                <Col md={6}>
                    <FormGroup controlId="password" validationState={user.password.status}>
                        <ControlLabel htmlFor={"password"}>Password</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>
                                <Glyphicon glyph="lock" />
                            </InputGroup.Addon>
                            <FormControl
                                required
                                type={"password"}
                                placeholder={'Password'}
                                name={"password"}
                                value={user.password.value}
                                onChange={onChange}
                            />
                        </InputGroup>
                        {(user.password.status === 'error') && <HelpBlock>{user.password.error}</HelpBlock>}
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup controlId="password2" validationState={user.password2.status}>
                        <ControlLabel htmlFor={"password2"}>Confirm Password</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>
                                <Glyphicon glyph="lock" />
                            </InputGroup.Addon>
                            <FormControl
                                required
                                type={"password"}
                                name={"password2"}
                                placeholder={'Password confirmation'}
                                value={user.password2.value}
                                onChange={onChange}
                            />
                        </InputGroup>
                        {(user.password2.status === 'error') && <HelpBlock>{user.password2.error}</HelpBlock>}
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={6} mdOffset={3}>
                    <Button
                        disabled={!isFormValid}
                        type="submit"
                        bsStyle={'primary'}
                        block
                    >Register Me
                    </Button>
                </Col>
            </Row>
        </Form >
    );
}

export default SignUpForm;