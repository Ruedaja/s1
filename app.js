var express = require("express"),  
    app = express(),
    bodyParser  = require("body-parser"),
    http     = require("http"),
    server   = http.createServer(app),
    methodOverride = require("method-override");

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());


var track_controller = require('./controllers/tracks_controller');



var landingRouter = express.Router();
landingRouter.get('/', function(req, res){
  res.send("API rest TRACKS");
});
app.use(landingRouter);


/*FUNCIONES DE LA API*/
var router = express.Router();

router.route('/tracks')
  .post(track_controller.addTrack);

router.route('/tracks/:name')
  .get(track_controller.findTrackByName)
  .post(track_controller.deleteTrackByName);


app.use('/api', router);

app.listen(3030, function() {  
    console.log("Node server running on http://localhost:3030");
});

