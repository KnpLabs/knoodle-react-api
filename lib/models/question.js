var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var QuestionSchema = new Schema({
    title: String,
    answers: [String]
});

module.exports = mongoose.model('Question', QuestionSchema);
