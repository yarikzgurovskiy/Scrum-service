import React from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';

const DeleteModal = ({ onDeleteProject, show, onHide, text }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='text-center'><h4>{text}</h4></div>
                <hr className='divider' />
                <Row>
                    <Col md={6} mdOffset={3}>
                        <Button
                            bsStyle={'danger'}
                            type="button"
                            block
                            onClick={onDeleteProject}
                        >Delete
                        </Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}

export default DeleteModal;