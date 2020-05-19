const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let items = [];
let workitems = [];

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res){
	var today = new Date();

	var options = {
		weekday: "long",
		day: "numeric",
		month: "long"
	};

	var day = today.toLocaleDateString("en-IN", options);
	res.render("list", {title: day, itemtitles: items});
})


app.post("/", function(req,res){

	console.log(req.body)
	let item = req.body.listitem;
	console.log(workitems);

	if (req.body.list === "Work List"){
		workitems.push(item);
		res.redirect("/work");
	} else {
		items.push(item);
		res.redirect("/");	
	}
})

app.get("/work", function(req, res){
	res.render("list.ejs", {title: "Work List", itemtitles: workitems });
})
 

app.listen(3000, function (){
	console.log("Server is Running")
})