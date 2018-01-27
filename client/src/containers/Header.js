import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions';
import { withRouter } from 'react-router-dom';

import Navigation from '../components/Navigation';

const mapStateToProps = state => {
    return {
        user: state.authUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(userActions, dispatch)
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));
