import React, { createContext } from 'react';

const MyContext = React.createContext({
    DataUser: null,
    setDataUser: (index) => { },
    DataPatient: null,
    setDataPatient: (index) => { },
    DataMyPatient: null,
    setDataMyPatient: (index) => { },
});

export default MyContext;   