const express = require("express");
let cors = require("cors");
let studentSchema = require("./DataModel");
let csv = require("csvtojson");
let multer = require("multer");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

const app = express();
const port = 8000;
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/list", (req, res) => {
  let data = studentSchema.find({});
  data.exec(function (err, data) {
    if (err) throw err;
    res.status(200).json(data);
  });
});

app.post("/upload", upload.single("image"), (req, res) => {
  if (req.file) {
    csv()
      .fromFile(req.file.path)
      .then((response) => {
        for (let i = 0; i < response.length; i++) {
          response[i].reg_no = parseInt(response[i]["Register Number"]);
          response[i].mobile = parseInt(response[i].Mobile);
        }

        studentSchema.insertMany(response, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Data Added");
            res.status(200).send(true);
          }
        });
      });
  }
});

try {
  mongoose.connect(
    "mongodb+srv://themukherjee:adminjeet@cluster0.undti.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true },
    () => {
      console.log("Connected");
      app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
      });
    }
  );
} catch (error) {
  console.log(error);
}
