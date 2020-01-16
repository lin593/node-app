//通过token请求出用户信息
// https://www.npmjs.com/package/passport-jwt
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require("mongoose");
// const User = mongoose.model("users");
const keys =require("../config/keys");
const mongoHelper = require('../models/mongoHelper')
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrkey;


module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload);
        mongoHelper.findOne("test",{"id":jwt_payload.id})
        .then(user => {
            if(user) {
                return done(null,user);
            }
            return done(null,false);
        }) 
        .catch(err => console.log(err)).finally(console.log(222))
    }));
}
//测试的时候需要填写
// http://localhost:5000/api/users/current
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiNDQ0IiwiYXZhdGFyIjoiLy93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9iZjU4NDMyMTQ4YjY0M2E4YjRjNDFjMzkwMWI4MWQxYj9zPTIwMCZyPXBnJmQ9bW0iLCJpYXQiOjE1NzkxNjcxODUsImV4cCI6MTU3OTE3MDc4NX0.dN4IqMkdYo5MVgPQXxC9VFWs-IoHlMvrmntUWt1HYyc