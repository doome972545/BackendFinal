import React, { useState, useEffect, Fragment, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img from '../../assets/james-person-1.jpg';
import toast from 'react-hot-toast';
import { IoMdSearch } from "react-icons/io";
import SearchUser from '../search/SearchUser';
import { UserContext } from '../search/SearchPatient';
import MyContext from '../../context/Mycontext';

const UserList = () => {
  const { DataUser, setDataUser } = useContext(MyContext)
  const [data, setData] = useState([]);
  const storedUserData = JSON.parse(localStorage.getItem("user"));
  const Navigate = useNavigate()
  const fetchUserAdminDoctorNurse = async () => {
    try {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/admin`, {
        method: 'GET',
        headers: {
          'token': `Bearer ${storedUserData.token}`
        },
      });

      if (!fetchData.ok) {
        throw new Error('Login failed');
      }

      const dataRes = await fetchData.json();

      setData(dataRes);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  const updateStatus = async (userId, newStatus) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/admin/changeStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': `Bearer ${storedUserData.token}`
        },
        body: JSON.stringify({
          userId: userId,
          newStatus: newStatus,
        }),
      });
      const dataRes = await response.json();
      if (response.ok) {
        if (newStatus === 'doctor' || newStatus === 'nurse') {
          toast.success(dataRes.message)
          All()
        } else {
          toast.error(dataRes.message)
        }
      }
      // Fetch data again after updating user status
      fetchUserAdminDoctorNurse();
    } catch (error) {
      console.error('Error updating user status:', error.message);
    }
  };
  const [sortData, setSortData] = useState()
  const All = () => {
    setSortData("")
    setDataUser('')
  }
  const sortUser = async (sort) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/admin/sort`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': `Bearer ${storedUserData.token}`
        },
        body: JSON.stringify({
          sort: sort
        }),
      });
      const dataRes = await response.json();
      setSortData(dataRes)
    } catch (error) {
      console.error('Error updating user status:', error.message);
    }
  }
  useEffect(() => {
    fetchUserAdminDoctorNurse();
  }, []); // Run this effect only once after the component mounts
  const [modal, setModal] = useState(false);
  const [newStatus, setNewStatus] = useState();
  const confirmsure = (userId, newStatus, s) => {
    setNewStatus(newStatus)
    setModal(userId, newStatus)
  }
  return (
    <Fragment>
      <div className='px-4'>
        {/* <div className='border min-h-[40vh] mb-4 rounded-md  shadow-sm p-2'>
          <h2 className='text-2xl font-medium'>User management system </h2>
        </div> */}
        <div className='flex gap-3'>
          {
            data.userlist ?
              <>
                <p className='flex items-center'>รายชื่อผู้ใช้มีทั้งหมด {data.userlist.length} คน</p>
                <button onClick={() => sortUser('admin')} className='bg-red-400 px-2 py-1 rounded-md hover:bg-red-500'>admin {data.countUser.adminCount} คน</button>
                <button onClick={() => sortUser('doctor')} className='bg-purple-400 px-2 py-1 rounded-md hover:bg-purple-500'>หมอ {data.countUser.doctorCount} คน</button>
                <button onClick={() => sortUser('nurse')} className='bg-blue-400 px-2 py-1 rounded-md hover:bg-blue-500'>พยาบาล {data.countUser.nurseCount} คน</button>
                <button onClick={() => sortUser('approval')} className='bg-slate-400 px-2 py-1 rounded-md hover:bg-slate-500'>รอนุมัติ {data.countUser.userCount} คน</button>
                <button onClick={All} className='bg-green-400 px-2 py-1 rounded-md hover:bg-slate-500'>ทั้งหมด {data.userlist.length} คน</button>
              </>
              : (
                Navigate('/')
              )
          }
          <SearchUser />
        </div>

        {sortData && (
          <div className=''>
            <table className="table-fixed text-center mt-4 ">
              <thead>
                <tr>
                  <th className="min-w-14 border">ลำดับ</th>
                  <th className="min-w-24 text-center border">รูปภาพ</th>
                  <th className="w-full border">ข้อมูล</th>
                  <th className="min-w-48 border">สถานะ</th>
                </tr>
              </thead>
              <tbody className="text-center ">
                {sortData.userlist && sortData.userlist.length > 0 ? (
                  sortData.userlist.map((el, index) => (
                    <tr key={el.id} className='border'>
                      <td className='border'>{index + 1}</td>
                      <td className="flex justify-center ">
                        <img src={img} className="m-4 w-16 h-20 sm:w-16 sm:h-auto rounded-md shadow-lg" alt="person" />
                      </td>
                      <td className="text-start border">
                        <p>ชื่อ: {el.firstname} {el.lastname}</p><p>อีเมล: {el.email}</p>
                      </td>
                      <td className=''>
                        {sortData.userStatus[index].isAdmin ? (
                          <div className="flex gap-2 items-center">
                            <p className="bg-lime-400 text-black p-1 sm:p-3 rounded-md shadow-md hover:drop-shadow-xl w-28 text-center">
                              Admin
                            </p>
                          </div>
                        ) : sortData.userStatus[index].isNurse ? (
                          <p className="bg-lime-400 text-black p-1 sm:p-3 rounded-md shadow-md hover:drop-shadow-xl w-28 text-center">
                            พยาบาล
                          </p>
                        ) : sortData.userStatus[index].isDoctor ? (
                          <p className="bg-lime-400 text-black p-1 sm:p-3 rounded-md shadow-md hover:drop-shadow-xl w-28 text-center">
                            หมอ
                          </p>
                        ) : (
                          <div className="flex gap-2 flex-col lg:flex-row items-center">
                            <p className="bg-slate-300 text-black p-1 sm:p-3 rounded-md shadow-md hover:drop-shadow-xl w-28 text-center">
                              รออนุมัติ
                            </p>
                          </div>
                        )}
                      </td>
                      <td>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No sortData available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Render the original data if sortData is not available */}
        {
          DataUser ? <>
            <div className=''>
              <table className="table-fixed text-center mt-4 border">
                <thead className='border'>
                  <tr className=''>
                    <th className="min-w-14 border">ลำดับ</th>
                    <th className="min-w-24 text-center border">รูปภาพ</th>
                    <th className="w-full border">ข้อมูล</th>
                    <th className="min-w-48 border">สถานะ</th>
                    <th className="min-w-48 border">action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {DataUser && DataUser.length > 0 ? (
                    DataUser.map((el, index) => (
                      <tr key={el.id} className='border'>
                        <td>{index + 1}</td>
                        <td className="flex justify-center border-x">
                          <img src={img} className="m-4 w-16 h-20 sm:w-16 sm:h-auto rounded-md shadow-lg" alt="person" />
                        </td>
                        <td className="text-start">
                          <p>ชื่อ: {el.firstname} {el.lastname}</p><p>อีเมล: {el.email}</p>
                        </td>
                        <td className='border-x '>
                          {DataUser[index].isAdmin ? (
                            <p className="bg-lime-400 text-black p-1 sm:p-3 rounded-md shadow-md hover:drop-shadow-xl w-28 text-center">
                              Admin
                            </p>
                          ) : DataUser[index].isNurse ? (
                            <p className="bg-lime-400 text-black p-1 sm:p-3 rounded-md shadow-md hover:drop-shadow-xl w-28 text-center">
                              พยาบาล
                            </p>
                          ) : DataUser[index].isDoctor ? (
                            <p className="bg-lime-400 text-black p-1 sm:p-3 rounded-md shadow-md hover:drop-shadow-xl w-28 text-center">
                              หมอ
                            </p>
                          ) : (
                            <div className="flex gap-2 flex-col lg:flex-row items-center">
                              <p className="bg-slate-300 text-black p-1 sm:p-3 rounded-md shadow-md hover:drop-shadow-xl w-28 text-center">
                                รออนุมัติ
                              </p>
                            </div>
                          )}
                        </td>
                        <td>
                          {DataUser[index].isAdmin ? (
                            ""
                          ) : DataUser[index].isNurse ? (
                            <button
                              className="bg-red-400 text-black p-1 sm:p-3 rounded-md shadow-md hover:drop-shadow-xl w-28 text-center"
                              onClick={() => confirmsure(el.id, 'cancelnurse', true)}
                            >
                              ยกเลิกสถานะ
                            </button>
                          ) : DataUser[index].isDoctor ? (
                            <button
                              className="bg-red-400 text-black p-1 sm:p-3 rounded-md shadow-md hover:drop-shadow-xl w-28 text-center"
                              // onClick={() => updateStatus(el.id, 'canceldoctor')}
                              onClick={() => confirmsure(el.id, 'canceldoctor', true)}
                            >
                              ยกเลิกสถานะ
                            </button>
                          ) : (
                            <>
                              <button
                                className="bg-purple-400 text-black p-1 sm:p-3 rounded-md shadow-md hover:drop-shadow-xl w-28 text-center"
                                onClick={() => updateStatus(el.id, 'doctor')}
                              >
                                หมอ
                              </button>
                              <button
                                className="bg-blue-400 text-black p-1 sm:p-3 rounded-md shadow-md hover:drop-shadow-xl w-28 text-center"
                                onClick={() => updateStatus(el.id, 'nurse')}
                              >
                                พยาบาล
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">ไม่พบรายชื่อ</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </> :
            (<>
              {!sortData && data.userlist && data.userlist.length > 0 ?
                <div className=''>
                  <table className="table-fixed text-center mt-4 border">
                    <thead className='border'>
                      <tr className=''>
                        <th className="min-w-14 border">ลำดับ</th>
                        <th className="min-w-24 text-center border">รูปภาพ</th>
                        <th className="w-full border">ข้อมูล</th>
                        <th className="min-w-48 border">สถานะ</th>
                        <th className="min-w-48 border">action</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {data.userlist && data.userlist.length > 0 ? (
                        data.userlist.map((el, index) => (
                          <tr key={el.id} className='border'>
                            <td>{index + 1}</td>
                            <td className="flex justify-center border-x">
                              <img src={img} className="m-4 w-16 h-20 sm:w-16 sm:h-auto rounded-md shadow-lg" alt="person" />
                            </td>
                            <td className="text-start">
                              <p>ชื่อ: {el.firstname} {el.lastname}</p><p>อีเมล: {el.email}</p>
                            </td>
                            <td className='border-x '>
                              {data.userStatus[index].isAdmin ? (
                                <p className="bg-lime-400 text-black p-1 sm:p-3 rounded-md shadow-md hover:drop-shadow-xl w-28 text-center">
                                  Admin
                                </p>
                              ) : data.userStatus[index].isNurse ? (
                                <p className="bg-lime-400 text-black p-1 sm:p-3 rounded-md shadow-md hover:drop-shadow-xl w-28 text-center">
                                  พยาบาล
                                </p>
                              ) : data.userStatus[index].isDoctor ? (
                                <p className="bg-lime-400 text-black p-1 sm:p-3 rounded-md shadow-md hover:drop-shadow-xl w-28 text-center">
                                  หมอ
                                </p>
                              ) : (
                                <div className="flex gap-2 flex-col lg:flex-row items-center">
                                  <p className="bg-slate-300 text-black p-1 sm:p-3 rounded-md shadow-md hover:drop-shadow-xl w-28 text-center">
                                    รออนุมัติ
                                  </p>
                                </div>
                              )}
                            </td>
                            <td>
                              {data.userStatus[index].isAdmin ? (
                                ""
                              ) : data.userStatus[index].isNurse ? (
                                <button
                                  className="bg-red-400 text-black p-1 sm:p-3 rounded-md shadow-md hover:drop-shadow-xl w-28 text-center"
                                  onClick={() => confirmsure(el.id, 'cancelnurse', true)}
                                >
                                  ยกเลิกสถานะ
                                </button>
                              ) : data.userStatus[index].isDoctor ? (
                                <button
                                  className="bg-red-400 text-black p-1 sm:p-3 rounded-md shadow-md hover:drop-shadow-xl w-28 text-center"
                                  // onClick={() => updateStatus(el.id, 'canceldoctor')}
                                  onClick={() => confirmsure(el.id, 'canceldoctor', true)}
                                >
                                  ยกเลิกสถานะ
                                </button>
                              ) : (
                                <>
                                  <button
                                    className="bg-purple-400 text-black p-1 sm:p-3 rounded-md shadow-md hover:drop-shadow-xl w-28 text-center"
                                    onClick={() => updateStatus(el.id, 'doctor')}
                                  >
                                    หมอ
                                  </button>
                                  <button
                                    className="bg-blue-400 text-black p-1 sm:p-3 rounded-md shadow-md hover:drop-shadow-xl w-28 text-center"
                                    onClick={() => updateStatus(el.id, 'nurse')}
                                  >
                                    พยาบาล
                                  </button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5">No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                : (
                  ""
                )}
            </>)
        }
        <Confirm isVisible={modal} onClose={() => setModal(false)} newStatus={newStatus} ></Confirm>
      </div>
    </Fragment >
  );
};

const Confirm = ({ isVisible, onClose, newStatus }) => {
  if (!isVisible) return null
  const storedUserData = JSON.parse(localStorage.getItem("user"));

  const updateStatus = async (userId, newStatus) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/admin/changeStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': `Bearer ${storedUserData.token}`
        },
        body: JSON.stringify({
          userId: userId,
          newStatus: newStatus,
        }),
      });
      const dataRes = await response.json();
      if (response.ok) {
        if (newStatus === 'doctor' || newStatus === 'nurse') {
          toast.success(dataRes.message)
        } else {
          toast.error(dataRes.message);
          onClose()
          window.location.reload();
        }
      }
      // Fetch data again after updating user status
    } catch (error) {
      console.error('Error updating user status:', error.message);
    }
  };
  return (
    <div onClick={onClose} className='fixed bg-black inset-0 bg-opacity-25 backdrop-blur-sm flex items-center justify-center' >
      <div className='bg-white px-4 py-3 rounded-md shadow-md border-2  '>
        <span onClick={onClose} className='flex justify-end text-xl cursor-pointer'>X</span>
        {
          newStatus === 'canceldoctor' ?
            <>
              <p className='text-lg mb-3'>ยกเลิกสถานะ
                <span className='text-red-500 underline'>
                  หมอ
                </span>
              </p>
            </>
            :
            <>
              <p className='text-lg mb-3'>ยกเลิกสถานะ
                <span className='text-red-500 underline'>
                  พยาบาล
                </span>
              </p>
            </>
        }
        <hr></hr>
        <p className='text-lg mb-3 mt-3'>คุณแน่ใจหรือไม่</p>
        <div className='flex flex-row'>
          <p className='text-sm mb-3 text-red-500'>
            ** ถ้าทำการยกเลิกสถานะ
            <span className='px-1 underline text-xl'>หมอ</span>
            จะทำให้ผู้ป่วยที่อยู่ในการดูแลของหมอถูกยกเลิกสถานะทั้งหมด **
          </p>
        </div>

        <hr></hr>
        <div className='flex gap-4 mt-3 justify-end'>
          <button onClick={() => updateStatus(isVisible, newStatus)} className='bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md'>ยืนยัน</button>
          <button onClick={onClose} className='bg-white-500 border-2 border-red-500 text-slate-500 hover:bg-slate-200 px-2 py-1 rounded-md'>ยกเลิก</button>
        </div>
      </div>
    </div>
  )
}


export default UserList;
