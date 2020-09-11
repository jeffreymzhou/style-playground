import UUID from 'uuid-js';

/** Data Schema for Task */
export class Task {
  constructor(
    title = '',
    timeLeft = null,
    timeSpent = 0,
    dueDate = null,
    complete = false
  ) {
    this.taskId = UUID.create().toString();
    this.title = title;
    // this.description = description;
    // this.catId = catId;

    this.timeLeft = timeLeft;
    this.timeSpent = timeSpent;
    this.dueDate = dueDate;
    this.complete = complete;
  }

  // get colorLabel() {
  //   // return this.catId ? global.storage.getCategory(this.catId).color : '#7078B9'
  //   return '#7078B9';
  // }

  get duration() {
    return this.timeLeft == null ? null : this.timeLeft + this.timeSpent;
  }

  static parseFromJSON(dataJSON) {
    var data = JSON.parse(dataJSON);
    return new this(
      data.title,
      data.timeLeft,
      data.timeSpent,
      new Date(data.dueDate),
      data.taskId
      // data.description,
      // data.catId,
      // data.events
    );
  }
}
