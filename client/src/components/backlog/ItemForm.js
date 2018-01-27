import React from 'react';
import { Form, FormControl, Row, Button, Col, FormGroup ,ControlLabel } from 'react-bootstrap';

const ItemForm = ({ issue, performers, lead, onCreateIssue, onChange, handlePerformersSelect }) => {
    const performersList = (performers)
        ? performers.map(p => {
            return (<option key={p._id} value={p._id}>{p.first_name} {p.last_name}</option>)
        })
        : ('Loading...')
    const options = performers.map(p => { return { label: `${p.first_name}`, value: p._id } });
    options.push({ label: lead.first_name, value: lead._id });

    return (
        <Form inline onSubmit={onCreateIssue}>
            <Row>
                <FormGroup>
                    <select className="form-control" name="type" value={issue.type} onChange={onChange} required>
                        <option value="story">Story</option>
                        <option value="task">Task</option>
                    </select>
                </FormGroup>
                <FormGroup>
                    <FormControl
                        onChange={onChange}
                        type={'text'}
                        name={'name'}
                        value={issue.name}
                        placeholder="What need to be done?"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl
                        onChange={onChange}
                        value={issue.story_points}
                        type="number"
                        name="story_points"
                        min="1"
                        placeholder={'Story points'}
                        required />
                </FormGroup>
                <FormGroup>
                    <select className="selectpicker form-control" value={issue.priority} name="priority" onChange={onChange} title="Choose priority" required>
                        <option value="5">Highest</option>
                        <option value="4">High</option>
                        <option value="3">Medium</option>
                        <option value="2">Low</option>
                        <option value="1">Lowest</option>
                    </select>
                </FormGroup>
                <FormGroup>
                    <select className="form-control" name="performers" value={issue.performers} multiple={true} onChange={onChange} title="Choose performers" required>
                        <option value={lead._id}>{lead.first_name} {lead.last_name}</option>
                        {performersList}
                    </select>
                </FormGroup>
            </Row>
            <Row>
                <Col md={4} mdOffset={4}>
                    <Button
                        bsStyle={'primary'}
                        type="submit"
                        block
                    >Create
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default ItemForm;