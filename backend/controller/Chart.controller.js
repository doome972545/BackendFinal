const connection = require('../config/db')

module.exports = {
    getUserChart: (req, res) => {
        const query = 'SELECT * FROM doctor_and_admin_table ';
        connection.query(query, (err, results) => {
            if (err) {
                console.error('ไม่สามารถดึงข้อมูลจาก MySQL: ', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            const transformedData = transformData(results);
            res.json(transformedData);
        });
    },
    getUserChartLine: (req, res) => {
        const yearFilter = req.query.year;
        const query = 'SELECT * FROM doctor_and_admin_table';

        connection.query(query, (err, results) => {
            if (err) {
                console.error('ไม่สามารถดึงข้อมูลจาก MySQL: ', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            // แปลงข้อมูลเป็นรูปแบบที่ต้องการ
            const transformedData = transformDataLine(results, yearFilter);
            res.json(transformedData);
        });
    },
    getPatientChartLine: (req, res) => {
        const yearFilter = req.query.year;
        const query = 'SELECT * FROM id_card_information';

        connection.query(query, (err, results) => {
            if (err) {
                console.error('ไม่สามารถดึงข้อมูลจาก MySQL: ', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            // แปลงข้อมูลเป็นรูปแบบที่ต้องการ
            const transformedData = transformPatientLine(results, yearFilter);
            res.json(transformedData);
        });
    },
    getBarChartFemalemale: (req, res) => {
        const query = 'SELECT gender, COUNT(*) AS count FROM id_card_information GROUP BY gender';

        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query: ', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            const genderDistribution = results.map((row) => {
                const genderKey = row.gender.toLowerCase();
                return {
                    gender: row.gender,
                    [genderKey]: row.count,
                };
            });

            res.json(genderDistribution);
        });
    }

}

function transformData(data) {
    const result = [];
    const groupedData = {};

    data.forEach((row) => {
        const userType = row.isDoctor ? 'หมอ' : row.isNurse ? 'พยาบาล' : (row.isDoctor === 0 && row.isNurse === 0 && row.isAdmin === 0) ? 'รออนุมัติ' : 'อื่นๆ';

        if (groupedData[userType]) {
            groupedData[userType].value += 1;
        } else {
            groupedData[userType] = { id: userType, label: userType, value: 1 };
        }
    });

    for (const key in groupedData) {
        if (groupedData.hasOwnProperty(key)) {
            result.push(groupedData[key]);
        }
    }
    let results = data.length
    return { result, results };
}

function transformDataLine(data, targetYear) {
    const result = [];
    const groupedData = {};
    const selectedYear = targetYear || new Date().getFullYear(); // ถ้าไม่มี targetYear ให้ใช้ปีปัจจุบัน

    // สร้างวันที่เริ่มต้นของปี
    const startDate = new Date(selectedYear, 0, 1);
    // วันที่สิ้นสุดของปี
    const endDate = new Date(selectedYear, 11, 31);

    // สร้าง array ที่เก็บชื่อเดือน
    const monthNames = Array.from({ length: 12 }, (_, i) => {
        const tempDate = new Date(selectedYear, i, 1);
        return tempDate.toLocaleString('th-TH', { month: 'long' });
    });

    data.forEach((row) => {
        const userType = row.isDoctor ? 'หมอ' : row.isNurse ? 'พยาบาล' : 'อื่น ๆ';
        const createdAt = new Date(row.created_at);

        if (createdAt >= startDate && createdAt <= endDate) {
            const monthIndex = createdAt.getMonth();
            const createdAtKey = monthNames[monthIndex];

            if (groupedData[userType]) {
                const existingMonthIndex = groupedData[userType].data.findIndex(item => item.x === createdAtKey);

                if (existingMonthIndex !== -1) {
                    groupedData[userType].data[existingMonthIndex].y += 1;
                } else {
                    groupedData[userType].data.push({ x: createdAtKey, y: 1 });
                }
            } else {
                groupedData[userType] = { id: userType, data: [{ x: createdAtKey, y: 1 }] };
            }
        }
    });

    // เพิ่มข้อมูลเดือนที่ไม่มีข้อมูล
    for (const key in groupedData) {
        if (groupedData.hasOwnProperty(key)) {
            const missingMonths = monthNames.filter(month => !groupedData[key].data.some(item => item.x === month));
            missingMonths.forEach(missingMonth => {
                groupedData[key].data.push({ x: missingMonth, y: 0 });
            });

            // เรียงลำดับข้อมูลตามเดือน
            groupedData[key].data.sort((a, b) => monthNames.indexOf(a.x) - monthNames.indexOf(b.x));

            result.push(groupedData[key]);
        }
    }

    return result;
}

function transformPatientLine(data, targetYear) {
    const result = [];
    const groupedData = {};
    const selectedYear = targetYear || new Date().getFullYear(); // ถ้าไม่มี targetYear ให้ใช้ปีปัจจุบัน

    // สร้างวันที่เริ่มต้นของปี
    const startDate = new Date(selectedYear, 0, 1);
    // วันที่สิ้นสุดของปี
    const endDate = new Date(selectedYear, 11, 31);

    // สร้าง array ที่เก็บชื่อเดือน
    const monthNames = Array.from({ length: 12 }, (_, i) => {
        const tempDate = new Date(selectedYear, i, 1);
        return tempDate.toLocaleString('th-TH', { month: 'long' });
    });

    data.forEach((row) => {
        const userType = 'ผู้ป่วย';
        const createdAt = new Date(row.created_at);

        if (createdAt >= startDate && createdAt <= endDate) {
            const monthIndex = createdAt.getMonth();
            const createdAtKey = monthNames[monthIndex];

            if (groupedData[userType]) {
                const existingMonthIndex = groupedData[userType].data.findIndex(item => item.x === createdAtKey);

                if (existingMonthIndex !== -1) {
                    groupedData[userType].data[existingMonthIndex].y += 1;
                } else {
                    groupedData[userType].data.push({ x: createdAtKey, y: 1 });
                }
            } else {
                groupedData[userType] = { id: userType, data: [{ x: createdAtKey, y: 1 }] };
            }
        }
    });

    // เพิ่มข้อมูลเดือนที่ไม่มีข้อมูล
    for (const key in groupedData) {
        if (groupedData.hasOwnProperty(key)) {
            const missingMonths = monthNames.filter(month => !groupedData[key].data.some(item => item.x === month));
            missingMonths.forEach(missingMonth => {
                groupedData[key].data.push({ x: missingMonth, y: 0 });
            });

            // เรียงลำดับข้อมูลตามเดือน
            groupedData[key].data.sort((a, b) => monthNames.indexOf(a.x) - monthNames.indexOf(b.x));

            result.push(groupedData[key]);
        }
    }

    return result;
}
