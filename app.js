const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { graphql } = require('graphql');
const graphqlHTTP = require('express-graphql');
const express = require('express');

import schema from './schema';

const app = express();

// 启用 graphiql
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

const port = 3000;
app.listen(port, () => {
  console.log(`GraphQL listening at port ${port}`);
})

module.exports = app;
