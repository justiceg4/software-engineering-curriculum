const chalk = require('chalk');
const expenseCal = require("./expenseStore");
const { formatAdd, formatList, formatTotal } = require("./formatter");

// stores arguments after index 2
const args = process.argv.slice(2);

const command = args[0];

if (command !== undefined) {
    if (command === "add") {
        const expenseItem = args[1];

        if (expenseItem !== undefined && expenseItem.trim() !== '') {
            // converts string to number
            const itemPrice = Number(args[2]);

            // price must be greater than 0,
            // Number.isFinite checks to make sure number is not NaN, or +/- Infinity
            if (itemPrice > 0 && Number.isFinite(itemPrice)) {
                const newDataSet = expenseCal({
                    command: command,
                    item: expenseItem,
                    price: itemPrice
                });
                formatAdd(newDataSet);
            } else {
                console.log(chalk.red("ERROR: Command-line is missing price or number is invalid and must be greater than 0"));
            }
        } else {
            console.log(chalk.red("ERROR: Command-line has an empty expense item"));
        }

    } else if (command === "list") {
        const storeData = expenseCal({
            command: command,
        });
        formatList(storeData);
    } else if (command === "total") {
        const totalOfList = expenseCal({
            command: command,
        });
        formatTotal(totalOfList);
    } else if (command === "remake") {
        expenseCal({
            command: command,
        });
    } else {
        console.log(chalk.red("ERROR: Please enter a valid command! (ex. add,list, total, remake)"));
    }
} else {
    console.log(chalk.red("ERROR: Command-line is missing arguments"));
}