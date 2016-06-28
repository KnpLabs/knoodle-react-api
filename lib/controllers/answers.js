'use strict';

var Survey = require('./../models/survey');
var Answer = require('./../models/answer');

module.exports = function (router) {
    router
        .route('/surveys/:surveyId/answers')
        .post((request, response) => {
            Survey.findById(request.params.surveyId, (error, survey) => {
                if (error) {
                    return response.status(404).json(error);
                }

                for (let questionId in request.body.answers) {
                    let answer = new Answer();
                    answer.createdAt = new Date();
                    answer.authorFirstname = request.body.firstname;
                    answer.authorLastname = request.body.lastname;
                    answer.authorEmail = request.body.email;
                    answer.questionId = questionId;
                    answer.content = request.body.answers[questionId];

                    survey.answers.push(answer);
                }

                survey.save((error, survey) => {
                    if (error) {
                        return response.status(400).json(error);
                    }

                    return response.status(201).json(survey);
                });
            });
        })
    ;
}
