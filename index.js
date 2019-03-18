const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var data = {
    members: [
      {email_address: email,
       status: "subscribed",
       merge_fields:{
         "FNAME":firstName,
         "LNAME":lastName
       }
     }
                ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url:"https://us20.api.mailchimp.com/3.0/lists/a010a078c2",
    method: "post",
    headers:{
      "Authorization":"souvik 79678510c9360cde1556765ef59e60cb-us20"
    },
    body: jsonData
  };

  request(options, function(error, response, body){
      if(error  || response.statusCode!=200){
        res.sendFile(__dirname + "/failure.html");
      }else{
        res.sendFile(__dirname + "/success.html");
      }
  });
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){  //process.env.PORT is used to dynamically get the PORT
                                                //that the HEROKU server will provide. It doesn't work on localhost.
  console.log("Server started at 3000");
});


//API key
//79678510c9360cde1556765ef59e60cb-us20

//List ID
//a010a078c2
