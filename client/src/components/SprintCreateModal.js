import React from 'react';
import { Form, FormGroup, ControlLabel, HelpBlock, FormControl, Row, Col, Button, Modal } from 'react-bootstrap';
import DatePicker from 'react-16-bootstrap-date-picker';

const SprintCreateModal = ({ onCreateSprint, sprint, onChange, show, onHide, onDateChanged }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Start sprint</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onCreateSprint} >
                    <FormGroup controlId="name">
                        <ControlLabel htmlFor={"name"}>Sprint Name</ControlLabel>
                        <FormControl
                            autoFocus
                            placeholder={'Sprint name'}
                            required
                            type={"text"}
                            name={"name"}
                            value={sprint.name}
                            maxLength={20}
                            minLength={5}
                            onChange={onChange}
                            autoComplete="off"
                        />
                        <HelpBlock>Max length: 20 characters</HelpBlock>
                    </FormGroup>
                    <FormGroup controlId="goal">
                        <ControlLabel htmlFor={"goal"}>Sprint Goal</ControlLabel>
                        <FormControl
                            placeholder={'Sprint goal'}
                            required
                            type={"text"}
                            name={"goal"}
                            value={sprint.goal}
                            maxLength={50}
                            minLength={5}
                            onChange={onChange}
                            autoComplete="off"
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel htmlFor={"date"}>Finish date</ControlLabel>
                        <DatePicker
                            required
                            minDate={new Date().toISOString()}
                            onChange={onDateChanged}
                            value={sprint.finish_date}
                        />
                    </FormGroup>
                    <Row>
                        <Col md={6} mdOffset={3}>
                            <Button
                                bsStyle={'success'}
                                type="submit"
                                block
                            >Start
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default SprintCreateModal;