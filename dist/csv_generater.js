"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// takes a json and return a csv
const csv_writer_1 = require("csv-writer");
function writeCSV(processedData) {
    const csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
        path: "output.csv",
        header: [
            { id: "Employee_Name", title: "Employee_Name" },
            { id: "Employee_EmailID", title: "Employee_EmailID" },
            { id: "Secret_Child_Name", title: "Secret_Child_Name" },
            { id: "Secret_Child_EmailID", title: "Secret_Child_EmailID" }
        ]
    });
    csvWriter.writeRecords(processedData).then(() => console.log("CSV file created!"));
}
exports.default = writeCSV;
