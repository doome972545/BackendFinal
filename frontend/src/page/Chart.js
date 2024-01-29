import React, { useEffect, useState } from 'react'
import LineChart from '../components/charts/LineChart'
import CircleChart from '../components/charts/circle'
import BarChart from '../components/charts/BarChart'
import LineChartPatient from '../components/charts/LineChartPatient'

const Chart = () => {

    const [data, setData] = useState()
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const ChartUserCircle = async () => {
        try {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/chart`, {
                method: 'GET',
                headers: {
                    'token': `Bearer ${storedUserData.token}`,
                },
            });

            if (!fetchData.ok) {
                throw new Error('not found data');
            }

            const dataRes = await fetchData.json();
            setData(dataRes)
        } catch (error) {
            console.error('Error:', error.message);
        }
    };
    ChartUserCircle();
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [chartUser, setRule] = useState();
    useEffect(() => {
        const ChartUserLine = async () => {
            try {
                const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/chart/line/?year=${selectedYear}`, {
                    method: 'GET',
                    headers: {
                        'token': `Bearer ${storedUserData.token}`,
                    },
                });

                if (!fetchData.ok) {
                    throw new Error('not found data');
                }

                const dataRes = await fetchData.json();
                setRule(dataRes)
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        ChartUserLine();
    }, [selectedYear]);
    const handleYearChange = (year) => {
        setSelectedYear(year);
    };




    const handleYearChangePatient = (year) => {
        setSelectedYearPatient(year);
    };
    const [selectedYearPatient, setSelectedYearPatient] = useState(new Date().getFullYear());
    const [chartUserPatient, setPatient] = useState();

    useEffect(() => {
        const ChartUserLine = async () => {
            try {
                const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/chart/patient/?year=${selectedYearPatient}`, {
                    method: 'GET',
                    headers: {
                        'token': `Bearer ${storedUserData.token}`,
                    },
                });

                if (!fetchData.ok) {
                    throw new Error('not found data');
                }

                const dataRes = await fetchData.json();
                setPatient(dataRes)
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        ChartUserLine();
    }, [selectedYearPatient]);

    const [DataBar, setDataBar] = useState()
    const ChartUserLine = async () => {
        try {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/chart/malefemale`, {
                method: 'GET',
                headers: {
                    'token': `Bearer ${storedUserData.token}`,
                },
            });

            if (!fetchData.ok) {
                throw new Error('not found data');
            }

            const dataRes = await fetchData.json();
            setDataBar(dataRes)
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    ChartUserLine();

    return (
        <div className='px-4'>
            <div className='flex gap-2 mb-4'>
                <div className='h-[300px] w-[500px] border rounded-md shadow-md '>
                    <p className='text-center mt-1 text-lg font-semibold'>จำนวนบุคลากรทั้งหมด {data ? data.results : ""} คน</p>
                    {
                        data ?
                            <CircleChart data={data.result} />
                            : "no data"
                    }
                </div>
                <div className='h-[300px] w-96 border rounded-md shadow-md '>
                    <p className='text-center mt-1 text-lg font-semibold'>จำนวนผู้ป่วย ชาย หญิง</p>
                    {
                        DataBar ?
                            <BarChart data={DataBar} />
                            : "no data"
                    }
                </div>
                <div className='border rounded-md shadow-md'>
                    <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    </div>
                </div>
            </div>
            <div className='h-[400px] w-full border rounded-md shadow-md mb-4'>
                <div className='flex justify-center pt-1'>
                    <h1 className='text-lg font-semibold'>จำนวนบุคลากรแต่ละเดือนในปี <YearPicker selectedYear={selectedYear} onChange={handleYearChange} /></h1>
                </div>
                {
                    chartUser ?
                        <LineChart data={chartUser} year={selectedYear} />
                        : "ไม่มีข้อมูลในปีนี้"
                }
            </div>
            <div className='h-[400px] w-full border rounded-md shadow-md '>
                <div className='flex justify-center pt-1'>
                    <h1 className='text-lg font-semibold'>จำนวนผู้ป่วยแต่ละเดือนในปี <YearPicker selectedYear={selectedYearPatient} onChange={handleYearChangePatient} /></h1>
                </div>
                {
                    chartUserPatient ?
                        <LineChartPatient data={chartUserPatient} year={selectedYearPatient} />
                        : "ไม่มีข้อมูลในปีนี้"
                }
            </div>

        </div>
    )
}

export default Chart

const YearPicker = ({ selectedYear, onChange }) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, index) => currentYear - index);

    return (
        <select value={selectedYear} onChange={(e) => onChange(Number(e.target.value))}>
            {years.map((year) => (
                <option key={year} value={year}>
                    {year}
                </option>
            ))}
        </select>
    );
};