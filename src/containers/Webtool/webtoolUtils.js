var moment = require('moment');

export function _calculateAge(birthday) {
    // birthday is a date
    var dob = new Date(birthday);
    var ageDifMs = Date.now() - dob.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function _dateFormatter(date, strFormat) {
    return moment(new Date(date)).format(strFormat);
}
