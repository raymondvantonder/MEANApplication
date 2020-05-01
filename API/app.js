//api
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//security
const helmet = require('helmet'); //to-do investigate
//logging
const morgan = require('morgan');
//database
const { connectDatabase } = require('./services/database/mongo');
//routes
const testRoutes = require('./routes/test');
const userRoutes = require('./routes/user');

const { errorHandlingMiddleware } = require('./utils/error-handling/error-handler');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

app.use('/', testRoutes);
app.use('/', userRoutes);

app.use(errorHandlingMiddleware);

connectDatabase().then(async () => {
  app.listen(3001, async () => {
    console.log('listening on port 3001');
  });
});
