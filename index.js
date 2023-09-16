import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const APIKey = 'ac0bdaf9aa2e62b47c291f5197f5ff34';

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.render("index.ejs");
});

app.post("/search", async (req,res) => {
    try{
        const city = req.body.inp;
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`, req.body);
        const main = result.data.weather[0].main;
        const des = result.data.weather[0].description;
        const humidity = result.data.main.humidity;
        const temp = Math.round(result.data.main.temp);
        const wind = Math.round(result.data.wind.speed);
        res.render("index.ejs", {
            main: main,
            des: des,
            temp: temp,
            humidity: humidity,
            wind: wind
        });
    } catch(error){
        res.render("index.ejs", {notfound: error.message});
    }
});

app.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
});