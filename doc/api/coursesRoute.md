## COURSES ROUTES

### GET COURSES -public

> /api/courses   --- method GET <br/>

##### RECEIVE IN REQUEST

> receive via query string: ?{**name**=STRING}&{**language**=STRING}&{**learningFrom**=STRING}&{**username**=STRING} <br/>

If no queries are passed you will get all the courses else you will get back filtered courses from the queries.

##### RESPONSE

*  On success (STATUS 200) <br />
 Array of course object not including their vocubulary and quizzes. <br />
 
 [See course model here](../../models/course.js)

*  On error

> Server error (STATUS 500)
```javascript
{
  message: 'An error occured, please try again.',
}
```

### CREATE COURSE -private

> /api/courses   --- method POST </br>
> Headers - Authorization: "Bearer {userToken}"

##### RECEIVE IN REQUEST

```javascript
{
  *name: STRING, //length min: 4, max 40
  *language: STRING, //length min: 2, max 24
  *learningFrom: STRING, //length min: 2, max 24
  *countryFlag: STRING //length min: 4, max: 2
}
```
Properties marked with * are required

##### RESPONSE

*  On success (STATUS 201)
```javascript
    creator: {
      _id: STRING,
      username: STRING
    },
    _id: STRING,
    name: STRING,
    language: STRING,
    learningFrom: STRING,
    countryFlag: STRING,
  }
```
*  On error

> received invalid content (STATUS 422)
```javascript
{
  message: custom error message,
}
```

> requestor is not a user (STATUS 404)
```javascript
{
  message: "We did not find a user matching requestor",
}
```

> Server error (STATUS 500)
```javascript
{
  message: 'An error occured, please try again.',
}
```


### EDIT COURSE -private

> /api/courses/:id   --- method PATCH </br>
> Headers - Authorization: "Bearer {userToken}"

##### RECEIVE IN REQUEST

```javascript
{
  name: STRING, //length min: 4, max 40
  language: STRING, //length min: 2, max 24
  learningFrom: STRING, //length min: 2, max 24
  countryFlag: STRING //length min: 4, max: 2
}
```
Properties marked with * are required

##### RESPONSE

*  On success (STATUS 201)
```javascript
    creator: {
      _id: STRING,
      username: STRING
    },
    _id: STRING,
    name: STRING,
    language: STRING,
    learningFrom: STRING,
    countryFlag: STRING,
  }
```
*  On error

> received invalid content (STATUS 422)
```javascript
{
  message: custom error message,
}
```

> requestor is not a user (STATUS 404)
```javascript
{
  message: "We did not find a user matching requestor",
}
```

> course doesn't exist (STATUS 404)
```javascript
{
  message: "The course you tried to update was not found.",
}
```

> requiestor doesn't own the course (STATUS 401)
```javascript
{
  message: "You are not authorized to realise this action.",
}
```

> Server error (STATUS 500)
```javascript
{
  message: 'Update failed, please try again.',
}
```


### DELETE COURSE -private

> /api/courses/:id   --- method DELETE </br>
> Headers - Authorization: "Bearer {userToken}"

##### RECEIVE IN REQUEST

course id and requestor id via Authorization token

##### RESPONSE

*  On success (STATUS 200)
```javascript
 {
   message: "Course deleted successfully", 
   for: 'delete'
 }
```
*  On error

> requestor is not a user (STATUS 404)
```javascript
{
  message: "We did not find a user matching requestor",
}
```

> course doesn't exist (STATUS 404)
```javascript
{
  message: "The course you tried to delete does not exist.",
}
```

> requiestor doesn't own the course (STATUS 401)
```javascript
{
  message: "You are not authorized to realise this action.",
}
```

> Server error (STATUS 500)
```javascript
{
  message: 'Update failed, please try again.',
}
```
