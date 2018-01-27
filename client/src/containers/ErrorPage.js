import React from 'react';
import { PageHeader, Button, Jumbotron } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';


class ErrorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 404,
            message: 'Not found'
        }
    }
    componentDidMount = () => {
        const { location } = this.props;
        if (location.state) {
            this.setState({ message: location.state.message, status: location.state.status });
        }
    }

    render() {
        const { status, message } = this.state;
        return (
            <Jumbotron>
                <h1 className='text-center'>Error {status}</h1>
                <p className='text-center'>{message}</p>
                <p className={'text-center'}><Button onClick={() => { this.props.history.push('/projects') }} bsStyle="primary">Get Home</Button></p>
            </Jumbotron>
        );
    }


}

export default withRouter(ErrorPage);