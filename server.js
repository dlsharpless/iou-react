const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect('mongodb://localhost/iou_db', {
  useNewUrlParser: true
});

const apiRoutes = require("./api-routes.js");
app.use(apiRoutes);

app.listen(PORT, function () {
  console.log(`App running on port ${PORT}`);

});