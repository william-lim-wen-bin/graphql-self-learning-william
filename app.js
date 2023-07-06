const config = require("./conf/config");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

// Mongoose
const mongoDbConnStr = "mongodb+srv://".concat(
  config.mongoDbConfig.dbUser,
  ":",
  config.mongoDbConfig.dbPassword,
  "@cluster0.p7ylozk.mongodb.net/"
);
mongoose.connect(mongoDbConnStr);
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

// GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
