var express = require('express')
var app = express();
var swig = require('swig');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'html');
app.engine("html", swig.renderFile);

app.get('/', function(request, response, next) {
  response.render('boxes.html');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
