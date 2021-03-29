const Datastore = require('nedb');
const express = require('express');
const app = express(); 
const bodyParser = require('body-parser');

app.listen(3000, ()=> console.log('listening at 3000'));
app.use(express.static('public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
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
    
    //database.find({username: 'juan'},(err,data)                           we can filter with different operators or dot notation.
    database.find({},(err,data) => {                                      //if we dont put anythinng inside we find all documents.
        if(err){
            response.end();
            return;
        }                                      
       response.json({received: true,data: data}); 
    });
  });