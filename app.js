var express 	= require('express');
var bodyParser	= require('body-parser');
var path		= require('path');

var app 		= express();


//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')));


app.get('/',function(req,res){
	res.send('Hello World');
})

app.listen(3000, function(){
	console.log('Server running @ port 3000');
});