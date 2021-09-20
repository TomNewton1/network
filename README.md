# Network


[![](network.gif)](https://www.youtube.com/watch?v=FMiidDY_lcs&ab_channel=TomasNewton)

Network is a reddit-like social media site where users can make posts, follow users and upvote/downvote posts. This project is made using the Django REST framework to build a RESTful API and React on the frontend to consume the API. 

**Backend (Django REST framework):**
- **RESTFUL API:** In a RESTful API, endpoints (URLs) define the structure of the API and how end users access data from our application using the HTTP methods: GET, POST, PUT, DELETE. 
- **Model Serializer:** DRF’s Serializers convert model instances to Python dictionaries, which can then be rendered in various API appropriate formats - like JSON. 
- **Views:** Views are protected by api_decorator checks which ensure the appropriate http request is passed into the view function. The view then receives the web request, performs some functionality (such as getting posts from the database), serializes the data to JSON and returns the web response. 
- **Urls:** API urls are the endpoints to which you can send HTTP requests. These are hidden from the user, but allow you to access your API to carry out tasks such as getting user posts, liking posts, following users etc. 

**Frontend (React):** 
- **Create React App:** The frontend application is decoupled from the backend and built using Create React App. This sets up the development environment with the latests JS features and optimises the app for production. 

- **Redux:** React Redux is used for managing and centralising application state. This lets your React components read data from the Redux store, dispatch actions to the store and update state. In particular it is used within the application to store Authentication tokens and dispatch actions to carry out functionality such as: updating posts, liking posts, following users etc.

- **Redux Thunk:** redux-thunk is a package that allows you to define asynchronous action creators. This is a middleware that allows you to access your state, access your store data and dispatch new actions. Actions can be dispatched asynchronously allowing you to resolve promises that get returned. 

**Authentication:** 
- **Token Authentication:** This project uses token based authentication to validate users. 

  - Client submits user login form to the server. 
  - Server creates an authentication token, which is created with a private key. 
  - The token is then sent back to the browser where it is normally kept in local storage. (Or Redux)
  - When the user makes another request, the authentication token will be included in the request headers. The server then just needs to validate the signature. 

- **Django-rest-knox:** This library provides models and views to handle token-based authentication in a more secure and extensible way than the built-in TokenAuthentication scheme. It provides per-client tokens, and views to generate them when provided some other authentication (usually basic authentication), to delete the token (providing a server enforced logout) and to delete all tokens (logs out all clients that a user is logged into).

