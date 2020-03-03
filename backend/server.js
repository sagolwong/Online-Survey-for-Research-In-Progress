const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

/*var session = require('./config/session');
var session = session();

var passport = require('./config/passport');
var passport = passport();*/

const usersRouter = require('./routes/users');
const projectsRouter = require('./routes/projects');
const surveysRouter = require('./routes/surveys');
const answersRouter = require('./routes/answers');
const listSurveyRouter = require('./routes/listSurvey');
const requestRouter = require('./routes/requests');
const frequencyRouter = require('./routes/frequency');
const followResultRouter = require('./routes/followResult');
const sampleGroupsRouter = require('./routes/sampleGroups');


app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/surveys', surveysRouter);
app.use('/answers', answersRouter);
app.use('/listSurvey', listSurveyRouter);
app.use('/requests', requestRouter);
app.use('/frequency', frequencyRouter);
app.use('/followResults', followResultRouter);
app.use('/sampleGroups', sampleGroupsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});