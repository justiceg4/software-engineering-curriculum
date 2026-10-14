const chalk = require('chalk');

function formatAdd(dataSet) {
    console.log(chalk.cyan.bgYellow(`Added: ${dataSet.item} - $${dataSet.price.toFixed(2)}`));
}

function formatList(data) {
    // item counter
    let i = 0;
    console.log(chalk.green("Expenses:"))
    // iterating an array of objects - tofixed sets two decimal places
    for (const itemObj of data) {
        console.log(chalk.green(`${++i}. ${itemObj.item} - $${itemObj.price.toFixed(2)}`));
    }
    if (i === 0) {
        console.log(chalk.blue("**NONE**"));
    }
}

function formatTotal(total) {
    console.log(chalk.magenta.bgGreen.bold(`Total: $${total.toFixed(2)}`));
}

module.exports = {
    formatAdd,
    formatList,
    formatTotal
};