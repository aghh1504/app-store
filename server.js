const express = require('express');
const app = express();
const PORT = 3001;
const assert = require('assert');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const verifyAppIdIsSet = (req, res, next) => {
 assert(req.query.appId, 'Missing app id');
 return next();
}

app.use(verifyAppIdIsSet)

const apps = [
  {id:1, name:'app1', desc:"then you need to point your frontend to localhost then you need to point your frontend to localhost"},
  {id:2, name:'app2', desc:"then you need to point your frontend to localhost"},
  {id:3, name:'app3', desc:"then you need to point your frontend to localhost"},
  {id:4, name:'app4', desc:"then you need to point your frontend to localhost"},
  {id:5, name:'app5', desc:"then you need to point your frontend to localhost"},
  {id:6, name:'app6', desc:"then you need to point your frontend to localhost"},
  {id:7, name:'app7', desc:"then you need to point your frontend to localhost desc then you need to point your frontend to localhost"}];

let myApps = [{id:1, name:'app1', desc:"then you need to point your frontend to localhost"}]

app.get('/apps', function (req, res) {
  res.send(apps)
})

app.get('/myApps', function (req, res) {
  res.send(myApps)
})

app.post('/addApp', function(req, res){
	const id = req.body.appId;
	const newApp = apps.find(a => a.id === id);
  console.log(newApp);
	if (!newApp){
	  res.send({message: 'app doesnt exists'});
	  return;
	}
    const alreadyAssociated = myApps.find(a => a.id === id)
    if ( alreadyAssociated){
      res.send({message: 'app already associated'});
      return;
    }
	myApps.push(newApp)
    res.send(myApps);
})

app.post('/deleteApp', function(req, res){
	const id = new Number(req.body.appId);
	myApps = myApps.filter(a => a.id !== id)
    res.send(myApps);
})


app.listen(PORT, function () {
  console.log('Example app listening on port 3000!')
})
