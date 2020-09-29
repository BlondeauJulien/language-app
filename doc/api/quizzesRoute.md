## QUIZZES ROUTES

- [Create quiz](#create-quiz--private "Goto create word")
- [Edit quiz](#edit-quiz--private "Goto edit word")
- [delete quiz](#delete-quiz--private "Goto delete word")
 
<br/><br/>

### CREATE QUIZ -private

> /api/quizzes   --- method POST </br>
> Headers - Authorization: "Bearer {userToken}"

##### RECEIVE IN REQUEST

```javascript
{
  *course: STRING, // course ID
  *difficultyLevel: STRING, //Numeric
  *answers: ARRAY of OBJECTS { // ARRAY LENGTH min 0, max 8
    answer: STRING, // length min: 2, max 20
    translation: STRING, // length min: 2, max 200
    isCorrect: BOOLEAN // At least one true in the array
  },
  *image: STRING, //length min: 0, max: 200
  tags: ARRAY of STRINGS, // ARRAY length min: 0, max 10. STRING length min: 4, max 16.
}
```
Properties marked with * are required

##### RESPONSE

*  On success (STATUS 201)
```javascript
{
    _id: STRING,
    difficultyLevel: STRING,
    answers: Array of OBJECTS,
    difficultyLevel: STRING,
    course: STRING,
    tags: STRING,
    
  }
```
*  On error

> received invalid content (STATUS 422)
```javascript
{
  message: custom error message,
}
```

> user doesn't exist (STATUS 404)
```javascript
{
  message: "We did not find a user matching requestor",
}
```

> course not found (STATUS 404)
```javascript
{
  message: "We did not find the course in which you wanted to add a quiz.",
}
```

> Requestor doesn't own the course (STATUS 401)
```javascript
{
  message: "You are not authorized to realise this action.",
}
```

> user try to approuve the image (STATUS 401)
```javascript
{
  message: "You are not authorized to approuve your own image.",
}
```

> Server error (STATUS 500)
```javascript
{
  message: 'Could not create quiz, please try again',
}
```

### EDIT QUIZ -private

> /api/quizzes/:id   --- method PATCH </br>
> Headers - Authorization: "Bearer {userToken}"

##### RECEIVE IN REQUEST

```javascript
{
  course: STRING, // course ID
  difficultyLevel: STRING, //Numeric
  answers: ARRAY of OBJECTS { // ARRAY LENGTH min 0, max 8
    answer: STRING, // length min: 2, max 20
    translation: STRING, // length min: 2, max 200
    isCorrect: BOOLEAN // At least one true in the array
  },
  image: STRING, //length min: 0, max: 200
  tags: ARRAY of STRINGS, // ARRAY length min: 0, max 10. STRING length min: 4, max 16.
}
```
Properties marked with * are required

##### RESPONSE

*  On success (STATUS 201)
```javascript
{
  *course: STRING, // course ID
  *difficultyLevel: STRING, //Numeric
  *answers: ARRAY of OBJECTS { // ARRAY LENGTH min 0, max 8
    answer: STRING, // length min: 2, max 20
    translation: STRING, // length min: 2, max 200
    isCorrect: BOOLEAN // At least one true in the array
  },
  *image: STRING, //length min: 0, max: 200
  tags: ARRAY of STRINGS, // ARRAY length min: 0, max 10. STRING length min: 4, max 16.
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

> quiz doesn't exist (STATUS 404)
```javascript
{
  message: "The quiz you tried to update was not found.",
}
```

> requestor doesn't own the course that include this quiz (STATUS 401)
```javascript
{
  message: "You are not authorized to realise this action.",
}
```

> user try to approuve the image (STATUS 401)
```javascript
{
  message: "You are not authorized to approuve your own image.",
}
```

> Server error (STATUS 500)
```javascript
{
  message: 'Update failed, please try again.',
}
```


### DELETE QUIZ -private

> /api/quizzes/:id   --- method DELETE </br>
> Headers - Authorization: "Bearer {userToken}"

##### RECEIVE IN REQUEST

vocabulary id and requestor id via Authorization token

##### RESPONSE

*  On success (STATUS 200)
```javascript
 {
   message: "Quiz deleted successfully", 
 }
```
*  On error

> requestor is not a user (STATUS 404)
```javascript
{
  message: "We did not find a user matching requestor",
}
```

> quiz doesn't exist (STATUS 404)
```javascript
{
  message: "We did not find the quiz you tried to delete.",
}
```

> course that include this quiz doesn't exist (STATUS 404)
```javascript
{
  message: "There is not course related to this quiz. You might not be authorized. Deletion failed.",
}
```

> requestor doesn't own the course that include this quiz  (STATUS 401)
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
