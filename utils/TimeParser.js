export default class TimeParser {
  static formatMinutes(minutes) {
    var hours = Math.floor(minutes / 60);
    var leftoverMinutes = Math.floor(minutes % 60);
    if (hours && leftoverMinutes) {
      return hours + ' h ' + leftoverMinutes + ' m';
    } else if (hours) {
      return hours + ' h';
    } else {
      return leftoverMinutes + ' m';
    }
  }

  static displayTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    const hours = (h < 10 ? '0' : '') + h;
    const minutes = (m < 10 ? '0' : '') + m;
    const secs = (s < 10 ? '0' : '') + s;
    return (hours > 0 ? hours + ':' : '') + minutes + ':' + secs;
  }
  state = {
    paused: true,
    restart: true,
    duration: 100,
  };

  static minutesToString(m) {
    const hours = Math.floor(m / 60);
    const minutes = m % 60;
    return (hours ? hours + ' hr ' : '') + (minutes ? minutes + ' m' : '');
  }

  static dateToString(d) {
    // create string arrays
    const monthArray = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const dayOfWeekArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dateArray = [
      '0',
      '1st',
      '2nd',
      '3rd',
      '4th',
      '5th',
      '6th',
      '7th',
      '8th',
      '9th',
      '10th',
      '11th',
      '12th',
      '13th',
      '14th',
      '15th',
      '16th',
      '17th',
      '18th',
      '19th',
      '20th',
      '21st',
      '22nd',
      '23rd',
      '24th',
      '25th',
      '26th',
      '27th',
      '28th',
      '29th',
      '30th',
      '31st',
    ];
    const year = d.getFullYear();
    const monthIndex = d.getMonth();
    const dayIndex = d.getDay();
    const dateIndex = d.getDate();
    const monthString = monthArray[monthIndex];
    const dayOfWeekString = dayOfWeekArray[dayIndex];
    const dateString = dateArray[dateIndex];
    return (
      dayOfWeekString + ', ' + monthString + ' ' + dateString + ', ' + year
    );
  }

  static currentDateHeader() {
    const d = new Date(Date.now());
    // create string arrays
    const monthArray = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const dayOfWeekArray = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    const dateArray = [
      '0',
      '1st',
      '2nd',
      '3rd',
      '4th',
      '5th',
      '6th',
      '7th',
      '8th',
      '9th',
      '10th',
      '11th',
      '12th',
      '13th',
      '14th',
      '15th',
      '16th',
      '17th',
      '18th',
      '19th',
      '20th',
      '21st',
      '22nd',
      '23rd',
      '24th',
      '25th',
      '26th',
      '27th',
      '28th',
      '29th',
      '30th',
      '31st',
    ];
    const monthIndex = d.getMonth();
    const dayIndex = d.getDay();
    const dateIndex = d.getDate();
    const monthString = monthArray[monthIndex];
    const dayOfWeekString = dayOfWeekArray[dayIndex];
    const dateString = dateArray[dateIndex];
    return dayOfWeekString + ', ' + dateString;
  }
}
