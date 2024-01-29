import React, { Fragment, useState } from 'react'
import ListAccident from '../components/ListAccident'
import Modal from './Modal'
import Chart from './Chart'
import Calendar from '../components/calendar/Calendar'

const Home = () => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const [showModal, setShowmodal] = useState(false)
    return (
        <div >
            {
                storedUserData.user.isAdmin ?
                    <Chart />
                    :""
             }
             
        </div>
        // <Fragment>
        //     <div >
        //         <button className='bg-blue-600 text-white' onClick={()=>setShowmodal(true)}>
        //             Text Modal
        //         </button>
        //         <Modal isVisible={showModal} onclose={()=>setShowmodal(false)} />
        //     </div>
        // </Fragment>
    )
}

export default Home