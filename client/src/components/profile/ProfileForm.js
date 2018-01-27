import React from 'react';
import { ControlLabel, FormControl, Button, FormGroup, Col, Form, Glyphicon, InputGroup, Row, Radio } from 'react-bootstrap';


const ProfileForm = ({ user, onChange, onSave, isFetching }) => {
    return (
        <Form onSubmit={onSave} >
            <Row>
                <Col md={6}>
                    <FormGroup controlId={'first_name'}>
                        <ControlLabel htmlFor={'first_name'}>First Name</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>
                                <Glyphicon glyph="user" />
                            </InputGroup.Addon>
                            <FormControl
                                autoFocus
                                type={'text'}
                                name={'first_name'}
                                value={user.first_name}
                                onChange={onChange}
                            />
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup controlId={'last_name'}>
                        <ControlLabel htmlFor={'last_name'}>Last Name</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>
                                <Glyphicon glyph="user" />
                            </InputGroup.Addon>
                            <FormControl
                                type={'text'}
                                name={'last_name'}
                                value={user.last_name}
                                onChange={onChange}
                            />
                        </InputGroup>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <FormGroup controlId={'country'}>
                        <ControlLabel htmlFor={'country'}>Country</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>
                                <Glyphicon glyph="user" />
                            </InputGroup.Addon>
                            <FormControl
                                type={'text'}
                                name={'country'}
                                value={user.country}
                                onChange={onChange}
                            />
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup controlId={'city'}>
                        <ControlLabel htmlFor={'city'}>City</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>
                                <Glyphicon glyph="user" />
                            </InputGroup.Addon>
                            <FormControl
                                type={'text'}
                                name={'city'}
                                value={user.city}
                                onChange={onChange}
                            />
                        </InputGroup>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <FormGroup controlId={'facebook'}>
                        <ControlLabel htmlFor={'facebook'}>Facebook</ControlLabel>
                        <InputGroup>
                            <FormControl
                                type={'text'}
                                name={'facebook'}
                                value={user.facebook}
                                onChange={onChange}
                            />
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup controlId={'linkedIn'}>
                        <ControlLabel htmlFor={'linkedIn'}>LinkedIn</ControlLabel>
                        <InputGroup>
                            <FormControl
                                type={'text'}
                                name={'linkedIn'}
                                value={user.linkedIn}
                                onChange={onChange}
                            />
                        </InputGroup>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <FormGroup controlId={'telegram'}>
                        <ControlLabel htmlFor={'telegram'}>Telegram</ControlLabel>
                        <InputGroup>
                            <FormControl
                                type={'text'}
                                name={'telegram'}
                                value={user.telegram}
                                onChange={onChange}
                            />
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup controlId={'github'}>
                        <ControlLabel htmlFor={'github'}>GitHub</ControlLabel>
                        <InputGroup>
                            <FormControl
                                type={'text'}
                                name={'github'}
                                value={user.github}
                                onChange={onChange}
                            />
                        </InputGroup>
                    </FormGroup>
                </Col>
            </Row>
            <FormGroup>
                <ControlLabel htmlFor={'gender'}>Gender</ControlLabel>
                <InputGroup>
                    <Radio
                        inline
                        name="gender"
                        value="male"
                        checked={user.gender === 'male'}
                        onChange={onChange}
                    >Male</Radio>
                    <Radio
                        inline
                        name="gender"
                        value="female"
                        checked={user.gender === 'female'}
                        onChange={onChange}
                    >Female</Radio>
                </InputGroup>
            </FormGroup>
            <Row>
                <Col md={6} mdOffset={3}>
                    <Button
                        disabled={isFetching}
                        type="submit"
                        bsStyle={'success'}
                        block
                        title={'Click to save changes'}
                    >{isFetching ? 'Updating...' : 'Save changes'}
                    </Button>
                </Col>
            </Row>
        </Form >
    )
}

export default ProfileForm;