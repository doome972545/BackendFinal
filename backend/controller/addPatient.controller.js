const connection = require('../config/db')


module.exports = {
    added: (req, res) => {
        const patient_id = req.body.patient_id;
        const doctor_id = req.body.doctor_id;
        try {
            connection.query('SELECT * FROM `added_patient_to_doctor` WHERE patient_id = ?',
                [patient_id], (err, result) => {
                    if (err) return res.status(500).json(err)
                    if (result.length > 0) {
                        return res.status(200).json({ message: "ผู้ป่วยถูกเพิ่มไปแล้ว" })
                    }
                    connection.query('INSERT INTO `added_patient_to_doctor`(`doctor_id`, `patient_id`) VALUES (?,?)',
                        [doctor_id, patient_id], (err, result) => {
                            if (err) return res.status(500).json(err)
                            connection.query('UPDATE `id_card_information` SET `added` = ? WHERE `id` = ?',
                                [1, patient_id], (err, result) => {
                                    if (err) return res.status(500).json(err)
                                    res.status(200).json({ message: "เพิ่มผู้ป่วยเรียบร้อยแล้ว" })
                                })
                        })
                })
        } catch (err) {
            res.status(500).json({ message: "err to added patient", err })
        }
    },

    cancelPatient: (req, res) => {
        const patient_id = req.params.id;
        // console.log(req.body)
        try {
            connection.query('SELECT  `id` FROM `added_patient_to_doctor` WHERE patient_id = ?;',
                [patient_id], (err, results) => {
                    if (err) res.status(500).json(err)
                    connection.query('DELETE FROM `added_patient_to_doctor` WHERE id = ?',
                        [results[0].id], (err, results) => {
                            if (err) res.status(500).json(err)
                            connection.query('UPDATE `id_card_information` SET `added` = ? WHERE `id` = ?',
                                [0, patient_id], (err, result) => {
                                    if (err) return res.status(500).json(err)
                                    res.status(200).json({ message: "ทำการยกเลิกผู้ป่วยแล้ว" })
                                })
                        })
                })
        } catch (e) {
            res.status(500).json({ message: "error cancel patient", err })
        }
    },
}
