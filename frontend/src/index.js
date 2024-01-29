import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from './page/Home';
import AccidentData from './page/AccidentData';
import { Provider } from 'react-redux';
import Login from './page/Login';
import { store } from './redux';
import Post from './components/admin/Post';
import EditPost from './components/POST/EditPost';
import UserList from './components/admin/UserList';
import PatientList from './components/admin/PatientList';
import ListpatientNurse from './components/nurse/ListpatientNurse';
import Mypatient from './components/doctor/Mypatient';
import Profile from './page/Profile';
import LineChart from './components/charts/circle';
import Calendar from './components/calendar/Calendar';
import MyContextProvider from './context/MyContextProvider';
import Register from './page/Register';
import { Toaster } from 'react-hot-toast';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/' element={
        <MyContextProvider>
          <App />
        </MyContextProvider>
      }>
        <Route index element={<Home />} />
        <Route path='/accidentdata/:id' element={<AccidentData />} />
        <Route path='/post' element={<Post />} />
        <Route path='/userlist' element={<UserList />} />
        <Route path='/patientlist' element={<PatientList />} />
        <Route path='/listpaitentnurse' element={<ListpatientNurse />} />
        <Route path='/mypatient' element={<Mypatient />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/line' element={<LineChart />} />
        <Route path='/calendar' element={<Calendar />} />
      </Route>
    </>
  ),

);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store}>
      <Toaster />

      <RouterProvider router={router} />
    </Provider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
