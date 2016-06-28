var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var Question = require('./question');
var Answer   = require('./answer');

var SurveySchema = new Schema({
    title: String,
    createdAt: Date,
    questions: [mongoose.model('Question').schema],
    answers: [mongoose.model('Answer').schema]
});

module.exports = mongoose.model('Survey', SurveySchema);
