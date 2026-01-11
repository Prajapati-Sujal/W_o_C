const fs = require("fs");
require('dotenv').config();

const FILE = process.env.TASK_FILE || FILE;
let tasks = [];
exports.addTask = (name) => {
    const task = fs.readFileSync(FILE, "utf-8");
    tasks = task ? JSON.parse(task) : [];
    const newTask = {
        id : tasks[tasks.length - 1] ? tasks[tasks.length - 1].id + 1 : 1,
        title: name,
        status: "pending"
    };
    tasks.push(newTask);
    fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
    console.log(`Task "${name}" added with ID ${newTask.id}`);
};

exports.deleteTask = (taskId) => {
    const task = fs.readFileSync(FILE, "utf-8");
    tasks = task ? JSON.parse(task) : [];
    const initialLength = tasks.length;
    tasks = tasks.filter(task => task.id !== taskId);
    fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
    if (tasks.length === initialLength) {
        console.log("Task not found");
    } else {
        console.log(`Task ${taskId} deleted`);
    }

};

exports.listTasks = () => {
    const task = fs.readFileSync(FILE, "utf-8");
    tasks = task ? JSON.parse(task) : [];

    if (tasks.length === 0) {
        console.log("No tasks available");
        return;
    }
    console.log("Listing all tasks:");
    tasks.forEach(task => {
        console.log(`${task.id}. ${task.title} [${task.status}]`);
    });
};

exports.markDone = (taskId) => {
    const task = fs.readFileSync(FILE, "utf-8");
    tasks = task ? JSON.parse(task) : [];

    const foundTask = tasks.find(t => t.id === taskId);
    if (!foundTask) {
        console.log("Task not found");
        return;
    }
    foundTask.status = "done";
    fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
    console.log(`Task "${foundTask.title}" marked as done`);
};
