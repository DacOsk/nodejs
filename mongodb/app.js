const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");
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
Learn.find({}, (err, langs) => {
    if (err) {
        console.log(err);
    } else {
        console.log(langs);
    }
});