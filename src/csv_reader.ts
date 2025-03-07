// takes the  CSV  and return a JSON

import * as fs from "fs";

import csvParser from "csv-parser";
import { error } from "console";

async function readCSV(filePath : string) : Promise<any[]> {
    return new Promise<any>((resolve, reject) => {
        const result: any[] = [];

        fs.createReadStream(filePath).pipe(csvParser())
            .on("data", (data: any)=>{
                result.push(data);
            })
            .on("end", ()=> {
                console.log("CSV file read successful. Data : " , result);
                resolve(result);
            })
            .on("error" , ()=> {
                console.log("error while reading CSV ", error);
                reject(error);
            })  
    })
}


export default readCSV;