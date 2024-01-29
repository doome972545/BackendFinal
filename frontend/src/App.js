import Header from "./components/Header";
import Main from "./components/Main";
import toast, { Toaster } from "react-hot-toast";
import Login from "./page/Login";
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';

function App() {
  const userData = useSelector((state) => state.user)
  const storedUserData = JSON.parse(localStorage.getItem("user"));
  const fetchDataAndHandleErrors = async () => {
    try {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/admin/updateUserOmline`);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  fetchDataAndHandleErrors();
  return (
    <>
      {storedUserData ? (
        <div>
          {
            storedUserData.user.isAdmin ? <>
              <Header />
              <Main />
            </>
              :
              <>
                {
                  storedUserData.user.isDoctor ?
                    <>
                      <Header />
                      <Main />
                    </>
                    : <>
                      {
                        storedUserData.user.isNurse ?
                          <>
                            <Header />
                            <Main />
                          </>
                          :
                          <>
                            <Header />
                            <div className="ml-52 bg-red-300 h-[10vh] mt-4 mx-4 shadow-md rounded-md flex items-center justify-center text-3xl">
                              รอการอนุมัติ
                            </div>
                            <Main />
                          </>
                      }
                    </>
                }
              </>
          }
          {/* <Header />
          <Main /> */}
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
