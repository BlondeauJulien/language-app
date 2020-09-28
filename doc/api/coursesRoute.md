## COURSES ROUTES

### CREATE COURSE -private

> /api/courses   --- method GET
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


### CREATE COURSE -private

> /api/courses   --- method POST
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
