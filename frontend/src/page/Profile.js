import React, { useState } from 'react'
import img from '../assets/james-person-1.jpg'

const Profile = () => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const [data, setData] = useState()
    const fetchUser = async () => {
        try {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/admin/user/${storedUserData.user.id}`);

            if (!fetchData.ok) {
                throw new Error('Failed to fetch patient data');
            }

            const dataRes = await fetchData.json();
            setData(dataRes[0])
        } catch (error) {
            console.error('Error:', error.message);
        }
    };
    fetchUser();

    return (
        <div className='px-4'>
            <h1 className='text-xl mb-4'>ข้อมูลของฉัน</h1>
            <div className='flex gap-5 p-2'>
                <img className='w-44 rounded-md' src={img}></img>
                {
                    data ?
                        <div>
                            <div>ชื่อ : {data.firstname}</div>
                            <div>นามสกุล : {data.lastname}</div>
                            <div>อีเมล : {data.email}</div>
                            <div>สถานะ : 
                                {
                                    data.isAdmin ? "admin"
                                        : data.isDoctor ? "Doctor"
                                            : data.isNurse ? "Nurse"
                                                : "รออนุมัติ"
                                }
                            </div>
                        </div>
                        :"data not found"
                }

            </div>
        </div>
    )
}

export default Profile