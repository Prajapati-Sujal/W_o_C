const { addTask, deleteTask, listTasks, markDone } = require('./operations');

const cmd = process.argv[2];
const arg = process.argv[3];

switch(cmd){
    case "add":
        addTask(arg);
        break;
    case "delete":
        deleteTask(Number(arg));
        break;
    case "list":
        listTasks();
        break;
    case "done":
        markDone(Number(arg));
        break;
    default:
        console.log("Invalid command");
}
