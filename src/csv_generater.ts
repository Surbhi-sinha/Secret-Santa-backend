// takes a json and return a csv
import { createObjectCsvWriter } from "csv-writer";

function writeCSV(processedData:any[]) : void{

    const csvWriter = createObjectCsvWriter({
        path:"output.csv",
        header:[
            {id:"Employee_Name" , title:"Employee_Name"},
            {id:"Employee_EmailID" , title:"Employee_EmailID"},
            {id:"Secret_Child_Name" , title:"Secret_Child_Name"},
            {id:"Secret_Child_EmailID" , title:"Secret_Child_EmailID"}
        ]
    })
    csvWriter.writeRecords(processedData).then(() => console.log("CSV file created!"));
}

export default writeCSV;