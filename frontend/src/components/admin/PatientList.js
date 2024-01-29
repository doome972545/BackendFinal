import React, { useState, createContext, useContext } from 'react';
import img from '../../assets/james-person-1.jpg';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SearchPatient from '../search/SearchPatient';
import MyContext from '../../context/Mycontext';

const PatientList = () => {
    const { DataPatient, setDataPatient } = useContext(MyContext)
    const [data, setData] = useState([]);
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const Navigate = useNavigate()
    const fetchDataAndHandleErrors = async () => {
        try {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/user`, {
                method: 'GET',
            });

            if (!fetchData.ok) {
                throw new Error('Login failed');
            }

            const dataRes = await fetchData.json();
            setData(dataRes);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    fetchDataAndHandleErrors();
    return (
        <>
            {
                storedUserData.user.isAdmin === 1 || storedUserData.user.isNurse === 1 ?
                    <div className='px-4'>
                        <div className='flex justify-between'>
                            {
                                data ?
                                    <>
                                        <div className='flex gap-2'>
                                            <p>รายชื่อผู้ป่วย</p>
                                            <p className='text-blue-600 font-bold '>{data.length}</p>
                                            <p>คน</p>
                                        </div>
                                    </>
                                    : "no data fetch"
                            }

                            <div className='flex gap-2 '>
                                <SearchPatient />
                            </div>
                        </div>
                        <>
                            {
                                DataPatient ? <>
                                    {DataPatient && DataPatient.length > 0 ? (
                                        DataPatient.map((el) => (<>
                                            <div key={el.id} className=' sm:w-auto  py-3 px-3  flex  flex-col sm:flex-row justify-between gap-2 sm:gap-16'>
                                                <div className='flex gap-5 sm:gap-20 '>
                                                    <img src={img} className='w-16 h-20 sm:w-20 sm:h-auto rounded-md shadow-lg' alt='person'></img>
                                                    <div>
                                                        <p>ชื่อ: {el.first_name} {el.last_name}</p>
                                                        <p>อายุ: {calculateAge(el.date_of_birth)}</p>
                                                        <p>บัตรประชาชน: {el.id_number}</p>
                                                    </div>

                                                </div>
                                                <div className='flex flex-col sm:flex-row gap-2 justify-center items-center' >
                                                    <div>
                                                        {
                                                            el.added ? <p className='bg-green-300 px-3 py-2'>added</p> : <p className='bg-slate-300 px-3 py-2'>not add</p>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                        </>
                                        ))
                                    ) : (
                                        <p className='text-center'>ไม่พบผู้ป่วย</p>
                                    )}
                                </>
                                    : <>
                                        {data && data.length > 0 ? (
                                            data.map((el) => (<>
                                                <div key={el.id} className=' sm:w-auto  py-3 px-3  flex  flex-col sm:flex-row justify-between gap-2 sm:gap-16'>
                                                    <div className='flex gap-5 sm:gap-20 '>
                                                        <img src={img} className='w-16 h-20 sm:w-20 sm:h-auto rounded-md shadow-lg' alt='person'></img>
                                                        <div>
                                                            <p>ชื่อ: {el.first_name} {el.last_name}</p>
                                                            <p>อายุ: {calculateAge(el.date_of_birth)}</p>
                                                            <p>บัตรประชาชน: {el.id_number}</p>
                                                        </div>

                                                    </div>
                                                    <div className='flex flex-col sm:flex-row gap-2 justify-center items-center' >
                                                        <div>
                                                            {
                                                                el.added ? <p className='bg-green-300 px-3 py-2'>added</p> : <p className='bg-slate-300 px-3 py-2'>not add</p>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />
                                            </>
                                            ))
                                        ) : (
                                            <p>No data available</p>
                                        )}
                                    </>
                            }
                        </>
                    </div>
                    : (
                        Navigate('/')
                    )
            }
        </>
    );
};
const calculateAge = (birthDate) => {
    const currentDate = new Date();
    const birthDateObj = new Date(birthDate);

    // Calculate the difference in years
    let age = currentDate.getFullYear() - birthDateObj.getFullYear();

    // Check if the birthday hasn't occurred yet this year
    if (currentDate.getMonth() < birthDateObj.getMonth() ||
        (currentDate.getMonth() === birthDateObj.getMonth() && currentDate.getDate() < birthDateObj.getDate())) {
        age--;
    }

    return age;
};
export default PatientList;
