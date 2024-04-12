import {verifyJwt} from "./middleware.js";
import {users} from "./database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import express from "express";
const router = express.Router();

router.post("/register", (req, res) => {
    users.find({email: req.body.email}, (err, data) => {
        if(err) {
            return res.send({error: true, message: "An error occured!"});
        }
        if(data.length == 0) {
            const hashedPass = bcrypt.hashSync(req.body.password, 10);
            users.insert({username: req.body.username, email: req.body.email, password: hashedPass});
            res.send({error: false, message: "User registered successfully!"});
        } else {
            res.send({error: true, message: "User already exists!"});
        }
    });
});

router.post("/login", (req, res) => {
    users.findOne({email: req.body.email}, (err, data) => {
        if(err) {
            return res.send({error: true, message: "An error occured!"});
        }
        if(data == null) {
            return res.send({error: true, message: "User does not exist!"});
        }
        bcrypt.compare(req.body.password, data.password, (err, result) => {
            if(err) {
                return res.send({error: true, message: "An error occured!"});
            }
            if(result) {
                return res.send({error: false, jsonwebtoken: jwt.sign({username: data.username}, process.env.JWT_SECRET)});
            } else {
                return res.send({error: true, message: "Incorrect email or password!"});
            }
        });
    });
});

export default router