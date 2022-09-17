require('dotenv').config()
var cors = require('cors')
const express = require('express');
const app = express();
const boatsRouter = require("./routes/boats");
// const bodyParser = require('body-parser');
// build a middleware
// const requestTime = function (req, res, next) {
//   req.requestTime = Date.now()
//   next()
// }
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors())
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/boats",  boatsRouter);

// connect middleware
// app.use(requestTime)
// test the middleware
// app.get('/', (req,res) => {
//   let responseText = 'Hello World!<br>'
//   responseText += `<small>Requested at: ${req.requestTime}</small>`
//   res.send(responseText)

// } );



// Use port 8080 by default, unless configured differently in Google Cloud
const port = process.env.PORT || 8081;
app.listen(port, () => {
   console.log(`App is running at: http://localhost:${port}`);
});