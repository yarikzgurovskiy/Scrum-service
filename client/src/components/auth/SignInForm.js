import React from 'react';
import { ControlLabel, FormControl, Button, FormGroup, Col, Form, Glyphicon, InputGroup, Row } from 'react-bootstrap';

const SignInForm = ({ user, onSave, onChange }) => {
    return (
        <Form onSubmit={onSave} >
            <FormGroup controlId="username">
                <ControlLabel htmlFor={"username"}>Username</ControlLabel>
                <InputGroup>
                    <InputGroup.Addon>
                        <Glyphicon glyph="user" />
                    </InputGroup.Addon>
                    <FormControl
                        autoFocus
                        placeholder={'Username'}
                        required
                        type={"text"}
                        name={"username"}
                        value={user.username}
                        onChange={onChange}
                    />
                </InputGroup>
            </FormGroup>
            <FormGroup controlId="password">
                <ControlLabel htmlFor={"password"}>Password</ControlLabel>
                <InputGroup>
                    <InputGroup.Addon>
                        <Glyphicon glyph="lock" />
                    </InputGroup.Addon>
                    <FormControl
                        required
                        placeholder={'Password'}
                        type={"password"}
                        name={"password"}
                        value={user.password}
                        onChange={onChange}
                    />
                </InputGroup>
            </FormGroup>
            <Row>
                <Col md={6} mdOffset={3}>
                    <Button
                        bsStyle={'primary'}
                        type="submit"
                        block
                    >Sign In
                    </Button>
                </Col>
            </Row>
        </Form>
    )
};


export default SignInForm;