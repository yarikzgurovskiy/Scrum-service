import React from 'react';

import ProjectForm from '../components/project/ProjectForm';
import Avatar from '../components/Avatar';
import MembersList from '../components/project/MembersList';
import ProjectDetails from '../components/project/ProjectDetails';
import DeleteModal from '../components/DeleteModal';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectActions from '../actions/projectActions';

import { withRouter } from 'react-router-dom';

import { Tab, Row, Col, Panel, Button } from 'react-bootstrap';
import toastr from 'toastr';

class ProjectSettingsTab extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            project: this.props.project,
            showModal: false,
            isFetching: false
        }
    }

    handleFormChange = (e) => {
        let field = e.target.name;
        let value = e.target.value;
        this.setState({ project: { ...this.state.project, [field]: value } });
    }

    handleSaveEdit = (e) => {
        e.preventDefault();
        const { project } = this.state;
        this.setState({ isFetching: true });
        this.props.actions.updateProject(project._id, project)
            .then(() => { toastr.success('Project successfully update!'); })
            .catch(err => {
                console.log(err);
                toastr.error('Fetch error! Try again!');
            })
            .then(() => this.setState({ isFetching: false }));
    }

    handleProjectDelete = () => {
        this.hideModal();
        this.props.actions.deleteProject(this.props.user._id, this.state.project._id)
            .then((res) => {
                console.log(res);
                this.props.history.push('/projects');
                toastr.success('Project successfully deleted!');
            })
            .catch(err => console.log(err));

    }
    isValidImageSize = (img) => {
        if (img.size > 2 * 1024 * 1024) {
            toastr.warning('Invalid image size! (maximum 2MB)');
            return false;
        }
        return true;
    }

    onAvaChanged = (e) => {
        const reader = new FileReader();
        let img = e.target.files[0];
        if (!this.isValidImageSize(img)) return;
        reader.onloadend = () => {
            let image = Object.assign({}, { mimetype: img.type, data: btoa(reader.result) });
            let projectToUpd = Object.assign({}, this.state.project, { image_url: image });
            this.setState({ project: projectToUpd });
        }
        reader.readAsBinaryString(img);
    }

    showModal = () => this.setState({ showModal: true });
    hideModal = () => this.setState({ showModal: false });

    render() {
        const { project } = this.state;
        console.log(project);
        return (
            <Tab.Pane>
                <h2 className="page-header text-center">Settings</h2>
                <Row>
                    <Col md={4} lg={4} sm={4} xs={12}>
                        <Panel>
                            <div className="text-center" id="author">
                                <Avatar
                                    image={project.image_url}
                                    enableToEdit
                                    onImageChanged={this.onAvaChanged}
                                />
                            </div>
                            <hr className={'divider'} />
                            <Button
                                type="button"
                                bsStyle={'danger'}
                                block
                                title={'Click to delete current project'}
                                onClick={this.showModal}
                            >Delete project
                            </Button>
                            <DeleteModal
                                show={this.state.showModal}
                                onDeleteProject={this.handleProjectDelete}
                                onHide={this.hideModal}
                                text={'Are you sure that you want to delete this project?'}
                            />
                            {(project.members.length > 0) && (<MembersList members={project.members} />)}
                        </Panel>
                    </Col>
                    <Col md={8} lg={8} sm={8} xs={12}>
                        <Panel>
                            <ProjectDetails project={project} />
                            <ProjectForm
                                project={project}
                                onChange={this.handleFormChange}
                                onSave={this.handleSaveEdit}
                                isFetching={this.state.isFetching}
                            />
                        </Panel>
                    </Col>
                </Row>
            </Tab.Pane>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.authUser,
        project: state.project
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(projectActions, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectSettingsTab));
