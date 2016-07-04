Knoodle API
===========

This is a really simple REST Api for the knoodle project.

## Requirements

In order to make it work correctly you need:

- MongoDB
- Nodejs (with NPM !) (>= **v5.0**)

## Installation

```
$ git clone git@github.com:KnpLabs/knoodle-react-api.git
$ cd knoodle-react-api
$ npm install
$ npm start
```

## How to use it ?

This api provides simple endpoints:

### `POST /surveys`

Create a new survey. This is an example of json body:

```json
{
    "title": "My awesome survey !",
    "questions": [
        {
            "title": "What's your favorite colour ?",
            "answers": [
                "blue",
                "red",
                "yellow",
                "green",
                "pink",
                "purple"
            ]
        },
        {
            "title": "Do you like chocolate ?",
            "answers": [
                "Yes",
                "No",
                "It depends on my mood",
                "Chocolate ? What's that ?"
            ]
        }
    ]
}
```

### `GET /surveys`

Return all surveys documents. You can filter results with the following
filters:

| Query String | Values                                                 |
|--------------|--------------------------------------------------------|
| by           | accept `popularity`, `latest` or empty (by title asc). |
| title        | string, the content you need in the title              |
| offset       | integer. Default to 0                                  |
| limit        | integer. Default 20                                    |

### `GET /surveys/:surveyId`

Retrieve only one survey document.

### `PUT /surveys/:surveyId`

Update a document. Same body as `POST /surveys`.

### `DELETE /surveys/:surveyId`

Remove an existing survey.

### `POST /surveys/:surveyId/answers`

Create an answer for a given survey. Json body must looks like:

```json
{
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@mail.com",
    "answers": {
        "<questionId>": "The answer",
        "<questionId>": "The other answer"
    }
}
```

## Loading some fake data

You can load some dataset by running:

```
$ npm run fixtures
```

This command will load 30 fake surveys to the database.
