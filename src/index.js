const app =  require('./app');

app.listen(app.get('port'));
console.log("listen port 3000" , app.get('port'));