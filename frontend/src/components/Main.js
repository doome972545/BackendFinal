import React from 'react'
import Left from './left/Left'
import { Outlet } from 'react-router-dom'

const Main = () => {
    return (
        <div className='grid  h-full'>
            <Left />
            <div>
                <div className='py-4  bg-white mt-4 rounded-md sm:ml-52 '>
                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main