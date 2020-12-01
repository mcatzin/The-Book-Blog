1. install depenecies
   1. npm install --save bcrypt body-parser concurrently cookie-parser express jsonwebtoken mongoose
   2. cd to client and npx create-react-app .
   3. while still inside the client, npm install --save axios react-cookies react-router-dom react-redux redux redux-promise
2. Config
   1. declare express, body-parse,cookieParser, and mongoose
   2. config all of config properties
   3. create body-parser.json()
   4. create const port = process.env.PORT || 3001;
   5. create listening port
   6. create "start": node server/server.js in root package.son scripts
   7. create "server": "nodemon server/server.js"
   8. "client": "npm run start --prefix client"
   9. "dev": "concurrently \"npm run server\"\"npm run client\"", to run both client and server at the same time
   10. add the proxy in client/package.json, "proxy": "http://localhost:3001"
   11.
3. Add Google font awesome and skeloton
   1. client/public/indexhtml <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
   2. cleint/public/indexhtml <link href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css" rel="stylesheet" />
4. Create user model
   1. create a file name user.js inside of Model folder
   2. Create a userSchema of properties: email, password, name, lastName, role and token
   3. create a routes folder in the server folder
   4. create a user route file in the routes folder
   5. npm install express-async-handler
   6. create userRouter
5. Hashing password
   1. creaete pre middleware
   2. if password bcrypt
   3. if not password, next
6. Login User
   1. create a post router in the user router file
   2. wrap post router with expressAsyncHandler
   3. create userSchema.methods.comparePassword in user modole to compare password
   4. create userSchema.methods.generateToken
   5. implement comparePassword in user post '/login
7. Validating tokens
   1. create userSchema.static.findByToken
   2. create a new directory on server called middleware.
   3. create a new file on middleware called auth.js
   4. create a route for '/auth' on user router
8. Logout User
   1. create a route for '/logout' on user router
   2. create userSchema.methods.deleteToken
9. Create Book Model
   1. create a new file on models directory call book
   2. create a bookSchema
   3. create a new file on routes directory call books
   4. create routes: GET, POST, PATCH, DELETE
10. Get all books router
    1. create router.route('all_books')
11. Client
    1. delete everthing on src directory beside index.js
    2. import Routes from './routes';
    3. import { Provider } from 'react-redux';
    4. import { crateStore, applyMiddleware } from 'redux';
    5. import promiseMiddleware from 'react-promise'
    6. create component directory and store directory on src
    7. crate actions directory and reducers directory on store directory
    8. create type file on store call reducers and actions
    9. create bookReducer and userReducer
    10. create Home directory on components
    11. npm install --save redux-devtools-extension
    12. create import {composeWithDevTools} from 'redux-devtools-extension'
    13. create const createStoreWithMiddleware = createStore(reducers, composeWithDevTools(applyMiddleware(promiseMiddleware)))
12. create header and sidebar
    1. create idnex.js on Header directory
    2. create hoc directory
    3. create mainlayouts
    4. npm install react-simple-sidenav on the client
    5. create Sidenav directory on Header directory
    6. ceate items.js
    7. create sidenav.js
    8. import SideNav from 'react-simple-sidenav' in the sidenav file
    9. import MainNav from './Sidenav/sidenav' on index.js/Header
13. Adding links to the sidenav
    1. create a utils directory
    2. create routeLinks.js
    3. create showliks
    4. create showAdminlinks
    5. In sidenav, pass the onHideNav as prop to Items component
    6. in items component, add onClick={props.onHideNav} to close the sidenav after click on the links. child -> parent -> grandparent
14. Creating the login
    1. Go to https://formik.org/
    2. npm install formik --save
    3. npm install --save yup
    4. create User directory
    5. create login file
    6. import Login on routes.js
    7. create login form using Formik for validation
    8. create user_login type
    9. create USER_LOGIN action
    10. create mapStateToProps function
    11. add userData to user.generateToken
    12. create validation hanlde on Users/login
    13. create static getDerivedStateFromProps and componentDidUpdate to redirect after login
15. Auth HOC
    1.create a high order component and class AuthenticationCheck
    2. create user_auth type and implement it on action and reducer
    3. create Admin directory on Users directory
    4. create index.js on Admin directory
    5. import Auth from './hoc/auth' (routes.js)
    6. update admin and login routes:<Route path="/admin" component={Auth(Admin)}/>
       <Route path="/login" component={Auth(Login)}/>
16. Logout User
    1. create logout.js on Users directory
    2. create user_logout type
    3. create user_logout action and reducer
17. Post
    1. create a Posts directory on Admin
    2. create add.js
    3. import { Formik } from 'formik'
    4. add AddPost route
    5. create adminLayout
    6. create a utils directory and postsHelper.js
    7. create Formik form
    8. create BookSchema
    9. npm install --save react-draft-wysiwyg draft-js, for the editor
    10. npm install --save draft-js-export-html
    11. import { Editor } from 'react-draft-wysiwyg';
        import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
    12. import {stateToHTML} from 'draft-js-export-html';
    13. create Editor component
    14. create onEditorStateChange
    15. use stateToHTML to convert EditorState to HTML:
        editorContentHtml: stateToHTML(editorState.getCurrentContent())
    16. create book_add action, reducer and type
    17. create componentDidUpdate to check if props in add.js has changed
    18. create componentWillUnmount()
    19. create BOOK_CLEAR type
    20. add BOOK_CLEAR to reducer and action
18. edit book
    1. create edit.js file on Posts directory
    2. import EditPost from './components/Users/Admin/Posts/edit' on routes.js
    3. add route path "/admin/posts/edit/:id"
    4. npm install html-to-draftjs --save, to convert html content to back to object format
    5. import htmlToDraft from 'html-to-draftjs'
    6. create reducer, action, and type BOOK_GET
19. update book
    1. create reducer, aciton, and type BOOK_UPDATE
20. Admin post section
    1. create posts.js
    2. import AdminPosts from './components/Users/Admin/Posts/posts'
    3. npm install moment --save
    4. npm install @material-ui/core
    5. create Material UI table
21. Create Home component
    1. create reducer, action, an type BOOKS_GET
    2. create a helper to format the books, utils/helper.js
    3. create loadmore
