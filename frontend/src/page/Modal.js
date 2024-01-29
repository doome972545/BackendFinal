import React from 'react'

const Modal = ({isVisible,onclose}) => {
    if(!isVisible) return null;
    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' onClick={()=>onclose()}>
            <div className='w-[600px] flex flex-col'>
                <button className='text-white text-xl place-self-end' onClick={()=>onclose()}>X</button>
                <div className='bg-white p-2 rounded-md'>
                    Modal
                </div>
            </div>
        </div>
    )
}

export default Modal