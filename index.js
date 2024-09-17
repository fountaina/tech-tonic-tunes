import express from "express";
import { dirname } from "path";
import {fileURLToPath} from "url";
import bodyParser from "body-parser";


const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;

var allPosts = [];
var currentPost = {};

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render(`${__dirname}/views/index.ejs`);
});

app.post("/submit", (req, res) => {
    currentPost = {
        author: req.body.author, 
        title: req.body.title, 
        article: req.body.article
    };
    allPosts.push(currentPost);

    res.render(`${__dirname}/views/index.ejs`, {
        author: req.body.author,
        title: req.body.title,
        article: req.body.article,
        allPosts: allPosts,
    });

    console.log("This is the list of all my blog posts:");
    console.log(allPosts);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
