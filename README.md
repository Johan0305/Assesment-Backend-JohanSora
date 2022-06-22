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
