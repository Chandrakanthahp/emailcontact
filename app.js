
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})
app.post("/",function(req,res){
    var firstName=req.body.fname;
    var lastname=req.body.lname;
    var email=req.body.emailname;
    console.log(firstName,lastname,email);
    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastname,
                }
            }
        ]
    };
    var jsonData=JSON.stringify(data);
    const url = "https://us10.api.mailchimp.com/3.0/lists/1df978b71e"
    const options={
        method:"POST",
        auth:"chandrakantha:9dd4b0717b60e3bc6fe11fb0f4483ba4-us10"
    }
    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/notsuccess.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});
app.listen(3000||process.env.PORT,function(){
    console.log("server is running on port 3000");
});
// 9dd4b0717b60e3bc6fe11fb0f4483ba4-us10
// audience  1df978b71e.