import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import './index.css';
import '../node_modules/toastr/build/toastr.min.css';

import Layout from "./components/Layout";
import AuthMiddleware from './components/AuthMiddleware';

import HomePage from "./containers/HomePage";
import ErrorPage from "./containers/ErrorPage";
import SignInPage from "./containers/auth/SignInPage";
import SignUpPage from './containers/auth/SignUpPage';
import ProjectsPage from './containers/ProjectsPage';
import ProjectDashboardPage from './containers/ProjectDashboardPage';
import ProfilePage from './containers/ProfilePage';
import UsersPage from './containers/UsersPage';

import * as auth from './auth/index';
import { loadAuthUser } from './actions/userActions';


const store = configureStore();

if (auth.isUserAuth()) store.dispatch(loadAuthUser(auth.getUserId()))

const App = () => {
    return (
        <div className="app">
            <Provider store={store}>
                <BrowserRouter>
                    <Layout>
                        <Switch>
                            <Route exact path='/' component={HomePage} />
                            <Route exact path='/signin' component={SignInPage} />
                            <Route exact path='/signup' component={SignUpPage} />
                            <Route exact path='/users' render={() => { return (<AuthMiddleware><UsersPage /></AuthMiddleware>) }} />
                            <Route exact path='/projects' render={() => { return (<AuthMiddleware><ProjectsPage /></AuthMiddleware>) }} />
                            <Route exact path='/projects/:id' render={() => { return (<AuthMiddleware><ProjectDashboardPage /></AuthMiddleware>) }} />
                            <Route exact path='/profile/:id' render={() => { return (<AuthMiddleware><ProfilePage /></AuthMiddleware>) }} />
                            <Route render={() => { return (<ErrorPage status={404} message={'Not found'} />) }} />
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </Provider>
        </div>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));
