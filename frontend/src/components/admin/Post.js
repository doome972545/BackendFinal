import React, { Fragment, useState } from 'react';
import toast from 'react-hot-toast';
import { PiUploadSimpleBold } from "react-icons/pi";
import FetchPost from '../POST/fetchPost';
import { useNavigate } from 'react-router-dom';
import { MdAddToPhotos } from "react-icons/md";

const Post = () => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
    const Navigate = useNavigate()
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        // แสดงรูปตัวอย่าง
        const reader = new FileReader();
        reader.onloadend = () => {
            setUploadedImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const accessToken = storedUserData.token
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);
        formData.append('desc', desc);
        if (!title || !desc || !image) {
            return toast.error("Please enter post complete!!")
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/upload`, {
                method: 'POST',
                body: formData,
                headers: {
                    'token': `Bearer ${accessToken}`,
                },
            });
            const dataRes = await response.json();
            if (response.ok) {
                toast.success(dataRes.message)
                // เคลียร์ข้อมูลหลังจากอัปโหลดเสร็จ
                setImage(null);
                setTitle('');
                setDesc('');
                setUploadedImage(null);
            } else {
                console.error('Failed to upload data');
            }
        } catch (error) {
            toast.error(error.message)
        }
    };



    const handleDelete = () => {
        localStorage.removeItem('uploadedImageData');
        setUploadedImage(null);
    };
    const [PostHealthy, setPostHealthy] = useState(false);
    const openPostHealthy = () => {
        setPostHealthy(preve => !preve);
    };


    // ตรวจสอบว่ามีรูปที่ถูกอัปโหลดใน localStorage หรือไม่
    const storedImageData = localStorage.getItem('uploadedImageData');
    const storedImage = storedImageData ? JSON.parse(storedImageData) : null;
    if (!storedUserData.user.isAdmin) {
        Navigate('/');
        toast.error("You are not allowed to access this page");
    }
    return (
        <Fragment>
            {
                storedUserData.user.isAdmin &&
                <div className='px-4 '>
                    <div >
                        <button className=' text-white  bg-green-500 p-2 rounded-md text-2xl  hover:bg-green-400 ' onClick={openPostHealthy}>
                            <MdAddToPhotos />
                        </button>
                    </div>
                    {
                        PostHealthy ?
                            <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center'>
                                <form className="static m-auto w-full max-w-md shadow flex flex-col p-3 bg-white border rounded-md" >
                                    <div className='flex justify-between'>
                                        <label htmlFor='name'>หัวข้อ</label>
                                        <button className='py-1 px-2 bg-red-500 text-white rounded-md hover:bg-red-600' onClick={openPostHealthy}>ปิด</button>
                                    </div>
                                    <input type={'text'} name="name" className='bg-slate-200 p-1 rounded-md my-1' value={title} onChange={(e) => setTitle(e.target.value)} ></input>
                                    <label htmlFor='image'>รูปภาพ
                                        <div className='h-40 w-full bg-slate-200 my-1 rounded-md flex items-center justify-center cursor-pointer'>
                                            <input type={'file'} id='image' accept='image/*' className='hidden' name='image' onChange={handleImageChange} ></input>
                                            {
                                                uploadedImage ?
                                                    (<img src={uploadedImage} className='h-full'></img>)
                                                    : <span className='text-5xl'><PiUploadSimpleBold /></span>
                                            }
                                        </div>
                                    </label>
                                    <div className='flex justify-end gap-3'>
                                        {
                                            uploadedImage ?
                                                <button className='p-1 bg-red-600 rounded-md text-white' onClick={handleDelete}>ลบ</button>
                                                : ""
                                        }
                                    </div>
                                    <label htmlFor='description' className='font-normal '>รายละเอียด</label>
                                    <textarea rows={3} name='description' className='bg-slate-200 my-1 p-1 rounded-md resize-none' value={desc} onChange={(e) => setDesc(e.target.value)} ></textarea>
                                    <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2' onClick={handleSubmit}>Save</button>
                                </form>
                            </div>
                            : ""
                    }
                    <FetchPost />
                </div>
            }
        </Fragment>
    );
};

export default Post;
