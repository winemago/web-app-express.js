const Datastore = require('nedb');
const express = require('express');
const app = express(); 
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { response } = require('express');

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening at ${port}`));
app.use(express.static('public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


const database = new Datastore({ filename:'database.db' , autoload: true });
const logs = new Datastore({ filename:'userslogs.db' , autoload: true });

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
    
    //database.find({username: 'juan'},(err,data)                 we can filter with different operators or dot notation.
    database.find({},(err,data) => {                             //if we dont put anythinng inside we find all documents.
        if(err){
            response.end();
            return;
        }                                      
       response.json({received: true,data: data}); 
    });
});

app.post('/login',async (req,res) =>{
    try{
        const data = {          
            name: req.body.NameL,
            password: req.body.PasswordL,
        };
        logs.find({ name: data.name }, async (err, docs) =>{
            // If no document is found, docs is equal to []
            
            if(docs.length > 0 ){
                if(await bcrypt.compare(data.password,docs[0].password)){
                    res.redirect('/main.html');
                }else{
                    res.send('wrong password');
                }
            }else{
                res.send('<p>wrong username</p>');
            }
            console.log(docs);
            
          });
    }catch(error){
        console.error(error);      
    }
});

app.post('/signup',async (req,res) =>{
    try{
        const hashedpass = await bcrypt.hash(req.body.PasswordS,10);
        const data = {          
            name: req.body.NameS,
            email: req.body.EmailS,
            password: hashedpass,
        };
        logs.insert(data);
        res.redirect('/signlog/log.html');
        
    }catch(error){
        console.error(error);      
    }
});

app.get('/ValUsername/:name',(req,res) => {
    console.log(req.params);
    logs.find({ name:`${req.params}` }, (err, docs) =>{
        if(docs.length > 0){
            res.json({valid: false});
        }else{
            res.json({valid: true});
        }
    });
});