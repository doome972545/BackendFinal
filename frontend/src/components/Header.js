import React, { Fragment, useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { GiHospitalCross } from 'react-icons/gi'
import NavBarSelect from './NavBarSelect';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import img from '../assets/james-person-1.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../redux/user';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import { IoCalendarNumber } from "react-icons/io5";
// import Calendar from './calendar/Calendar';

const Header = () => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const dispatch = useDispatch()

    const isTokenExpired = (token) => {
        try {
            const decodedToken = jwtDecode(token);

            // ตรวจสอบว่าเวลาหมดอายุ (exp) น้อยกว่าเวลาปัจจุบันหรือไม่
            return decodedToken.exp < Date.now() / 1000;
        } catch (error) {
            // กรณีเกิดข้อผิดพลาดในการ Decode Token
            console.error('Error decoding token:', error);
            return true;
        }
    };

    // ใช้ฟังก์ชัน isTokenExpired เพื่อตรวจสอบ Token
    const token = storedUserData.token;
    const isExpired = isTokenExpired(token);

    // สร้างฟังก์ชัน logoutAuto
    const logoutAuto = () => {
        dispatch(logoutRedux())
        localStorage.removeItem("user");
        toast.error("เซสชันหมดอายุ กรุณาล็อกอินใหม่")
        setTimeout(() => {
            Navigate("/")
        }, 1000);
    }
    // ตรวจสอบว่า Token หมดอายุหรือไม่
    if (isExpired) {
        logoutAuto();
    }
    const Navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false);
    const userData = useSelector((state) => state.user)
    const handleShowMenu = () => {
        setShowMenu(preve => !preve);
    }
    const [isMobile, setIsMobile] = useState(false);
    const image = true;
    const checkWindowSize = () => {
        setIsMobile(window.innerWidth < 640);
    };
    useEffect(() => {
        checkWindowSize();
        window.addEventListener('resize', checkWindowSize);
        return () => {
            window.removeEventListener('resize', checkWindowSize);
        };
    }, []);
    const handleLogout = (e) => {
        dispatch(logoutRedux())
        localStorage.removeItem("user");
        toast.success("Your are logout")
        setTimeout(() => {
            Navigate("/")
        }, 1000);
    }
    return (
        <Fragment>
            <header className="sm:ml-52 shadow-md  text-2xl px-5 py-3  bg-white text-gray-200 rounded-b-md">
                <div className="flex justify-between" >
                    <Link>
                        <div className=" text-blue-400 text-4xl cursor-pointer">
                            <GiHospitalCross />
                        </div>
                    </Link>
                    <div className="hidden sm:flex ">
                        <h1 className="text-3xl font-bold text-slate-500">Hospital</h1>
                    </div>
                    <div className="flex gap-2 items-center">
                        <p className="text-base flex gap-3 items-center text-black">{storedUserData.user.isAdmin ? <p className='bg-lime-500 px-2 py-1'>Admin </p> : <>
                            {storedUserData.user.isDoctor ? <p className='bg-lime-500 px-2 py-1'>Doctor </p> : storedUserData.user.isNurse ? <p className='bg-lime-500 px-2 py-1'>Nurse </p> : <p className='bg-red-500 text-white px-2 py-1'>รออนุมัติ </p>}
                        </>
                        } {storedUserData.user.firstname} {storedUserData.user.lastname}</p>
                        {
                            image ? (<img src={img} className='w-9 h-9 rounded-full cursor-pointer text-lg border-2 border-blue-600 hover:shadow-md' onClick={handleShowMenu}></img>)
                                : (<div className="p-2 bg-blue-500 text-white rounded-full cursor-pointer text-lg hover:shadow-md " onClick={handleShowMenu}>
                                    <FaUser />
                                </div>)
                        }
                        {
                            showMenu && (
                                <div className="absolute top-14 right-4 bg-white px-3 pb-2 min-w-[30%] lg:min-w-[10%]  shadow drop-shadow-md rounded-md border">
                                    {
                                        isMobile ?
                                            <div className=''>
                                                <NavBarSelect />
                                            </div>
                                            : ""
                                    }
                                    {
                                        userData ? <button className='text-lg bg-red-500 px-1 rounded-md mt-2 w-full text-white' onClick={handleLogout} >Logout</button>
                                            : ""
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </header>
        </Fragment>
    )
}

export default Header