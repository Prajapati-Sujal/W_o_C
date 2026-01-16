const fs = require('fs');

exports.homepage = (req,res)=>{
    console.log(req.url,req.method);
    const list = fs.readFileSync(process.env.TASK_FILE, "utf-8");
    const tasks = list ? JSON.parse(list) : [];

    let html = `
        <h1>All Tasks</h1>
        <a href="/add-task">Add New Task</a>
        <hr/>
    `;

    if (tasks.length === 0) {
        html += "<p>No tasks available</p>";
    } else {
        tasks.forEach((task) => {
        html += `
            <div style="border:1px solid gray; padding:10px; margin:10px; border-radius:10px;">
                <h2>${task.title}</h2>
                <p>${task.content}</p>
                <small>ID: ${task.id}</small>
                <br><br>
                <a href="/task/${task.id}/edit">Edit</a>
                <a href="/task/${task.id}/delete">Delete</a>
            </div>
        `;
        });
    }
    res.send(html);
}

exports.getAddTask = (req,res)=>{
    console.log(req.url,req.method);
    res.send(`
            <h1>Add your task here!!</h1>
            <form action="/add-task" method="POST">
                <lable for="title">Title : </lable>
                <input type="text" name="title" >
                <lable for="content">Content : </lable>
                <input type="text" name="content" >
                <input type="submit" value="Submit">
            </form>
        `);
}

exports.postAddTask = (req,res)=>{
    console.log(req.url,req.method);
    console.log(req.body);
    const list = fs.readFileSync(process.env.TASK_FILE,"utf-8");
    tasks = list ? JSON.parse(list) : [];
    const newTask = {
        id : tasks.length>0 ? tasks[tasks.length-1].id + 1 : 1,
        title : req.body.title,
        content : req.body.content
    }
    tasks.push(newTask);
    fs.writeFileSync(process.env.TASK_FILE,JSON.stringify(tasks,null,2));
    res.redirect('/');
}

exports.getEdit = (req,res)=>{
    const id = Number(req.params.id);
    const list = fs.readFileSync(process.env.TASK_FILE,"utf-8");
    tasks = list ? JSON.parse(list) : [];

    const task = tasks.find((it)=>it.id===id);
    if(!task)   return res.send("<h1>Task not found</h1>");
    res.send(`
            <h1>Edit task</h1>
            <form action="/task/${task.id}/edit" method="POST">
                <input type="text" name="title" value="${task.title}">
                <input type="text" name="content" value="${task.content}">
                <input type="submit" value="Submit">
            </form>
        `);
}

exports.postEdit = (req,res)=>{
    const id = Number(req.params.id);
    const list = fs.readFileSync(process.env.TASK_FILE,"utf-8");
    tasks = list ? JSON.parse(list) : [];

    const ind = tasks.findIndex((it)=>it.id===id);
    if(ind===-1)   return res.send("<h1>Task not found</h1>");
    tasks[ind].title = req.body.title
    tasks[ind].content = req.body.content
    fs.writeFileSync(process.env.TASK_FILE,JSON.stringify(tasks,null,2));
    res.redirect('/');
}

exports.getDelete = (req,res)=>{
    const id = Number(req.params.id);
    const list = fs.readFileSync(process.env.TASK_FILE,"utf-8");
    tasks = list ? JSON.parse(list) : [];

    tasks = tasks.filter((it)=>it.id!==id);
    fs.writeFileSync(process.env.TASK_FILE,JSON.stringify(tasks,null,2));
    res.redirect('/');
}