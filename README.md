# Network


[![](network.gif)](https://www.youtube.com/watch?v=FMiidDY_lcs&ab_channel=TomasNewton)

Network is reddit like social media site where users can make posts, follow users and upvote/downvote posts. This project is made using the Django REST framework to build a RESTful API and React on the frontend to consume the API. 

**Backend (Django REST framework):**
- Models: 
- Serializers:
- Views
- Urls: 

**Frontend (React):** 
- **Create React App:** The frontend application is decoupled from the backend and built using Create React App. This sets up the development environement with the latests JS features and optimises the app for production. 

- **Redux:** React Redux is used for managing and centralising application state. This lets your React componenets read data from a the Redux store, dispatch actions to the store and update state. In particular it is used within the application to store Authentication tokens and dispatch actions to carry out functionality such as: updating posts, liking posts, following users etc.

- **Redeux Thunk:** redux-thunk is a package that allows you to define asynchronous action creators. This is a middleware that allows you to access your state, access your store data and dispatch new actions. Actions can be dispatched asynchronously allowing you to revolves promises that get returned. 

**Authentication:** 
- Django-rest-knox token authentication. 
