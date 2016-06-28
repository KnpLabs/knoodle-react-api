#!/usr/bin/env node
'use strict';

var mongoose   = require('mongoose');
var connection = mongoose.connect('mongodb://localhost:27017/knoodle');
var Survey = require('./../lib/models/survey');
var Question = require('./../lib/models/question');
var faker = require('faker');

faker.locale = process.env.LOCALE || 'en';

console.log('Creating a set of 30 surveys ...');

for (let i = 0; i < 30; i++) {
    let survey = new Survey();

    survey.createdAt = faker.date.recent();
    survey.title = faker.lorem.sentence();

    for (let j = 0; j < 10; j++) {
        let question = new Question();
        question.title = `${faker.lorem.sentence()} ?`;

        for (let k = 0; k < 3; k++) {
            question.answers.push(faker.lorem.word());
        }

        survey.questions.push(question);
    }

    survey.save((error, survey) => {
        if (error) {
            console.log('ERROR:');
            console.log(error);

            return 0;
        }

        console.log('.');

        if (i === 29) {
            process.exit();
        }
    });
}
