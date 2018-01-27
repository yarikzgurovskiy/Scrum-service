import React from 'react';
import { Row, Col, Button, Form, FormControl, FormGroup, Glyphicon, InputGroup, ControlLabel } from 'react-bootstrap';

const ProjectForm = ({ project, onSave, onChange, isFetching }) => {
    return (
        <Form onSubmit={onSave} >
            <FormGroup controlId={'name'}>
                <ControlLabel htmlFor={'name'}>Name</ControlLabel>
                <InputGroup>
                    <InputGroup.Addon>
                        <Glyphicon glyph="user" />
                    </InputGroup.Addon>
                    <FormControl
                        placeholder={'Name'}
                        type={'name'}
                        name={'name'}
                        value={project.name}
                        onChange={onChange}
                    />
                </InputGroup>
            </FormGroup>
            <div className="form-group">
                <label className="control-label">Description</label>
                <textarea className="form-control" style={{ maxWidth: '100%' }} name="description" rows="6" onChange={onChange} value={project.description}/>
            </div>
            <Row>
                <Col md={6} mdOffset={3}>
                    <Button
                        disabled={isFetching}
                        type="submit"
                        bsStyle={'success'}
                        block
                        title={'Click to save changes'}
                    >{isFetching ? 'Saving...' : 'Save changes'}
                    </Button>
                </Col>
            </Row>
        </Form >
    )
}

export default ProjectForm;