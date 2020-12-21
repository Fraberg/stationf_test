/**
 * pad
 * @param {*} num 
 * @param {*} size 
 */
function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

/**
 * formatTime
 * @param {*} date 
 */
function formatTime (date) {
    return `${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}`;
}

/**
 * formatLiteralDate
 * @param {*} date 
 */
function formatNumericDate (date) {
    return `${pad(date.getDate(), 2)}/${date.getMonth()}/${date.getFullYear()} ${formatTime(date)}`;
}

/**
 * formatLiteralDate
 * @param {*} date 
 */
function formatLiteralDate (date) {
    let days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    let months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    return `${days[date.getDay()]} ${pad(date.getDate(), 2)} ${months[date.getMonth()]} ${date.getFullYear()} ${formatTime(date)}`;
}

/**
 * getRoundedDate
 * @param {*} minutes 
 * @param {*} d 
 */
function getRoundedDate (date, minutes) {
    const ms = 1000 * 60 * minutes; // convert minutes to ms
    const roundedDate = new Date(Math.round(date.getTime() / ms) * ms);
    return roundedDate;
}

/**
 * roundDate - return date rounded to next 5 minutes
 * @param {*} minutes 
 * @param {*} d 
 */
function roundDate (date, minutes) {
    const roundedDate = getRoundedDate(date, minutes);
    if (roundedDate.getTime() > date.getTime()) {
        return roundedDate;
    } else {
        return new Date(roundedDate.getTime() + (1000 * 60 * minutes));
    }
}

/**
 * getDuration
 * @param {*} start 
 * @param {*} end 
 */
function getDuration (start, end) {
    const diffMs = (end - start);
    const diffDays = Math.floor(diffMs / 86400000);
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    if (diffDays === 0 && diffHrs === 0 && diffMins === 0) {
        return 'unvalid';
    }
    let duration = "";
    if (diffDays > 0) {
        duration += `${diffDays} jour`;
        duration += diffDays >= 2 ? 's ' : ' ';
    }
    if (diffHrs > 0) {
        duration += `${diffHrs} heure`;
        duration += diffHrs >= 2 ? 's ' : ' ';
    }
    if (diffMins > 0) {
        duration += `${diffMins} minute`;
        duration += diffMins >= 2 ? 's' : '';
    }
    return duration;
}

/**
 * getUniqueCharactersIn
 * @param {*} str 
 */
function getUniqueCharactersIn(str) {
    return String.prototype.concat(...new Set(str));
}

/**
 * dateIsInRange
 * @param {*} date 
 * @param {*} start 
 * @param {*} end 
 */
function dateIsInRange(date, start, end) {
    return date >= start && date <= end;
}

module.exports = {
    formatTime,
    formatNumericDate,
    formatLiteralDate,
    roundDate,
    getDuration,
    getUniqueCharactersIn,
    dateIsInRange
}