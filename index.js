const express = require('express');
const bodyParser = require('body-parser');

const pages = require('./operations');

const app = express();
require('dotenv').config();

app.use(bodyParser.urlencoded({}));

app.get('/',pages.homepage)

app.get('/add-task',pages.getAddTask)

app.post('/add-task',pages.postAddTask)

app.get('/task/:id/edit',pages.getEdit)

app.post('/task/:id/edit',pages.postEdit)

app.get('/task/:id/delete',pages.getDelete)

app.use((req,res)=>{
    res.send("<h1>404 Page not found</h1>");
})

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});
