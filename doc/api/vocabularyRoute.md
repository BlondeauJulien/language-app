## VOCABULARY ROUTES

### CREATE WORD -private

> /api/vocabulary   --- method POST </br>
> Headers - Authorization: "Bearer {userToken}"

##### RECEIVE IN REQUEST

```javascript
{
  *course: STRING, // course ID
  *word: STRING, //length min: 1, max 30 
  *difficultyLevel: STRING, //Numeric
  *translation: ARRAY of STRING, //ARRAY length min: 1, max 8. STRING ITEM length min 1, max 30
  phrases: ARRAY of OBJECTS { // ARRAY LENGTH min 0, max 8
    phrase: STRING, // length min: 1, max 8
    translation: STRING // length min: 1, max 8
  },
  personalNote: STRING, //length min: 0, max: 100
  conjugationLink: STRING, //length min: 0, max: 400
  tags: ARRAY of STRINGS, // ARRAY length min: 0, max 10. STRING length min: 4, max 16.
}
```
Properties marked with * are required

##### RESPONSE

*  On success (STATUS 201)
```javascript
    _id: STRING,
    word: STRING,
    translation: ARRAY of STRINGS,
    phrases: Array of OBJECTS,
    difficultyLevel: STRING,
    course: STRING,
    conjugationLink: STRING,
    personalNote: STRING,
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

> requestor is not a user (STATUS 404)
```javascript
{
  message: "We did not find a user matching requestor",
}
```

> course not found (STATUS 404)
```javascript
{
  message: "We did not find the course in which you wanted to add some vocabulary.",
}
```

> Requestor doesn't own the course (STATUS 401)
```javascript
{
  message: "You are not authorized to realise this action.",
}
```

> Server error (STATUS 500)
```javascript
{
  message: 'Could not create vocabulary, please try again',
}
```

### EDIT WORD -private

> /api/vocabulary/:id   --- method PATCH </br>
> Headers - Authorization: "Bearer {userToken}"

##### RECEIVE IN REQUEST

```javascript
{
  course: STRING, // course ID
  word: STRING, //length min: 1, max 30 
  difficultyLevel: STRING, //Numeric
  translation: ARRAY of STRING, //ARRAY length min: 1, max 8. STRING ITEM length min 1, max 30
  phrases: ARRAY of OBJECTS { // ARRAY LENGTH min 0, max 8
    phrase: STRING, // length min: 1, max 8
    translation: STRING // length min: 1, max 8
  },
  personalNote: STRING, //length min: 0, max: 100
  conjugationLink: STRING, //length min: 0, max: 400
  tags: ARRAY of STRINGS, // ARRAY length min: 0, max 10. STRING length min: 4, max 16.
}
```
Properties marked with * are required

##### RESPONSE

*  On success (STATUS 201)
```javascript
{
    _id: STRING,
    word: STRING,
    translation: ARRAY of STRINGS,
    phrases: Array of OBJECTS,
    difficultyLevel: STRING,
    course: STRING,
    conjugationLink: STRING,
    personalNote: STRING,
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

> requestor is not a user (STATUS 404)
```javascript
{
  message: "We did not find a user matching requestor",
}
```

> course doesn't exist (STATUS 404)
```javascript
{
  message: "The word you tried to update was not found.",
}
```

> requiestor doesn't own the course that include this word (STATUS 401)
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


### DELETE WORD -private

> /api/vocabulary/:id   --- method DELETE </br>
> Headers - Authorization: "Bearer {userToken}"

##### RECEIVE IN REQUEST

vocabulary id and requestor id via Authorization token

##### RESPONSE

*  On success (STATUS 200)
```javascript
 {
   message: "Word deleted successfully", 
 }
```
*  On error

> requestor is not a user (STATUS 404)
```javascript
{
  message: "We did not find a user matching requestor",
}
```

> word doesn't exist (STATUS 404)
```javascript
{
  message: "We did not find the word you tried to delete.",
}
```

> course that include this word doesn't exist (STATUS 404)
```javascript
{
  message: "There is not course related to this word. You might not be authorized. Deletion failed.",
}
```

> requiestor doesn't own the course that include this word  (STATUS 401)
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
