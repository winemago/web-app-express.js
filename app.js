const Datastore = require('nedb');
const { request } = require('express');
const express = require('express');
const app = express(); 

app.listen(3000, ()=> console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json());

const database = new Datastore({ filename:'database.db' , autoload: true });

app.post('/api', (request,response)=>{
    console.log('request of Post: ');

    const data=request.body
    data.timestamp = Date.now();
    console.log(data);

    database.insert(data);             //every time I receive a POST I send all my data to an array.

    //response.end();                           allways complete a request.
    response.json({
        status: 'success',
        method: 'POST',
        data
    });
});

app.get('/api', (req, res) => {
    console.log('get in data!');
  });