import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomePage from './components/HomePage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewNote from './components/NewNote';
import NotesList from './components/NotesList';
import UpdateNote from './components/UpdateNote';
import UpdateProfile from './components/UpdateProfile';
import SearchNotes from './components/SearchNotes';


const router = createBrowserRouter([{
  path: '/',
  element: <HomePage></HomePage>
  },
  {
    path: '/signin',
    element: <SignIn></SignIn>
  },
  {
    path: '/signup',
    element: <SignUp></SignUp>
  },
  {
    path: '/notes',
    element: <NotesList></NotesList>
  },
  {
    path: '/new',
    element: <NewNote></NewNote>
  },
  {
    path: '/update',
    element: <UpdateNote></UpdateNote>
  },
  {
    path: '/profile',
    element: <UpdateProfile></UpdateProfile>
  },
  {
    path: '/search',
    element: <SearchNotes></SearchNotes>
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} ></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
