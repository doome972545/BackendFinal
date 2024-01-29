import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { PiUploadSimpleBold } from 'react-icons/pi';
import EditPost from './EditPost';
import { Link, useParams } from 'react-router-dom';
import { MdOutlineModeEdit } from 'react-icons/md';
import { MdDelete } from "react-icons/md";

const FetchPost = () => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const accessToken = storedUserData.token
    const [postData, setPostData] = useState(null);
    const [edit, setEdit] = useState({ status: false, id: '' });
    const handleEdit = (id) => {
        setEdit(prevState => ({ status: !prevState.status, id }));
    }
    const fetchDataAndHandleErrors = async () => {
        try {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/upload`, {
                method: 'GET',
                headers: {
                    'token': `Bearer ${accessToken}`,
                },
            });

            if (!fetchData.ok) {
                throw new Error('not found data');
            }

            const dataRes = await fetchData.json();
            setPostData(dataRes)
        } catch (error) {
            console.error('Error:', error.message);
        }
    };
    fetchDataAndHandleErrors();

    const removePost = async (id) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/upload/remove/${id}`, {
            method: 'GET',
            headers: {
                'token': `Bearer ${accessToken}`
            }
        });
        const dataRes = await response.json();
        if (response.ok) {
            toast.success(dataRes)
        } else {
            console.error('Failed to upload data');
        }
    }



    return (
        <div className=' '>
            <table class="table-fixed border mt-4">
                <thead>
                    <tr>
                        <th className=' '>ลำดับ</th>
                        <th className=' min-w-24'>รูปภาพ</th>
                        <th className=' min-w-48'>หัวข้อ</th>
                        <th className=' w-full '>เนิ้อหา</th>
                        <th className=' min-w-48'>action</th>
                    </tr>
                </thead>
                {

                    postData && postData.length > 0 ? (

                        postData.map((el, index) => (
                            <>
                                <tbody key={el.id}>
                                    <tr className='border'>
                                        <td className='text-center'>{index + 1}</td>
                                        <td className=''>
                                            <img src={`image/${el.image}`} alt='Image 2' className='m-4 w-16 rounded-md'></img>
                                        </td>
                                        <td className='text-center ' >{el.title}</td>
                                        <td className=' p-2'>{el.desc}</td>
                                        <td className='flex gap-2 mt-6 items-center justify-center'>
                                            <button className='px-2 py-1 text-3xl border rounded-md text-slate-400 hover:text-slate-300' onClick={() => handleEdit(el.id)} >
                                                <MdOutlineModeEdit />
                                            </button>
                                            <button className='px-2 py-1 text-3xl text-red-500 rounded-md border  hover:text-red-400' onClick={() => removePost(el.id)} >
                                                <MdDelete />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className='bg-red-100 text-center'>ไม่มีการโพสต์</td>
                        </tr>
                    )
                }
                <EditPost id={edit} close={handleEdit} />
            </table>
        </div >
    )
}

export default FetchPost