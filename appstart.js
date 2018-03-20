var express = require('express');
var expressHbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var app = express();
//var popupS = require('popups');
//var popup = require('window-popup').windowPopup;
//var Dialog = require('modal-dialog');
//var flash = require('connect-flash');

app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('port', process.env.PORT || 3050);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

app.get('/', function(req, res){
  res.render('/home');
});

app.get('/main', function(req, res){
  res.render('about');
});

app.get('/home', function(req, res){
  res.render('home');
});

app.get('/about', function(req, res){
  res.render('about');
});

app.get('/products', function(req, res){
  res.render('products');
});
app.get('/services', function(req, res){
  res.render('services');
});
app.get('/contact', function(req, res){
  res.render('contactus');
});

app.post('/sendmail',  function(req, res){

	var nodemailer = require('nodemailer');

	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    user: 'ficustek@gmail.com',
	    pass: '@dmin#77'
	  }
	});
   response = {
   	  cname:req.body.cust_name,
      cmail:req.body.cust_mail,
      csubject:req.body.cust_subject,
      cphone: req.body.cust_phone,
      cmessage: req.body.cust_message
   };
   console.log(response);

	var mailOptionsAdmin = {
	  from: 'ficustek@gmail.com',
	  to: 'chatwithjai@gmail.com',
	  subject: response.csubject,
	  text: "Hi Admin,\n" + "Mr." + response.cname + " sent mail. \n"  + "Message : \t" + response.cmessage + "\n contact : " + response.cphone + "\n" + response.cmail
	};

  var mailOptionsCustomer = {
    from: 'ficustek@gmail.com',
    to: response.cmail,
    subject: 'Thanks For contact with Ficus',
    text: "Hi " + response.cname + " \n" + "Thanks for enquiry with us. We shorty respond to your query"

  };

	transporter.sendMail(mailOptionsAdmin, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});

  transporter.sendMail(mailOptionsCustomer, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
	//popup(500, 500, 'http://www.google.sk');
	res.write("Thanks for contact us");
	//req.flash('success', 'Your name was updated');
	//res.redirct('home');
	res.end();
});

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.post('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };
   console.log(req.body);
   console.log(response);
   res.end(JSON.stringify(response));
})

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to terminate');
});

//module.exports = appstart;