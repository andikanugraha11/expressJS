var express 	= require('express');
var bodyParser	= require('body-parser');
var path		= require('path');
var expressValidator = require('express-validator');
var mongojs		= require('mongojs');
var app 		= express();

var db = mongojs('mahasiswa', ['3IA01'])
//view engine
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')));

//Global variable
app.use(function(req,res, next){
	res.locals.errors = null;
	next();
});

//express-validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.get('/',function(req,res){

	db.siswa.find(function (err, docs) {
		res.render('index',{
			judul	: 'Daftar mahasiswa',
			siswas	: docs
		})
	})
	
});

app.post('/mahasiswa/tambah', function(req,res){

	req.checkBody('nama','Nama tidak boleh kosong').notEmpty();
	req.checkBody('npm','NPM tidak boleh kosong').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		db.siswa.find(function (err, docs) {
		res.render('index',{
			judul	: 'Daftar mahasiswa',
			siswas	: docs,
			errors : errors
		})
	})
	}else{
		var mahasiswaBaru = {
			nama	: req.body.nama,
			npm		: req.body.npm
		}
		db.siswa.insert(mahasiswaBaru,function(err,docs){
			if(err){
				console.log(err);
			}
			res.redirect('/');
		})
	}
	
	
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