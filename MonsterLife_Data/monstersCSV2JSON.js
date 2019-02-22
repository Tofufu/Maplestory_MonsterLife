/*
- npm install csvtojson

Changed CSV headers to allow csvjson to created nested elements.
Original Header: 
name,rank,category,obtained,stat,id,combo1,combo2,result1,result2,result3,combobinary,resultbinary
New Header:
name,rank,category,obtained,stat,id,combo.combo1,combo.combo2,result.0,result.1,result.2,combobinary,resultbinary
{
        name: String,
        rank: String,
        category: String,
        obtained: String,
        stat: String,
        id: , 
        result: [.],
        resultbinary: ,
        combo: 
        {
            combo1: String,
            combo2: String
        },
        combobinary: 
    } 
*/
const csvtojson = require("csvtojson");
const csvFilePath = __dirname + "\\monstersCSV.csv";
const fs = require("fs");
csvtojson().fromFile(csvFilePath).then((jsonObjectCreated)=>{
    /*
    console.log(jsonObjectCreated);
    { name: 'Moon Bunny',
    rank: 'A',
    category: 'Special',
    obtained: 'Monster Box',
    stat: 'Farm monster EXP gain +1',
    id: '5100100',
    combo: { combo1: '', combo2: '' },
    result: [ '9500530', '9303025', '' ],
    combobinary: '',
    resultbinary: '1' }
    */
   var data = JSON.stringify(jsonObjectCreated);
   fs.writeFileSync("monstersJSON.json", data);
});