let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
const busboyBodyParser = require('busboy-body-parser');
let router = express.Router();
let passport = require('passport');

require('dotenv').config();

let passportStrategies = require('./config/passportStrategies');

let app = express();
let io = require('socket.io').listen(app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
}))

io.sockets.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('CREATE ROOM', roomId => {
        socket.room = roomId;
        socket.join(roomId);
        socket.emit('UPDATE PROJECT');
    })

    socket.on('PROJECT CHANGED', (data, projectRoomId) => {
        io.sockets.in(projectRoomId).emit('UPDATE PROJECT')
    })

    socket.on('LEAVE ROOM', () => { })
    socket.on('disconnect', function () {
        console.log('user disconnected');
        socket.leave(socket.room);
    });
});

app.use(require('express').static(path.join(__dirname + '/client/', 'build')));

app.use(passport.initialize());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({
    extended: false,
    limit: '5mb'
}));
app.use(busboyBodyParser({ limit: '5mb' }));
app.use(cookieParser());

//routes
const projects = require('./routes/projects');
const auth = require('./routes/auth');
const user = require('./routes/user');


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Request-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use('/api/projects', projects);
app.use('/api/auth', auth);
app.use('/api/user', user);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});


// error handlers
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    console.dir(err);
    res.status(err.status || 500);
    if (err.status === 500) {
        console.error(err.stack);
        res.json({
            error: 'Internal Server Error'
        });
    } else if (err.status === 404) {
        res.json({
            error: err.message,
            status: err.status
        });
    } else {
        res.json({
            error: err.message
        });
    }
});

module.exports = app;
