import React from 'react';
import { Form, FormGroup, ControlLabel, InputGroup, HelpBlock, FormControl, Row, Col, Button, Glyphicon, Modal } from 'react-bootstrap';

const ProjectCreateModal = ({ onCreateProject, project, onChange, show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Create Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onCreateProject} >
                    <FormGroup controlId="name">
                        <ControlLabel htmlFor={"name"}>Project Name</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>
                                <Glyphicon glyph="blackboard" />
                            </InputGroup.Addon>
                            <FormControl
                                autoFocus
                                placeholder={'Project name'}
                                required
                                type={"text"}
                                name={"name"}
                                value={project.name}
                                maxLength={30}
                                onChange={onChange}
                                autoComplete="off"
                            />
                        </InputGroup>
                        <HelpBlock>Max length: 30 characters</HelpBlock>
                    </FormGroup>
                    <FormGroup controlId="key">
                        <ControlLabel htmlFor={"key"}>Unique Key</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>
                                <Glyphicon glyph="lock" />
                            </InputGroup.Addon>
                            <FormControl
                                placeholder={'Unique key'}
                                required
                                type={"text"}
                                name={"name_key"}
                                value={project.name_key}
                                maxLength={10}
                                onChange={onChange}
                                autoComplete="off"
                            />
                        </InputGroup>
                        <HelpBlock>Max length: 10 characters</HelpBlock>
                    </FormGroup>
                    <Row>
                        <Col md={6} mdOffset={3}>
                            <Button
                                bsStyle={'success'}
                                type="submit"
                                block
                            >Create new
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default ProjectCreateModal;