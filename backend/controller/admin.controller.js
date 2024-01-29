const connection = require('../config/db')
const jwt = require('jsonwebtoken');

module.exports = {
    loginAdmin: (req, res) => {
        const user = req.body;
        try {
            connection.query('SELECT * FROM Doctor_And_admin_Table WHERE email=? AND password = ?', [user.email, user.password], (err, result, field) => {
                if (err) {
                    res.status(400).send({ message: "Error login" });
                }
                if (!result.length > 0) {
                    res.status(404).send({ message: "Email or Password is wrong" });
                } else {
                    const token = jwt.sign({
                        id: result[0].id,
                        isAdmin: result[0].isAdmin,
                        isDoctor: result[0].isDoctor,
                        isNurse: result[0].isNurse
                    },
                        process.env.JWT_SEC, { expiresIn: "21d" });
                    res.status(200).json({ message: "login successfully!!", user: result[0], token });

                }
            });
        } catch (e) {
            res.status(500).send({ message: "Login error" });
        }
    },

    getDoctorAdminNurse: (req, res) => {
        try {
            connection.query('SELECT * FROM Doctor_And_admin_Table ORDER BY  `isAdmin`DESC ',
                (err, resultDoctor) => {
                    if (err) {
                        console.log(err)
                    }
                    return userlist = resultDoctor
                })
            connection.query('SELECT COUNT(CASE WHEN isAdmin = 1 THEN 1 END) AS adminCount, COUNT(CASE WHEN isDoctor = 1 THEN 1 END) AS doctorCount, COUNT(CASE WHEN isNurse = 1 THEN 1 END) AS nurseCount, COUNT(CASE WHEN isNurse = 0 AND isDoctor = 0 AND NOT isAdmin =1 THEN 1 END) AS userCount FROM Doctor_And_admin_Table',
                (err, result) => {
                    return countUser = result[0]
                })
            connection.query('SELECT `isAdmin`, `isDoctor`,`isNurse` FROM Doctor_And_admin_Table  ORDER BY  `isAdmin`DESC ',
                (err, resultNurse) => {
                    if (err) console.log(err)
                    const userStatus = resultNurse
                    res.status(200).json({ countUser, userStatus, userlist })
                })
        } catch (e) {
            res.status(500).json(e)
        }
    },

    changStatus: (req, res) => {
        const data = req.body
        try {
            if (data.newStatus === 'doctor') {
                connection.query('UPDATE `Doctor_And_admin_Table` SET `isDoctor`= ? WHERE id = ?',
                    [1, data.userId], (err, result) => {
                        if (err) console.log(err)
                        res.status(200).json({ message: "เปลี่ยนสถานะเป็น หมอ เรียบร้อยแล้ว!!" })
                    })
            } else if (data.newStatus === 'nurse') {
                connection.query('UPDATE `Doctor_And_admin_Table` SET `isNurse`= ? WHERE id = ?',
                    [1, data.userId], (err, result) => {
                        if (err) console.log(err)
                        res.status(200).json({ message: "เปลี่ยนสถานะเป็น พยาบาล เรียบร้อยแล้ว!!" })
                    })
            } else if (data.newStatus === 'canceldoctor') {
                connection.query('UPDATE `Doctor_And_admin_Table` SET `isDoctor`= ? WHERE id = ?',
                    [0, data.userId], (err, updateResult) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({ error: 'Error updating doctor status' });
                        }
                        connection.query('SELECT `patient_id` FROM `added_patient_to_doctor` WHERE doctor_id = ?',
                            [data.userId], (err, selectResult) => {
                                if (err) {
                                    console.log(err);
                                    return res.status(500).json({ error: 'Error selecting patient IDs' });
                                }
                                const patientIds = selectResult.map(row => row.patient_id);
                                connection.query('DELETE FROM `added_patient_to_doctor` WHERE doctor_id = ?',
                                    [data.userId], (err, deleteResult) => {
                                        if (err) {
                                            console.log(err);
                                            return res.status(500).json({ error: 'Error deleting from added_patient_to_doctor' });
                                        }
                                        if (patientIds.length > 0) {
                                            connection.query('UPDATE id_card_information SET added = ? WHERE id IN (?)',
                                                [0, patientIds], (err, updatePatientsResult) => {
                                                    if (err) {
                                                        console.log(err);
                                                        return res.status(500).json({ error: 'Error updating patient records' });
                                                    }
                                                    res.status(200).json({ message: "ยกเลิกการเป็น หมอ" });
                                                });
                                        } else {
                                            res.status(200).json({ message: "ยกเลิกการเป็น หมอ" });

                                        }
                                    });
                            });
                    });

            } else if (data.newStatus === 'cancelnurse') {
                connection.query('UPDATE `Doctor_And_admin_Table` SET `isNurse`= ? WHERE id = ?',
                    [0, data.userId], (err, result) => {
                        if (err) console.log(err)
                        res.status(200).json({ message: "ยกเลิกการเป็น พยาบาล" })
                    })
            }
        } catch (e) {
            res.status(500).json(e)
        }
    },

    sortUser: async (req, res) => {
        const sort = req.body;

        try {
            let query;
            let status;
            if (sort.sort === 'admin') {
                query = 'SELECT * FROM Doctor_And_admin_Table WHERE isAdmin = 1';
                status = 'SELECT `isAdmin` FROM Doctor_And_admin_Table WHERE isAdmin = 1'
            } else if (sort.sort === 'doctor') {
                query = 'SELECT * FROM Doctor_And_admin_Table WHERE isDoctor = 1';
                status = 'SELECT `isDoctor` FROM Doctor_And_admin_Table WHERE isDoctor = 1'
            } else if (sort.sort === 'nurse') {
                query = 'SELECT * FROM Doctor_And_admin_Table WHERE isNurse = 1';
                status = 'SELECT `isNurse` FROM Doctor_And_admin_Table WHERE isNurse = 1'
            } else if (sort.sort === 'approval') {
                query = 'SELECT * FROM Doctor_And_admin_Table WHERE isDoctor = 0 AND isAdmin = 0 AND isNurse = 0';
                status = 'SELECT `isAdmin`, `isDoctor`,`isNurse` FROM Doctor_And_admin_Table WHERE isNurse = 0 AND isAdmin = 0 AND isDoctor = 0'
            }

            const countUserPromise = new Promise((resolve, reject) => {
                connection.query('SELECT COUNT(CASE WHEN isAdmin = 1 THEN 1 END) AS adminCount, COUNT(CASE WHEN isDoctor = 1 THEN 1 END) AS doctorCount, COUNT(CASE WHEN isNurse = 1 THEN 1 END) AS nurseCount, COUNT(CASE WHEN isNurse = 0 AND isDoctor = 0 AND NOT isAdmin =1 THEN 1 END) AS userCount FROM Doctor_And_admin_Table', (err, result) => {
                    if (err) reject(err);
                    resolve(result[0]);
                });
            });

            const userStatusPromise = new Promise((resolve, reject) => {
                connection.query(status, (err, resultNurse) => {
                    if (err) reject(err);
                    resolve(resultNurse);
                });
            });

            const userlistPromise = new Promise((resolve, reject) => {
                connection.query(query, (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });

            const [countUser, userStatus, userlist] = await Promise.all([countUserPromise, userStatusPromise, userlistPromise]);
            res.status(200).json({ countUser, userStatus, userlist });
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    selectDoctor: (req, res) => {
        try {
            connection.query('SELECT id , firstname , lastname FROM Doctor_And_admin_Table WHERE isDoctor = 1 ',
                (err, result) => {
                    if (err) res.status(500).json({ error: 'Internal server error' });
                    res.status(200).json(result)
                })
        } catch (e) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    mypatient: (req, res) => {
        let id = req.params.id
        let name = req.query.name
        let idCard = req.query.idCard
        try {
            if (name) {
                connection.query('SELECT patient_id FROM  `added_patient_to_doctor` WHERE doctor_id = ?',
                    [id], (err, result) => {
                        const patientIds = result.map(row => row.patient_id);
                        if (patientIds.length === 0) {
                            res.status(404).json({ message: 'No Patients Found' });
                            return;
                        }
                        connection.query(`SELECT * FROM id_card_information WHERE id IN (${patientIds.join(',')}) AND first_name LIKE ?`,
                            [`%${name}%`], (err, result) => {
                                if (err) {
                                    console.error(err);
                                    res.status(500).send('Internal Server Error');
                                    return;
                                }
                                res.status(200).json(result);
                            })
                    })
            } else if (idCard) {
                connection.query('SELECT patient_id FROM  `added_patient_to_doctor` WHERE doctor_id = ?',
                    [id], (err, result) => {
                        const patientIds = result.map(row => row.patient_id);
                        if (patientIds.length === 0) {
                            res.status(404).json({ message: 'No Patients Found' });
                            return;
                        }
                        connection.query(`SELECT * FROM id_card_information WHERE id IN (${patientIds.join(',')}) AND id_number LIKE ?`,
                            [`%${idCard}%`], (err, result) => {
                                if (err) {
                                    console.error(err);
                                    res.status(500).send('Internal Server Error');
                                    return;
                                }
                                res.status(200).json(result);
                            })
                    })
            } else {
                connection.query('SELECT patient_id FROM  `added_patient_to_doctor` WHERE doctor_id = ?',
                    [id], (err, result) => {
                        const patientIds = result.map(row => row.patient_id);
                        if (patientIds.length === 0) {
                            res.status(404).json({ message: 'No Patients Found' });
                            return;
                        }
                        connection.query(`SELECT * FROM id_card_information WHERE id IN (${patientIds.join(',')})`,
                            (err, result) => {
                                if (err) {
                                    console.error(err);
                                    res.status(500).send('Internal Server Error');
                                    return;
                                }
                                res.status(200).json(result);
                            })
                    })
            }

        } catch (e) {
            console.error(e);
            res.status(500).send('Internal Server Error');
        }
    },

    getById: (req, res) => {
        let id = req.params.id;
        try {
            connection.query(`SELECT * FROM Doctor_And_admin_Table WHERE id = ?`,
                [id], (err, result) => {
                    if (err) res.status(500).send('Internal Server Error');
                    res.status(200).json(result);
                })
        } catch (e) {
            res.status(500).json(e)
        }
    },

    searchUser: (req, res) => {
        let name = req.query.name
        try {
            connection.query(`SELECT * FROM doctor_and_admin_table WHERE firstname LIKE ? `,
                [`%${name}%`], (err, result) => {
                    if (err) res.status(500).json(err)
                    res.status(200).json(result)
                })
        } catch (e) {
            res.send("not found")
        }
    },
    searchPatient: (req, res) => {
        let name = req.query.name
        let idCard = req.query.idCard
        try {
            if (name) {
                connection.query(`SELECT * FROM id_card_information WHERE first_name LIKE ? `,
                    [`%${name}%`], (err, result) => {
                        if (err) res.status(500).json(err)
                        res.status(200).json(result)
                    })
            } else {
                connection.query(`SELECT * FROM id_card_information WHERE id_number LIKE ? `,
                    [`%${idCard}%`], (err, result) => {
                        if (err) res.status(500).json(err)
                        res.status(200).json(result)
                    })
            }
        } catch (e) {
            res.send("not found")
        }
    },

}
