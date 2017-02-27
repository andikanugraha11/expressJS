var express 	= require('express');
var bodyParser	= require('body-parser');
var path		= require('path');

var app 		= express();


//view engine
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')));


app.get('/',function(req,res){
	res.render('index',{
		judul	: 'Daftar mahasiswa',
		siswas	: mahasiswa
	})
});

var mahasiswa = [
	{
		name	: 'Andika Nugraha',
		npm		: '57414084'
	},
	{
		name	: 'Tatatatata',
		npm		: '57414084'
	},
	{
		name	: 'ninininnini',
		npm		: '57414084'
	}
]

app.get('/mahasiswa',function(req,res){
	res.json(mahasiswa);
});

app.listen(3000, function(){
	console.log('Server running @ port 3000');
});