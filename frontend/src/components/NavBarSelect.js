import React from 'react'
import { Link } from 'react-router-dom'
import Chart from '../page/Chart';
import { IoCalendarNumber } from 'react-icons/io5';
import { IoPersonSharp } from "react-icons/io5";
import { FaHome, FaImage } from "react-icons/fa";
import iconPatient from "../assets/patient.png"
import lisPatient from "../assets/listPatient.png"
import { PiUserListFill } from "react-icons/pi";

const NavBarSelect = () => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    return (
        <div className='flex flex-col gap-6 text-lg sticky top-24 '>
            <Link to={'/'} activeClassName='selected-link'>
                <p className='flex gap-2 mt-2 cursor-pointer text-[18px] hover:bg-blue-100 text-black hover:text-black hover:transition-all hover:ease-out hover:p-2 rounded-md '
                >
                    <FaHome className='text-black text-2xl' />หน้าหลัก</p>
            </Link>
            {
                storedUserData.user.isAdmin ?
                    <>
                        <Link to={'/userlist'} activeClassName='selected-link'>
                            <p className='flex gap-2 cursor-pointer text-[18px] hover:bg-blue-100 text-black hover:text-black hover:transition-all hover:ease-out hover:p-2 rounded-md'>
                                <PiUserListFill className='text-black text-2xl' />
                                รายชื่อผู้ใช้</p>
                        </Link>
                        <Link to={'/patientlist'} activeClassName='selected-link'>
                            <p className='flex gap-2 cursor-pointer text-[18px] hover:bg-blue-100 text-black hover:text-black hover:transition-all hover:ease-out hover:p-2 rounded-md'>
                                <img src={lisPatient} className='w-[25px]'></img>
                                รายชื่อผู้ป่วย</p>
                        </Link>
                        <Link to={'/post'} activeClassName='selected-link' f>
                            <p className='flex gap-2 cursor-pointer text-[18px] hover:bg-blue-100 text-black hover:text-black hover:transition-all hover:ease-out hover:p-2 rounded-md'>
                                <FaImage className='text-black text-2xl' />
                                โพสต์ข้อมูล</p>
                        </Link>
                    </>
                    :
                    <>
                        {
                            storedUserData.user.isDoctor ?
                                <>
                                    <Link to={'/mypatient'}>
                                        <p className='flex gap-2 cursor-pointer text-[18px] hover:bg-blue-100 text-black hover:text-black hover:transition-all hover:ease-out hover:p-2 rounded-md'>
                                            <img src={iconPatient} className='w-[25px]'></img>
                                            ผู้ป่วยของฉัน
                                        </p>
                                    </Link>
                                    <Link to={'/listpaitentnurse'}>
                                        <p className='flex gap-2 cursor-pointer text-[18px] hover:bg-blue-100 text-black hover:text-black hover:transition-all hover:ease-out hover:p-2 rounded-md'>
                                            <img src={lisPatient} className='w-[25px]'></img>
                                            รายชื่อผู้ป่วย</p>
                                    </Link>
                                </>
                                :
                                <>
                                    {
                                        storedUserData.user.isNurse ?
                                            <>
                                                <Link to={'/listpaitentnurse'}>
                                                    <p className='flex gap-2 cursor-pointer text-[18px] hover:bg-blue-100 text-black hover:text-black hover:transition-all hover:ease-out hover:p-2 rounded-md'>
                                                        <img src={lisPatient} className='w-[25px]'></img>
                                                        รายชื่อผู้ป่วย</p>
                                                </Link>
                                            </>
                                            : ""
                                    }
                                </>
                        }
                    </>
            }
            <Link to={'/profile'}>
                <p className='flex gap-2 cursor-pointer text-[18px] hover:bg-blue-100 text-black hover:text-black hover:transition-all hover:ease-out hover:p-2 rounded-md'>
                    <IoPersonSharp className='text-black text-2xl' />
                    ข้อมูลของฉัน
                </p>
            </Link>
            <Link to={'calendar'}>
                <p className='flex gap-2 items-center w-full cursor-pointer text-[18px] hover:bg-blue-100 text-black hover:text-black hover:transition-all hover:ease-out hover:p-2 rounded-md'>
                    <IoCalendarNumber className='text-black text-2xl' />
                    ปฏิทิน
                </p>
            </Link>
        </div>
    )
}

export default NavBarSelect