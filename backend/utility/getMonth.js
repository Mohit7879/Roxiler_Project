module.exports.getMonth=function getMonthNumber(month) {
    month = month.toLowerCase();
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    return( months.indexOf( month) + 1); // Adding 1 because month indexes start from 0
}