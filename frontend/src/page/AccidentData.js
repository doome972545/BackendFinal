import React, { useState } from 'react'
import img from '../assets/james-person-1.jpg'
import Recommend from '../components/Recommend'
import ReccordRecommend from '../components/ReccordRecommend';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';


const AccidentData = () => {


    const patientId = useParams()
    const [getDoctor, setDoctor] = useState()
    const [selectedOption, setSelectedOption] = useState('');
    const Navigate = useNavigate()

    const [change, setChange] = useState({
        doctor_id: '',
        patient_id: '',
    });
    const [patientData, setPatientData] = useState({
        first_name: "",
        last_name: "",
        gender: "",
        date_of_birth: "",
        address: "",
    })


    const [reccordPatient, setReccordPatient] = useState({
        blood_oxygen: "",
        blood_pressure: "",
        blood_sugar: "",
        record_date: "",
        temperature: "",
    })


    const fetchPatientData = async () => {
        try {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/user/${patientId.id}`);

            if (!fetchData.ok) {
                throw new Error('Failed to fetch patient data');
            }

            const patientDataRes = await fetchData.json();
            setPatientData(patientDataRes[0]);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };
    fetchPatientData();

    const fetchReccordPatientData = async () => {
        try {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/telemed/${patientId.id}`);

            if (!fetchData.ok) {
                throw new Error('Failed to fetch patient data');
            }

            const patientDataRes = await fetchData.json();
            setReccordPatient(patientDataRes.slice(0,7));
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
    fetchReccordPatientData()

    const selectIdFirstnameDoctor = async () => {
        try {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/admin/selectDoctor`,);

            if (!fetchData.ok) {
                throw new Error('Failed to fetch patient data');
            }

            const doctor = await fetchData.json();
            setDoctor(doctor);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
    selectIdFirstnameDoctor()
    const addPatient = async () => {
        try {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/added`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(change),
            });

            if (!fetchData.ok) {
                throw new Error(`Failed to fetch patient data. Status: ${fetchData.status}`);
            }
            const doctor = await fetchData.json();
            if (doctor.message === 'เพิ่มผู้ป่วยเรียบร้อยแล้ว') {
                toast.success(doctor.message)
            } else {
                toast.error(doctor.message)
            }
            setDoctor(doctor);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    const removePatient = async () => {
        try {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/added/cancel/${patientId.id}`, {
                method: 'POST',
            });

            if (!fetchData.ok) {
                throw new Error(`Failed to fetch patient data. Status: ${fetchData.status}`);
            }
            const doctor = await fetchData.json();
            if (doctor.message === 'ทำการยกเลิกผู้ป่วยแล้ว') {
                toast.success(doctor.message)
            } else {
                toast.error(doctor.message)
            }
            setDoctor(doctor);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
    const [isRecommendOpen, setOpenRecommend] = useState(false);
    const openRecommend = () => {
        setOpenRecommend(preve => !preve);
        setReccordRecommend(false);
    };

    const closeRecommend = () => {
        setOpenRecommend(false);
    };

    const [isReccordRecommendOpen, setReccordRecommend] = useState(false);
    const openReccordRecommend = () => {
        setReccordRecommend(preve => !preve);
        setOpenRecommend(false);
    };

    const closeReccordRecommend = () => {
        setReccordRecommend(false);
    };
    const storedUserData = JSON.parse(localStorage.getItem("user"));

    // Handler function to update the selected option
    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
        setChange({ doctor_id: e.target.value, patient_id: patientId.id });
    };
    return (
        <>
            {
                storedUserData.user.isNurse === 0 && storedUserData.user.isDoctor === 0 ? (
                    Navigate('/')
                )
                    :
                    <div className=' flex flex-col gap-3  px-4'>
                        <div className='mb-1 flex justify-between'>
                            <p>ข้อมูลผู้ป่วย</p>
                            {
                                storedUserData.user.isNurse ?
                                    <Link to={'/listpaitentnurse'}>
                                        <button className='bg-red-500 text-white px-2 rounded-md'>กลับ</button>
                                    </Link>
                                    :
                                    <Link to={'/mypatient'}>
                                        <button className='bg-red-500 text-white px-2 rounded-md'>กลับ</button>
                                    </Link>
                            }
                        </div>
                        <div className='sm:min-w-[86%] border rounded-md shadow-md bg-teal-200 px-3 py-3 sm:flex gap-4'>
                            <div className=' flex gap-4'>
                                <img src={img} className='w-16 h-20 sm:w-20 sm:h-24 rounded-md shadow-lg '></img>
                                <div>
                                    <p>ชื่อ: {patientData.first_name} {patientData.last_name}</p>
                                    <p>อายุ: {calculateAge(patientData.date_of_birth)}</p>
                                    <p>วันเกิด: {(patientData.date_of_birth.split('T')[0])}</p>
                                    <p>ที่อยู่: {patientData.address}</p>
                                    <p>โรคประจำตัว: -</p>
                                    {
                                        patientData.added && storedUserData.user.isNurse ?
                                            <div className='flex '>
                                                <p className='px-2 py-1 bg-green-400 '>added</p>
                                            </div>
                                            : ""
                                    }
                                </div>
                            </div>
                            <div className='flex gap-4'>
                                {
                                    storedUserData.user.isDoctor ?
                                        <div >
                                            <button className={`${isRecommendOpen ? 'bg-yellow-500 p-3 shadow-md rounded-md text-lg' : 'bg-yellow-400 p-2 rounded-md text-lg  hover:shadow-md '} `} onClick={openRecommend}>ให้คำแนะนำ</button>
                                        </div>
                                        : ""
                                }
                                <div >
                                    <button className={`${isReccordRecommendOpen ? 'bg-blue-500 p-3 shadow-md rounded-md text-lg text-white' : 'bg-blue-400 p-2 rounded-md text-lg text-white hover:shadow-md '} `} onClick={openReccordRecommend}>ดูบันทึกคำแนะนำ</button>
                                </div>
                                {
                                    storedUserData.user.isNurse ? <div className='flex flex-col gap-4 w-40'>
                                        <label htmlFor="selectOption">เลือกคุณหมอ </label>
                                        <select id="selectOption" value={selectedOption} onChange={handleSelectChange}>
                                            <option value="">Select...</option>
                                            {
                                                getDoctor && getDoctor.length ? (
                                                    getDoctor.map((el) =>
                                                        <option key={el.id} value={el.id}>{el.firstname} {el.lastname}</option>
                                                    )
                                                ) : (
                                                    "awd"
                                                )
                                            }
                                        </select>
                                        <button className='bg-green-400 px-2 py-1 rounded-md' onClick={addPatient}>ยืนยัน</button>
                                        {
                                            selectedOption || patientData.added ?
                                                <button className='bg-red-400 px-2 py-1 rounded-md' onClick={removePatient}>ยกเลิก</button>
                                                : ""
                                        }
                                    </div> : ""
                                }
                            </div>
                        </div>

                        <Recommend isOpen={isRecommendOpen} onClose={closeRecommend} patientid={patientId} />
                        <ReccordRecommend isOpen={isReccordRecommendOpen} onClose={closeReccordRecommend} patientid={patientId} />
                        <caption class="caption-top">
                            บันทึกผลการตรวจสุขภาพประจำวัน
                        </caption>
                        <table class="w-full border-collapse border border-slate-400">
                            <thead>
                                <tr>
                                    <th class="border border-slate-300 py-2 px-4 text-lg">วันที่</th>
                                    <th class="border border-slate-300 ...">ความดัน</th>
                                    <th class="border border-slate-300 ...">ออกซิเจนในเลือด</th>
                                    <th class="border border-slate-300 ...">น้ำตาลในเลือด</th>
                                    <th class="border border-slate-300 ...">อุณหภูมิ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reccordPatient && reccordPatient.length > 0 ? (
                                    reccordPatient.map((el, index) => (
                                        <tr key={index}>
                                            <td class="border border-slate-300 text-center">{el.record_date.split('T')[0]}</td>
                                            <td class="border border-slate-300 text-center">{el.blood_pressure}</td>
                                            <td class="border border-slate-300 text-center">{el.blood_oxygen}</td>
                                            <td class="border border-slate-300 text-center">{el.blood_sugar}</td>
                                            <td class="border border-slate-300 text-center">{el.temperature}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colspan="5" class="text-center bg-red-200">ไม่มีการบันทึกข้อมูล</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                    </div>
            }
        </>
    )
}

const calculateAge = (birthDate) => {
    const currentDate = new Date();
    const birthDateObj = new Date(birthDate);

    // Calculate the difference in years
    let age = currentDate.getFullYear() - birthDateObj.getFullYear();

    // Check if the birthday hasn't occurred yet this year
    if (currentDate.getMonth() < birthDateObj.getMonth() ||
        (currentDate.getMonth() === birthDateObj.getMonth() && currentDate.getDate() < birthDateObj.getDate())) {
        age--;
    }

    return age;
};

export default AccidentData