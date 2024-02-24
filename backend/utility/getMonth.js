const {errorhandler}=require("../utility/error.js");


module.exports.getMonth=function getMonthNumber(month) {
    month = month.toLowerCase();
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
   
    let monthnumber=months.indexOf( month) + 1
   
    return monthnumber; // Adding 1 because month indexes start from 0
}