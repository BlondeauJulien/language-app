## USERS ROUTES

### SIGNUP -public

> /api/users/signup   --- method POST

##### RECEIVE IN REQUEST

```javascript
{
  *username: STRING, //length min: 4, max 16
  *email: STRING, //valide email
  *password: STRING //length min: 6
}
```
Properties marked with * are required

##### RESPONSE

*  On success (STATUS 201)
```javascript
{
  userId: STRING,
  username: STRING,
  email: STRING,
  token: STRING
}
```
*  On error

> User already exist (STATUS 409)
```javascript
{
  message: "This username is already used. Please pick another one",
}
```

> Email already exist (STATUS 409)
```javascript
{
  message: "This email is already used. Maybe try to login instead?",
}
```

> Server error (STATUS 500)
```javascript
{
  message: 'Signup failed, please try again.',
}
```


### LOGIN -private

> /api/users/   --- method GET

##### RECEIVE IN REQUEST

```javascript
{
  *email: STRING, 
  *password: STRING
}
```
Properties marked with * are required

##### RESPONSE

*  On success
```javascript
{
  userId: STRING,
  username: STRING,
  email: STRING,
  token: STRING
  /* The next 2 are receive for admin or moderator login */
  role: STRING,
  imageToReview: ARRAY
}
```
*  On error

> Did not find user (STATUS 401)
```javascript
{
  message: "We didn't find an user for {user email}",
}
```

> Wrong password (STATUS 401)
```javascript
{
  message: "Wrong password, check it and try again",
}
```

> User is banned (STATUS 403)
```javascript
{
  message: "You are banned from the website & can't access your account",
}
```

> Server error (STATUS 500)
```javascript
{
  message: 'Login failed, please try again.',
}
```


### UPDATE USER -private

> /api/users/:id   --- method PATCH <br/>
> Headers - Authorization: "Bearer {userToken}"

##### RECEIVE IN REQUEST

```javascript
{
  username: STRING, //length min: 4, max 16
  email: STRING, //valide email
  password: STRING //length min: 6
}
```
Properties marked with * are required

##### RESPONSE

*  On success (STATUS 200)
```javascript
{
  userId: STRING,
  username: STRING,
  email: STRING,
  /* The next 2 are receive for admin or moderator update */
  role: STRING
}
```
*  On error

> User requesting doesn't match user to update (STATUS 401)
```javascript
{
  message: "You are not authorized to realize this action.",
}
```

> User to update does not exist (STATUS 404)
```javascript
{
  message: 'We didn't find the user to update. Please try again or refresh your page.',
}
```

> Wrong password (STATUS 401)
```javascript
{
  message: "The password you entered does not match this account",
}
```

> Server error (STATUS 500)
```javascript
{
  message: 'Update failed, please try again.',
}
```


### DELETE USER -private

> /api/users/:id   --- method DELETE <br/>
> Headers - Authorization: "Bearer {userToken}"

##### RECEIVE IN REQUEST

```javascript
{
 // user id will come from the token
}
```

##### RESPONSE

*  On success (STATUS 200)
```javascript
{
  userId: "Your account has been deleted successfully."
}
```
*  On error

> User to delete does not exist (STATUS 404)
```javascript
{
  message: 'We did not find you, please try again.',
}
```

> User requesting doesn't match user to delete (STATUS 401)
```javascript
{
  message: "You are not authorized to realize this action.",
}
```

> Wrong password (STATUS 401)
```javascript
{
  message: "Wrong password passed. We didn't delete your account.",
}
```

> Server error (STATUS 500)
```javascript
{
  message: 'An error occured, please try again',
}
```
