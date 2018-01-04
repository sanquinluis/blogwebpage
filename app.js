var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    app         = express();

// App Config =============================================
mongoose.connect("mongodb://localhost/restful_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// Mongoose/Model config ==================================
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Restful Routes =========================================
app.get("/", function(req, res){
	res.redirect("/blogs");
});

//Index Routes ========
app.get("/blogs", function(req, res){
   Blog.find({}, function(err, blogs){
       if(err){
           console.log("ERROR!");
       } else {
          res.render("index", {blogs: blogs}); 
       }
   });
});





//localhost:300 the app is listening to 4000
app.listen(4000, () => console.log("Blog App is running at Localhost://4000"));