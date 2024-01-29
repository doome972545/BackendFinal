const connection = require("../config/db");
const moment = require('moment');

module.exports = {
    // สร้างตาราง Telemed โดยเช็ควันที่ก่อนว่ามีการบัทึกใหม ถ้ามี ก็อัพเดทข้อมูลที่อยู่ในวันนั้น
    createTelemed: (req, res) => {
        try {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const day = String(currentDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            const data = req.body;
            const user_id = req.params.id;
            console.log(formattedDate)
            connection.query(
                //เช็ควันที่วันมีในข้อมูลใหม
                'SELECT * FROM `health_data` WHERE id = ? AND DATE(record_date) = ?',
                [user_id, formattedDate],
                (err, result) => {
                    if (err) {
                        // Handle the error
                        console.error(err);
                        return res.status(500).send("Internal Server Error");
                    }
                    //ถ้ามีให้ทำการ อัพเดทข้อมูล
                    if (result.length > 0) {
                        connection.query('UPDATE `health_data` SET `blood_pressure` = ?, `blood_sugar` = ?, `blood_oxygen` = ?, `temperature` = ? WHERE `health_data`.`health_id` = ?',
                            [
                                data.blood_pressure || result[0].blood_pressure,
                                data.blood_sugar || result[0].blood_sugar,
                                data.blood_oxygen || result[0].blood_oxygen,
                                data.temperature || result[0].temperature,
                                result[0].health_id
                            ], (err, r) => {
                                res.status(200).json("update")
                            }
                        )
                    } else {
                        // If no record found for the specified user_id and date_save, send "not found"
                        connection.query(
                            "INSERT INTO `health_data`(`id`, `blood_pressure`, `blood_sugar`, `blood_oxygen`, `temperature`) VALUES (?,?,?,?,?)",
                            [
                                user_id,
                                data.blood_pressure ? data.blood_pressure : "",
                                data.blood_sugar ? data.blood_sugar : "",
                                data.blood_oxygen ? data.blood_oxygen : "",
                                data.temperature ? data.temperature : "",
                            ],
                            (err, result) => {
                                if (err) {
                                    console.log(err);
                                    return res.status(400).send(err);
                                }
                                res.status(200).send({ message: "Telemed successfully" });
                            }
                        );
                    }
                }
            );
        } catch (e) {
            res.status(500).send(e);
        }
    },

    getTelemed: (req, res) => {
        try {
            const user_id = req.params.id;
            connection.query('SELECT * FROM `health_data` WHERE id = ? ORDER BY record_date DESC',
                [user_id],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        req.status(400).send(err);
                    }

                    // Convert dates to a specific format using moment
                    const formattedResult = result.map(item => ({
                        ...item,
                        record_date: moment(item.record_date).format('YYYY-MM-D')
                    }));

                    res.status(200).send(formattedResult);
                }
            );
        } catch (e) {
            res.status(500).send(e);
        }
    },

    date :(req, res) => {
        const data = req.params
        try{
            connection.query('SELECT * FROM `health_data` WHERE id = ? AND record_date = ?',
            [data.id,data.date],(err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                }
                const formattedResult = result.map(item => ({
                    ...item,
                    record_date: moment(item.record_date).format('YYYY-MM-DD')
                }));
                res.status(200).send(formattedResult);
            })
        }catch(e){
            res.status(500).send(e);
        }
    }
};
