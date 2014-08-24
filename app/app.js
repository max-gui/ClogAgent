var express = require('express'),htmlApp = express();
var app = express();

app.get('/test', function(req, res) {
    res.type('text/plain');
    res.send('i am a beautiful butterfly');
});

app.get('/path', function(req, res) {
    res.type('text/plain');
    res.send(__dirname);
});

app.get('/trans',function(req, res) {
    //Example POST method invocation
    var Client = require('node-rest-client').Client;

    var client = new Client();

    var args = {
        data: {
            "BoolValue":true,
            "StringValue":"String content"
        },
        headers:{"Content-Type": "application/json"}
    };

    //client.post("http://192.168.58.106/webapplication2/testCompositeType", args, function(data,response) {
        // parsed response body as js object
        //console.log(data);
        // raw response
        //console.log(response);
    //});

    // registering remote methods
    client.registerMethod("postMethod", "http://work/webapplication2/testCompositeType", "POST");

    client.methods.postMethod(args, function(data,response){
        // parsed response body as js object
        console.log(data);
        // raw response
        console.log(response);

        res.type('text/plain');
        res.send(data);
    });
});

htmlApp.use(express.static(__dirname));

app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080,process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

htmlApp.listen(15001, process.env.OPENSHIFT_NODEJS_IP);//, '127.0.0.1');
