const express = require('express');
const mysql2 = require('mysql2/promise');
const bcrypt = require('bcryptjs');
var fs = require('fs');

const pool=mysql2.createPool({
	host:'localhost',
	user:'root',
	database:'users',
	password:'',
});

const app = express();

app.use(express.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/pages'));


app.get('/register',function(req,res){
	
	fs.readFile('./pages/register_page.html', 'utf8', function(err, contents) {
		res.send(contents);                                                                                                                                                                              
	});
});

app.post('/auth',function(req,res){
	console.log(req.body);
	const polis = req.body.polis;
	const password1 = req.body.password1;
	const email = req.body.email;

	
		if((req.body.password1 == req.body.password2)&&(req.body.password1.length !=0 )&&(req.body.password2.length !=0))
	{	
		const salt = bcrypt.genSaltSync(10);
		const password123 = bcrypt.hashSync(req.body.password1,salt);
		pool.query('INSERT INTO patient SET ?', {
			id_patient:polis, 
			password:password123,
			email_patient:email,
		});
		
		fs.readFile('./pages/authorization_page.html', 'utf8', function(err, contents) {
			res.send(contents);                                                                                                                                                                              
		});
		
	}else{
		res.send("пароли не совпадают");

	}
		
	
});
app.get('/auth',function(req,res){
	
	fs.readFile('./pages/authorization_page.html', 'utf8', function(err, contents) {
		res.send(contents);                                                                                                                                                                              
	});
});

app.listen(3000,function() {
	console.log('start123');
});