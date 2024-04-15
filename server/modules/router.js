import {verifyJwt} from "./middleware.js";
import {users} from "./database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import express from "express";
const router = express.Router();

router.post("/register", (req, res) => {
    users.find({username: req.body.username}, (err, data) => {
        if(data.length != 0) {
            res.send({error: true, message: "Username already exists!"});
        }
    });
    users.find({email: req.body.email}, (err, data) => {
        if(err) {
            return res.send({error: true, message: "An error occured!"});
        }
        if(data.length == 0) {
            const hashedPass = bcrypt.hashSync(req.body.password, 10);
            users.insert({username: req.body.username, email: req.body.email, password: hashedPass, experience: 0, money: 50});
            res.send({error: false, message: "User registered successfully!"});
        } else {
            res.send({error: true, message: "Email already exists!"});
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
                return res.send({error: false, jsonwebtoken: jwt.sign({username: data.username, email: data.email}, process.env.JWT_SECRET)});
            } else {
                return res.send({error: true, message: "Incorrect email or password!"});
            }
        });
    });
});

router.get("/users", verifyJwt, (req, res) => {
    users.find({}, (err, data) => {
        if(err) {
            return res.send({error: true, message: "An error occured!"});
        }
        const usernames = [];
        data.forEach(user => {
            if(user.username != res.locals.decoded.username) {
                usernames.push(user.username);
            }
        });
        return res.send({error: false, users: usernames});
    });
});

router.get("/userdata", verifyJwt, (req, res) => {
    users.find({email: res.locals.decoded.email}, (err, data) => {
        if(err) {
            return res.send({error: true, message: "An error occured!"});
        }
        const userdata = {
            username: data[0].username,
            email: data[0].email,
            experience: data[0].experience,
            money: data[0].money
        }
        return res.send({error: false, userdata: userdata});
    });
});

export default router