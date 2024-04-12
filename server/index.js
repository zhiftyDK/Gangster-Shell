import express from "express";
const app = express();
import router from "./modules/router.js";
import dotenv from "dotenv";
dotenv.config();

app.use(express.json());
app.use(router);

app.listen(3000, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", 3000);
});