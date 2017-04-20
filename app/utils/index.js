export function getAuthRequestHeaders() {
  let authHeaders = JSON.parse(localStorage.authHeaders);
  return {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "access-token": authHeaders['access-token'],
        "client": authHeaders.client,
        "uid": authHeaders.uid
      };
}

export function timeToString(hours) {
  let date = new Date();
  let hoursString = hours.toString();

  date.setHours(hoursString.substring(0,hoursString.length - 2));
  date.setMinutes(hoursString.substring(hoursString.length - 2,hoursString.length));
  date.setSeconds(0)

  let timeString = date.toLocaleTimeString().replace(/:\d+ /, ' ');
  return timeString;
}

export function stringToTime(timeString, twentyFourHour) {
    return parseInt(timeString.replace(":", ""));
}

export function daysOfTheWeek() {
  return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
}

export function createTemplateSchedule() {
    let daysTemplate = [];
    for(let i = 0; i < daysOfTheWeek().length; i++) {
        let day = daysOfTheWeek()[i];
        daysTemplate.push({
            day: day,
            opens_at: null,
            closes_at: null
        });
    }

    return daysTemplate;
}
