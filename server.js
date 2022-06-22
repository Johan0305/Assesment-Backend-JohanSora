const app = require("./src/app");
const { connect } = require("./src/db");

const port = process.env.PORT;
connect();

app.listen(port, () => {
  console.log("Welcome back");
});
