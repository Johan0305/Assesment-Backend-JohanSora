# Assasment-backend

This is a documentation of FAV API

## External Dependencies

To this project we need to install:

- Nodejs and Postman

when you have installed node js, go to terminal and enter this command:

- npm install

Thanks to Jest, the API could be tested with 87.5% effectiveness

Besides you need the tool Postamn to test the requests.

## How to Run and to test the API

1. To register you need an email and password, the email has to be valid, for example richrichard@gmail.com. For this, in Postman, (POST: http://localhost:8000/users/register) and if you want login, so, (POST: http://localhost:8000/users/login)

2. When you are logged, you have a token (AUTHORIZATION) with this you can use the next requests.This token must go in Postman Headers like: Authorization 'Bearer (token)'

3. Following you see the requests that you can do:
   - To create your list (POST: http://localhost:8080/lists). In Postman, you
     must give a name to the list.
   - To find lists for your user (GET: http://localhost:8080/lists)
   - To find one list for unique id (GET: http://localhost:8080/listsFavs/idListFavs)
   - To delete one list for unique id (DELETE: http://localhost:8080/listsFavs/idListFavs)
   - To create your fav with an unique id to the list (POST: http://localhost:8080/favs/(here goes the id of the list))

# Questions

1. Indicate which are the parts of the following url: https://backend.mega-app.com.co:8080/api/articles/search?docid=1020&hl=en#dayone

- https:// is a protocol, backend.mega-app.com.co is domain name,
  /api/articles/search is a path, ?docid=1020&hl=en are parameters and #dayone is anchor

2. Define what is a Web API, Restful and what are the statusCode 200-, 400-, 500-

- Api is: application programming interface, it is a set of tools that are used to make applications and different software. Restful is an architecture used to communicate information between two systems. Status code 200 is that request was successfully, Status code 400 is that the request was unsuccessful because a server error occurred during processing,tatus code 500 is that the request was unsuccessful because a internal server error occurred

3. When we talk about CRUD, what does it mean?

- CRUD is http requests where each letter stands for a verb of the requests. C: Create, R: Read, U: Update: D: Delete
