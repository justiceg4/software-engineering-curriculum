// file system
const fs = require('fs');

// access to json file path, cache bug if use require
const jsonFilePath = './expenses.json';

function expenseCal(dataObj) {
    // deconstruct our item and price property and also creating two new objects
    const commandArg = dataObj.command;
    const { command, ...dataSet } = dataObj;

    // intiliaze our empty data
    let data = [];

    try {
        // read raw data from json file, 'utf8' required to decode file bytes into text when reading
        const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
        // converts json to js values
        data = JSON.parse(jsonData);
    } catch (e) {
        // skip, if code doesn't exist error displays
        if (e.code !== "ENOENT") {
            console.error('Error handling File:', e);
            // to prevent from execution of the code below, exits program
            return;
        }
    }

    if (commandArg === 'add') {
        try {
            // Append the incoming object to the internal list
            data.push(dataSet);
            // write to json file, convert to JSON, null to leave data untoched, 2 of indention for our JSON
            fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf8');
            // return our single added data set to our app.js to be formatted
            return dataSet;
            // console.log(`Added: ${dataSet.item} - $${dataSet.price}`)
        } catch (e) {
            console.error('Error handling File:', e);
        }
    } else if (commandArg === 'list') {
        // return our data array of objects to app.js to be formatted
        return data;
    } else if (commandArg === 'total') {
        let total = 0;
        // iterating an array of objects
        for (const itemObj of data) {
            total += itemObj.price;
        }
        // return total to our app.js to be formatted
        return total;
    } else if (commandArg === 'remake') {
        try {
            fs.writeFileSync(jsonFilePath, JSON.stringify([], null, 2), 'utf8');
            console.log(`Remaking LIST!(resetting expenses.json)`);
        } catch (e) {
            console.error('Error handling File:', e);
        }
    } else {
        console.log("Not sure how you got here...");
    }

}

// to have our function ready for export
module.exports = expenseCal;