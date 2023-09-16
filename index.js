import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.get("/", async (req,res) => {
    res.render("index.ejs");
});

app.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
});