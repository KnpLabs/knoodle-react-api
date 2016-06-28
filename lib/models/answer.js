var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var Question = require('./question');

var AnswerSchema = new Schema({
    createdAt: Date,
    authorFirstname: String,
    authorLastname: String,
    authorEmail: String,
    content: String,
    questionId: Schema.Types.ObjectId
});

module.exports = mongoose.model('Answer', AnswerSchema);
