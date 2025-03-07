const express = require("express");
const multer = require("multer");
const cors = require("cors");
import * as fs from "fs";

// module imports
import readCSV from "./csv_reader";
import writeCSV from "./csv_generater";
import { SecretSantaCreator } from "./SecretSantaCreator";
// actual logic
// import { SecretSantaCreator } from "./SecretSantaCreator";

// const useHistory = Math.random() > 0.5; // Simulating a condition

// const secretSanta = SecretSantaCreator.createSecretSanta(useHistory);
// secretSanta.assignSecretChild();
// secretSanta.buildCsv();

// server code
const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
const upload = multer({ dest: "uploads/" });

app.get("/", (req: any, res: any) => {
  res.send("Hi from server");
});

app.post("/upload", upload.single("file"), (req: any, res: any) => {
  if (!req.file) {
    return res.status(400).send("No File Uploaded");
  }

  const filePath = req.file.path;
  var result = readCSV(filePath).then((data) => {
    //processing logic
    const processesData = data.map((row: any, index: any) => ({
      ...row,
      Secret_Child_Name: `Secret_child_name ${index + 1}`,
      Secret_Child_EmailID: `Secret_child_email ${index + 1}`,
    }));

    let useHistory = data[0].Secret_Child_Name? true: false;
    //actual implementation
    var secret_santa_creator = new SecretSantaCreator();
    var secret_santa_object = secret_santa_creator.createSecretSanta(useHistory);
    var secret_child_association = secret_santa_object.assignSecretChild(data);
    // console.log(secret_child_association);
    writeCSV(secret_child_association);
  });

  const outputPath = "output.csv";
  res.download(outputPath, "download.csv", () => {
    fs.unlinkSync(req.file.path); // cleans up the empty files
    // fs.unlinkSync(outputPath);
  });
});

app.listen(5100, () =>
  console.log("server running on port http://localhost:5100")
);
