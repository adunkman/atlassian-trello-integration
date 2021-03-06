var express = require('express');
var http = require('http');
var path = require('path');

// Route Controllers
var routes = require('./routes');
var atlassian = require('./routes/atlassian');

var app = express();

// all environments
app.set('port', process.env.PORT || 8888);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', atlassian.webhook.get);
app.post('/', atlassian.webhook.post);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
