var fs = require('fs');

exports.findTrackByName = function(req, res){
	var findURL = req.params.name;	
	var urlNAS = "../mnt/nas/";
	var newURL = urlNAS+findURL;


	res.sendFile(findURL,{root: '../mnt/nas'});
};


exports.addTrack = function(req, res){
    
	var urlNAS = "../mnt/nas/";

	if (req.method == 'POST') {
		var fileName = '';
		var mp3File = '';
    	var mp3_file;
    	var tempName = '';

        var body = '';
        var contador = 0;
        req.on('data', function (data) {
            body += data;
           
            if (contador == 0){
            	var stringData = data.toString();

            	
            	stringData = stringData.substr(stringData.indexOf('filename')+13);
           
            	stringData = stringData.substr(0,stringData.indexOf('.')+4);
                
            	
            	filename = stringData;
            	
                console.log("FILENAME: "+filename);
                if (fileName == ""){
                    filename = ".mp3";
                }

            	tempName = new Date().getTime()+'_'+filename;
            	mp3File = urlNAS + tempName;

            	
            	mp3_file = fs.createWriteStream(mp3File);
            
            	mp3_file.write(data);
            	contador++;
            }else{
            	mp3_file.write(data);
            }
        });
        req.on('end', function () {
        	console.log("TERMINADO");

            mp3_file.end();
            res.writeHead(200, {'Content-Type': 'text/html'});
          
        	res.end(tempName);
        });

    }
};

exports.deleteTrackByName = function(req,res){
    
	var urlNAS = "../mnt/nas/";
	var findURL = req.params.name;
	var newURL = urlNAS+findURL;
	
	fs.unlinkSync(newURL);
	res.status(200);
	console.log("DELETED:"+findURL);
};