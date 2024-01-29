import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useHistory, useNavigate } from "react-router-dom";
import { PiUploadSimpleBold } from "react-icons/pi";

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [uploadedImage, setUploadedImage] = useState(null);
    const [image, setImage] = useState(null);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", image);
        // Perform form validation here
        // Mock registration API call
        if (
            password.length > 6 &&
            password === confirmPassword &&
            firstName &&
            lastName &&
            email
        ) {
            try {
                // Simulate a successful registration for demonstration purposes
                const response = await fetch(
                    `${process.env.REACT_APP_SERVER_DOMIN}/api/admin/register/?Email=${email}`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );
                if (response.ok) {
                    const dataRes = await response.json();
                    if (dataRes.message === 'อีเมลนี้ถูกใช้ไปแล้ว') {
                        return toast.error(dataRes.message);
                    }
                    toast.success(dataRes.message);
                    setTimeout(() => {
                        Navigate('/login')
                    }, 2500);
                }
            } catch (error) {
                toast.error("Registration failed. Please try again.");
            }
        } else {
            toast.error("กรอกข้อมูลให้ถูกต้อง");
        }
    };

    return (
        <div className="px-4 flex justify-center mt-6">

            <form
                className="w-full max-w-md shadow flex flex-col p-3 bg-white border rounded-md"
                onSubmit={handleSubmit}
            >
                <h1 className="text-center text-3xl font-semibold mb-4">ลงทะเบียน</h1>
                <label htmlFor="image">
                    <div className="flex justify-center">
                        <div className="h-36 w-36 bg-slate-200 my-1 rounded-full flex items-center justify-center cursor-pointer">
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                className="hidden"
                                name="image"
                                onChange={handleImageChange}
                            />
                            <div className="rounded-full overflow-hidden h-full w-full flex justify-center items-center border-4">
                                {uploadedImage ? (
                                    <img
                                        src={uploadedImage}
                                        alt="uploaded"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="text-5xl">
                                        <PiUploadSimpleBold />
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </label>

                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <label htmlFor="firstName">ชื่อ</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="First Name"
                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="lastName">นามสกุล</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Last Name"
                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="**********"
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {password
                    ? password.length < 6 && (
                        <p className="text-red-500 mb-2">
                            Password must be at least 6 characters
                        </p>
                    )
                    : ""}
                <label htmlFor="confirm">Confirm Password</label>
                <input
                    type="password"
                    id="confirm"
                    name="confirm"
                    placeholder="**********"
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPassword
                    ? password !== confirmPassword && (
                        <p className="text-red-500 mb-1">Passwords do not match</p>
                    )
                    : ""}

                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium my-2"
                    type="submit"
                >
                    Register
                </button>
                <Link to={"/login"}>
                    <p className="flex gap-2 ">
                        เป็นสมาชิกอยู่แล้วใช่ใหม?
                        <p className="text-red-600 underline">ลงชื่อเข้าใช้</p>
                    </p>
                </Link>
            </form>
        </div>
    );
};

export default Register;
