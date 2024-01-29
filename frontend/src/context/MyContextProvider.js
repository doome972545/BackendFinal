// MyContextProvider.js
import React, { useState } from 'react';
import MyContext from './Mycontext';
import UserList from '../components/admin/UserList';

const MyContextProvider = (props) => {
    const [DataUser, setDataUser] = useState('');
    const [DataPatient, setDataPatient] = useState('');
    const [DataMyPatient, setDataMyPatient] = useState('');
    console.log(DataMyPatient)
    return (
        <MyContext.Provider value={{
            DataUser,
            setDataUser,
            DataPatient,
            setDataPatient,
            DataMyPatient,
            setDataMyPatient,
        }}>
            {props.children}
        </MyContext.Provider>
    );
};

export default MyContextProvider;
