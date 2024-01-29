import toast from 'react-hot-toast';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from '../redux/user';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const userData = useSelector((state) => state.user)
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/admin`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const dataRes = await fetchData.json();
        if (dataRes.message === 'login successfully!!') {
            dispatch(loginRedux(dataRes));
            toast.success(dataRes.message);
            localStorage.setItem("user", JSON.stringify(dataRes));
            Navigate('/')
        } else {
            toast.error(dataRes.message);
        }
    };
    return (
        <div className='p-4 flex flex-col min-h-screen'>
            <div className='flex items-center justify-around'>
                <div className='min-w-[45vh] md:min-w-[50vh]  lg:min-w-[75vh] p-4 bg-white rounded-md shadow-md mt-10 flex flex-col justify-center'>
                    <div className='logo'></div>
                    <form onSubmit={handleSubmit} className='mt-4'>
                        <div className='mb-4'>
                            <div className='input-container '>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    value={email}
                                    onChange={handleEmailChange}
                                    className='p-2 border md:p-4 lg:p-2 w-full focus:outline-none  rounded-md '
                                    required
                                    placeholder=' '
                                />
                                <label htmlFor='email'>Email</label>
                            </div>
                        </div>
                        <div className='mb-4'>
                            <div className='input-container'>
                                <input
                                    type='password'
                                    id='password'
                                    name='password'
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className='p-2 border md:p-4 lg:p-2 w-full focus:outline-none  rounded-md '
                                    required
                                    placeholder=' '
                                />
                                <label htmlFor='password'>Password</label>
                            </div>
                        </div>
                        <div className=''>
                            <button
                                type='submit'
                                className='mt-4  underline bg-indigo-900 hover:bg-indigo-950 text-white rounded-md px-3 py-2 mr-4 w-full'
                            >
                                เข้าสู่ระบบ
                            </button>

                        </div>
                    </form>
                    <Link to={'/register'}
                        className='mt-4 underline bg-slate-400 hover:bg-slate-500 text-white text-center rounded-md px-3 py-2 mr-4 w-full'
                    >
                        ลงทะเบียน
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
