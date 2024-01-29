import React, { useContext, useState } from 'react'
import MyContext from '../../context/Mycontext';
import { FaSearch } from 'react-icons/fa';

const SearchUser = () => {
    const [search, setSearch] = useState('');
    const {setDataUser }= useContext(MyContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/admin/search?name=${search}`, {
            method: 'GET',

        });
        const dataRes = await fetchData.json();
        setDataUser(dataRes)
    }

    return (
        <div >
                <form onSubmit={handleSubmit} className="flex gap-1 w-[30rem] rounded bg-white">
                    <input
                        type="search"
                        className="w-full border bg-transparent px-4 -py-1 text-gray-900  focus:outline-none  rounded-md"
                        placeholder="ค้นหารายชื่อ . . ."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    >
                    </input>
                    <button
                        className={`rounded px-4 py-2 font-semibold text-gray-100 ${search ? 'bg-purple-500' : 'bg-gray-500 cursor-not-allowed'
                            }`}
                        disabled={!search&&setDataUser('')}
                    >
                        <FaSearch/>
                    </button>
                </form>
        </div>
    )
}

export default SearchUser