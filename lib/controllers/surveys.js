'use strict';

var Survey = require('./../models/survey');
var Question = require('./../models/question');

module.exports = function (router) {
    router
        .route('/surveys')
        .post(function (request, response) {
            var survey = new Survey();
            survey.title = request.body.title;
            survey.createdAt = new Date();

            for (let receivedQuestion of request.body.questions) {
                let question = new Question();
                question.title = receivedQuestion.title;
                question.answers = receivedQuestion.answers;

                survey.questions.push(question);
            }

            survey.save((error) => {
                if (error) {
                    response.status(400).json(error);

                    return;
                }

                response.status(201).json(survey);
            });
        })
        .get(function (request, response) {
            var query = Survey.find({});

            if ('popularity' === request.query.by) {
                query.sort({'answers': 'desc'});
            } else {
                query.sort({'title': 'asc'});
            }

            if (request.query.title) {
                query.where({
                    title: new RegExp(request.query.title, 'i')
                });
            }

            let offset = request.query.offset ? parseInt(request.query.offset) : 0;
            let limit = request.query.limit ? parseInt(request.query.limit) : 20;

            query
                .skip(offset)
                .limit(limit)
                .exec(function (error, surveys) {
                    if (error) {
                        response.status(500).json(error);

                        return;
                    }

                    response.status(200).json(surveys);
                })
            ;
        })
    ;

    router
        .route('/surveys/:surveyId')
        .get(function (request, response) {
            Survey.findById(request.params.surveyId, (error, survey) => {
                if (error) {
                    return response.status(404).json(error);
                }

                return response.status(200).json(survey);
            });
        })
        .put(function (request, response) {
            Survey.findById(request.params.surveyId, (error, survey) => {
                if (error) {
                    return response.status(404).json(error);
                }

                if (request.body.title) {
                    survey.title = request.body.title;
                }

                if (request.body.questions) {
                    for (let q of request.body.questions) {
                        let question = new Question();
                        question.title = q.title;
                        question.answers = q.answers;

                        survey.questions.push(question);
                    }
                }

                survey.save((error) => {
                    if (error) {
                        return response.status(500).json(error);
                    }

                    return response.status(202).json(survey);
                });
            });
        })
        .delete(function (request, response) {
            Survey.remove({
                _id: request.params.surveyId
            }, (error, survey) => {
                if (error) {
                    return response.status(500).json(error);
                }

                return response.status(205).json(survey);
            })
        })
    ;
}
