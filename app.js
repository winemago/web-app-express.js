const { request } = require('express');
const express = require('express');
const app = express(); 

app.listen(3000, ()=> console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json());

const array_data = [];

app.post('/api', (request,response)=>{
    console.log('request: ');
    
    array_data.push(request.body);
    console.log(array_data);

    //response.end();                           allways complete a request
    response.json({
        status: 'success',
        method: 'POST',
        latitude: request.body.lat,
        longitude: request.body.lon
    });
});