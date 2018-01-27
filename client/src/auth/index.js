const jwt = require('jsonwebtoken');

function authUser(token) {
    localStorage.setItem('token', token);
}
function isUserAuth() {
    return localStorage.getItem('token') !== null
}
function getUserId() {
    if (isUserAuth()) {
        let decoded = jwt.decode(getToken());
        if (decoded) return decoded.id;
    }
}

function deauthUser() {
    localStorage.removeItem('token')
}

function getToken() {
    return localStorage.getItem('token');
}

module.exports = {
    authUser,
    deauthUser,
    isUserAuth,
    getUserId,
    getToken
}   