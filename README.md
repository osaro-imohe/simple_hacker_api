<strong>Simple Node JS API  🚀</strong>

</br>

<ins>Quick start</ins>

1. Clone this repo

2. Create a .env file at the root of this project

3. Specify a `PORT` and `JWT_SECRET` in created .env file

4. Run `npm install` in the root of the project to install dependencies

5. Run 	`npm start`

6. Server is running on the PORT specified in .env file

<ins>Testing</ins>

To run tests:
</br >
  *  run `npm test` in the root directory of this project

<ins>Linting</ins>

This project utilizes automatic linting on commit with husky hooks and prettier. However, if you would like to lint code without committing run `npm run format`

<ins>End points</ins> 


*  /login 
    
    This endpoint recieves a username and password, authenticates the user and return a JWT Token
    
    method: `POST`

    parameters: 
      Recieves a user object with a username and password property
      
      example:
      
      ```
      {    
        "user":{
            "username": "johndoe",
            "password": "password"
          }     
      }
   ```
   
   response:
   
   returns an object with two properties, success and message.
   
   *  on successful login
    ```
      { 
        "success": true,
        "message": "Sign in successful",
     }
     ```
     
   * on error
    ```
      { 
        "success": false,
        "message": \* ERROR MESSAGE RETURNED HERE *\,
     }
     ```
       





*  /patch 
    
    This endpoint recieves a JSON object and JSON patch object then returns corresponding JSON patch object on completion. Please visit http://jsonpatch.com/ for more details.
    
    
    method: `POST`

    parameters: 
      *  Headers

            ` Authorization: Bearer ${ token } `
     
     *  Body
        ```
          {    
             "jsonObject":{
                "baz": "qux",
                "foo": "bar"
             },
             "jsonPatch": [
                { "op": "replace", "path": "/baz", "value": "boo" }
            ]  
        }
      ```
