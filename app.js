const { request } = require('express');
const express = require('express');
const app = express(); 

app.listen(3000, ()=> console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json());

app.post('/api', (request,response)=>{
    console.log('request: ');
    console.log(request.body);
    //response.end();                           allways complete a request
    response.json({
        status: 'success',
        method: 'POST',
        latitude: request.body.lat,
        longitude: request.body.lon
    });
});