// Modal.js
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Recommend = ({ isOpen, onClose, patientid }) => {
    const [text, setText] = useState('');
    const handleTextChange = (e) => {
        setText(e.target.value);
    };
    if (!isOpen) return null;
    const handleSubmit = async (e) => {
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/user/myrecommend/${patientid.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                commend: text
            }),
        });
        const dataRes = await fetchData.json();
        setText(e.target.value);
        toast.success(dataRes.message);
        onClose();
    };


    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
            <div className="modal-content p-4 rounded shadow-md bg-white w-[30vw]">
                <label htmlFor="textInput" className="block text-lg font-medium text-gray-700 mb-2">
                    ใส่คำแนะนำ
                </label>
                <input
                    type="text"
                    id="textInput"
                    className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 mb-4"
                    value={text}
                    onChange={handleTextChange}
                />
                <div className='flex gap-4'>
                    {
                        text ? <button
                            className="bg-green-500 text-white px-3 py-2 rounded "
                            onClick={handleSubmit}>
                            ตกลง
                        </button> : ""
                    }
                    <button
                        className="bg-red-500 text-white px-3 py-2 rounded"
                        onClick={onClose}>
                        ยกเลิก
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Recommend;
