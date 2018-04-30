 
'use strict';

var express = require('express');
var app = express();



app.use('./public', express.static(process.cwd() + './public'));
app.get('/');

app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    })

app.get('/:dateValue',(req,res)=>{
    let dateString = req.params.dateValue;
    let options = { year:'numeric', month:'long', day:'numeric'};
    ///console.log(dateString);
    if(!isNaN(dateString)){
        let unixDate = dateString;
        let dt = new Date(unixDate*1000);
        let naturalDate = dt.toLocaleString("en-US",options);
        res.json({ "unix": unixDate , "natural":naturalDate});
    }
    else {
        let param = decodeURI(dateString);
        let unixDate = (Date.parse(param)/1000).toString();
        let naturalDate = param.toLocaleString("en-US",options);
        res.json({ "unix": unixDate , "natural":naturalDate});
    }
});


// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})

app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});

