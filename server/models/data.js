var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new mongoose.Schema({
    user_name: { type: String, required: true, minlength:3 },
    scores: [],
    _games: [{ type: Schema.Types.ObjectId, ref: 'Game' }]

}, { timestamps: true })

var GameSchema = new mongoose.Schema({
    //Questions
    question: { type: String, required: true, minlength:1 },
    //Correct Answer
    correctAns: { type: String, required: true, minlength:1},
    //Fake Answer  1
    fakeAns1: { type: String, required: true, minlength:1 },
    //Fake Answer 2
    fakeAns2: { type: String, required: true, minlength:1 },
    //User DB
    _user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

//Schema Models
mongoose.model('User', UserSchema)
mongoose.model('Game', GameSchema)