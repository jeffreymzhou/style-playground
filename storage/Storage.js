import { AsyncStorage } from 'react-native';
import { Task } from './data_schema/DataSchema.js';
// import { calcRoughSizeOfObject } from './StorageUtil';

// const EVENT_KEY_PREFIX = "@Event#";
const TASK_KEY_PREFIX = '@Task#';
// const CAT_KEY_PREFIX = "@Cat#";

export default class DataCache {
  constructor() {
    this._data = {
      events: {},
      tasks: {},
      categories: {},
    };
    DataCache._loadAllFromStorage().then((data) => {
      if (!data) return;
      this._data = data;
    });
  }

  static async _loadAllFromStorage() {
    try {
      // await AsyncStorage.clear();
      var keys = await AsyncStorage.getAllKeys();

      // var eventKeys = keys.filter(key => key.startsWith(EVENT_KEY_PREFIX));
      var taskKeys = keys.filter((key) => key.startsWith(TASK_KEY_PREFIX));
      // var catKeys = keys.filter(key => key.startsWith(CAT_KEY_PREFIX));

      // var events = await AsyncStorage.multiGet(eventKeys);
      var tasks = await AsyncStorage.multiGet(taskKeys);
      // var categories = await AsyncStorage.multiGet(catKeys);

      var data = { events: {}, tasks: {}, categories: {} };
      // events.forEach(([_, value]) => {
      //     var event = Event.parseFromJSON(value);
      //     data.events[event.eventId] = event;
      // });
      tasks.forEach(([_, value]) => {
        var task = Task.parseFromJSON(value);
        data.tasks[task.taskId] = task;
      });
      // categories.forEach(([_, value]) => {
      //     var category = Category.parseFromJSON(value);
      //     data.categories[category.catId] = category;
      // });

      return data;
    } catch (error) {
      console.error(error);
    }
    return null;
  }

  static async _saveToStorage(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(error);
    }
  }

  static async _deleteFromStorage(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  }

  // get sizeOfData() {
  //   return calcRoughSizeOfObject(this._data);
  // }

  // getEvent(eventId) {
  //     return (eventId in this._data.events)? this._data.events[eventId] : null;
  // }

  // deleteEvent(eventId) {
  //     delete this._data.events[eventId];
  //     DataCache._deleteFromStorage(EVENT_KEY_PREFIX+eventId);
  // }

  // saveEvent(event) {
  //     // TODO: sanity check for event
  //     this._data.events[event.eventId] = event;
  //     DataCache._saveToStorage(EVENT_KEY_PREFIX+event.eventId, JSON.stringify(event));
  // }

  // getEvents(filters) {
  //     var events = Object.values(this._data.events);
  //     filters.forEach(filterFunc => {
  //         events = events.filter(filterFunc);
  //     });
  //     return events;
  // }

  getTask(taskId) {
    return this._data.tasks[taskId] || null;
  }

  deleteTask(taskId) {
    delete this._data.tasks[taskId];
    DataCache._deleteFromStorage(TASK_KEY_PREFIX + taskId);
  }

  saveTask(task) {
    // TODO: sanity check for task
    this._data.tasks[task.taskId] = task;
    DataCache._saveToStorage(
      TASK_KEY_PREFIX + task.taskId,
      JSON.stringify(task)
    );
  }

  getAllTaskKeys() {
    return Object.keys(this._data.tasks);
  }

  getAllTasks() {
    return Object.values(this._data.tasks);
  }

  // getAllAvaliableTasks() {
  //     return Object.values(this._data.tasks).filter(task => task.timeAvailable);
  // }

  // getTasksGroupByCategory() {
  //     var catTask = {};
  //     Object.values(this._data.tasks).forEach(task => {
  //         if (catTask.hasOwnProperty(task.catId)) {
  //             catTask[task.catId].push(task);
  //         } else {
  //             catTask[task.catId] = [task];
  //         }
  //     });
  //     return catTask;
  // }

  // getCategory(catId) {
  //     return (catId in this._data.categories)? this._data.categories[catId] : null;
  // }

  // getAllCategories() {
  //     return Object.values(this._data.categories);
  // }

  // deleteCategory(catId) {
  //     delete this._data.categories[catId];
  //     DataCache._deleteFromStorage(CAT_KEY_PREFIX+catId);
  // }

  // saveCategory(category) {
  //     // TODO: sanity check for category
  //     this._data.categories[category.catId] = category;
  //     DataCache._saveToStorage(CAT_KEY_PREFIX+category.catId, JSON.stringify(category));
  // }
}
