import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../../context/Mycontext';
import { FaSearch } from "react-icons/fa";

const SearchMypatient = () => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const [search, setSearch] = useState('');
    const { setDataMyPatient } = useContext(MyContext)
    const handleSubmit = async (e) => {
        if (isNaN(search)) {
            e.preventDefault();
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/admin/mypatient/${storedUserData.user.id}/?name=${search}`, {
                method: 'GET',
            });
            const dataRes = await fetchData.json();
            setDataMyPatient(dataRes);
        } else {
            e.preventDefault();
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/admin/mypatient/${storedUserData.user.id}/?idCard=${search}`, {
                method: 'GET',
            });
            const dataRes = await fetchData.json();
            setDataMyPatient(dataRes);
        }
    }




    return (
        <div >
            <form onSubmit={handleSubmit} className="flex gap-1 w-[30rem] rounded bg-white">
                <input
                    type="search"
                    className="w-full border bg-transparent px-4 -py-1 text-gray-900  focus:outline-none  rounded-md"
                    placeholder="ค้นหารายชื่อ หรือ เลขบัตรประชาชน"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                >
                </input>
                <button
                    className={`rounded px-4 py-2 font-semibold text-gray-100 ${search ? 'bg-purple-500' : 'bg-gray-500 cursor-not-allowed'
                        }`}
                    disabled={!search && setDataMyPatient('')}
                >
                    <FaSearch />
                </button>
            </form>
        </div>
    )
}

export default SearchMypatient