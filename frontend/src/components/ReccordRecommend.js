import React, { useState } from 'react'

const ReccordRecommend = ({ isOpen, onClose, patientid }) => {
    const [listCommend, setListCommend] = useState()
    const handleSubmit = (e) => {
        onClose();
    };
    if (!isOpen) return null;
    const Commend = async () => {
        try {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/user/listcommend/${patientid.id}`);

            if (!fetchData.ok) {
                throw new Error('Failed to fetch patient data');
            }

            const patientDataRes = await fetchData.json();
            setListCommend(patientDataRes);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
    Commend()
    const formatDateTime = (dateTimeString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const formattedDate = new Date(dateTimeString).toLocaleString('en-US', options);

        const [date, time] = formattedDate.split(', ');
        const [month, day, year] = date.split('/');
        const [hour, minute, second] = time.split(':');

        const formattedDateTime = `วันที่ ${day}-${month}-${year} เวลา ${hour}:${minute}:${second} น.`;
        return formattedDateTime;
    };
    return (
        <div  className='fixed inset-0 flex items-center justify-center flex-col bg-black bg-opacity-25 backdrop-blur-sm '>
            <div className="bg-white p-5 rounded-md w-[50vw] h-full">
                <div className='flex justify-between mb-4'>
                    <p className=' text-lg'>บันทึกการให้คำแนะนำ</p>
                    <button
                        className="bg-red-500 text-white px-2 rounded flex"
                        onClick={onClose}>
                        X
                    </button>
                </div>
                <div className="m-4 h-full p-4 rounded shadow-lg bg-slate-200 overflow-y-auto overflow-hidden border-4">
                    {listCommend && listCommend.length > 0 ? (
                        listCommend.map((el, index) => (
                            <div key={el.id} className='mb-2 border rounded-md shadow-md p-3 bg-white'>
                                <p className='mb-2'>{formatDateTime(el.created_at)}</p>
                                <hr></hr>
                                <p>ข้อความ : </p>
                                <p className=''>{el.commend}</p>
                            </div>
                        ))
                    ) : (
                        <p>ไม่มีคำแนะนำ</p>
                    )}
                </div>
            </div>
        </div>
    );
};


export default ReccordRecommend