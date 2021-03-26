const Datastore = require('nedb');
const express = require('express');
const app = express(); 

app.listen(3000, ()=> console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json());

const database = new Datastore({ filename:'database.db' , autoload: true });

app.post('/api', (request,response)=>{
    console.log('POST request: ');

    const data=request.body;
    data.timestamp = Date.now();
    console.log(data);

    database.insert(data);             

    //response.end();                           allways complete a request..
    response.json({
        status: 'success',
        method: 'POST',
        data
    });
});

app.get('/api', (request, response) => {
    console.log('GET request!');
    const data = request.body;
    
    response.json({received: true,data: data});
  });