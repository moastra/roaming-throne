let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

const port = process.env.PORT || 3001;

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

const db = require('./db');
const dbHelpers = require('./db/helpers/dbHelpers')(db);

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter(dbHelpers));


const http = app.listen(port, () => {
  console.log(`Server listening on PORT: ${port}`);
});

// module.exports = app;
