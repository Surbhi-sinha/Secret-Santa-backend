"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = __importStar(require("fs"));
// module imports
const csv_reader_1 = __importDefault(require("./csv_reader"));
const csv_generater_1 = __importDefault(require("./csv_generater"));
const SecretSantaCreator_1 = require("./SecretSantaCreator");
// server code
const app = express();
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://  secret-santa-frontend-kvh43iwy3-surbhi-sinhas-projects.vercel.app",
        "https://secret-santa-frontend-self.vercel.app",
    ],
    credentials: true, // If using cookies or authentication
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
}));
const upload = multer({ dest: "uploads/" });
app.get("/", (req, res) => {
    res.send("Hi from server");
});
app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No File Uploaded");
    }
    const filePath = req.file.path;
    var result = (0, csv_reader_1.default)(filePath).then((data) => {
        //processing logic
        const processesData = data.map((row, index) => (Object.assign(Object.assign({}, row), { Secret_Child_Name: `Secret_child_name ${index + 1}`, Secret_Child_EmailID: `Secret_child_email ${index + 1}` })));
        let useHistory = data[0].Secret_Child_Name ? true : false;
        //actual implementation
        var secret_santa_creator = new SecretSantaCreator_1.SecretSantaCreator();
        var secret_santa_object = secret_santa_creator.createSecretSanta(useHistory);
        var secret_child_association = secret_santa_object.assignSecretChild(data);
        // console.log(secret_child_association);
        (0, csv_generater_1.default)(secret_child_association);
    });
    const outputPath = "output.csv";
    res.download(outputPath, "download.csv", () => {
        fs.unlinkSync(req.file.path); // cleans up the empty files
        // fs.unlinkSync(outputPath);
    });
});
app.listen(5100, () => console.log("server running on port http://localhost:5100"));
