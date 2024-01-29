import React from 'react'
import NavBarSelect from '../NavBarSelect'
import { GiHospitalCross } from 'react-icons/gi'
import { Link } from 'react-router-dom'

const Left = () => {
    return (
        <div>
            <div className=' sm:fixed top-0 w-48 hidden sm:flex px-5 min-h-[100%]  shadow-xl bg-white rounded-r-md ' >
                <div className='text-gray-200  '>
                    <Link to={'/'}>
                        <img className='pt-4' src='https://www.bangkokhospitalpluakdaeng.com/wp-content/uploads/2023/06/pluakdaeng-Logo.png'></img>
                    </Link>
                    <NavBarSelect />
                </div>
            </div>
        </div>
    )
}

export default Left