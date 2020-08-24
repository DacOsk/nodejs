const mongoose = require("mongoose");
//db connection
mongoose.connect("mongodb://localhost/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//try to connect to database
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    //db schema
    const testSchema = new mongoose.Schema({
        lang: String,
        status: String
    });
    const Learn = mongoose.model("Learn", testSchema);
    //adding data to db
    /* const language = new Learn({
    lang: "Python",
    status: "basic"
}); */
    /* language.save((err, lang) => {
    if (err) {
        console.log("Error saving data");
    } else {
        console.log("Data saved");
        console.log(lang);
    } 
});*/
    /* Learn.create({
        lang: "Java",
        status: "beginner"
    },
    (err, lang) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Data saved to DB");
        }
    }
); */
    //retrieve all data from db
    Learn.find({ lang: "Python" }, (err, langs) => {
        if (err) {
            console.log(err);
        } else {
            console.log(langs);
        }
    });
});