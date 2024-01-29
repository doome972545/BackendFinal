const connection = require('../config/db')

module.exports = {
    AddEvent: (req, res) => {
        let id = req.params.id
        const data = req.body
        connection.query('INSERT INTO `calendar_doc`(`doctor_id`, `description`, `startDate`, `endDate`) VALUES (?,?,?,?)',
            [id, data.description, data.startDate, data.endDate], (err, result) => {
                if (err) return res.status(500).json(err)
                res.status(200).json({ message: "success message" })
            })
    },
    getEvent: (req, res) => {
        let id = req.params.id
        connection.query("SELECT * FROM `calendar_doc` WHERE doctor_id = ?",
            [id], (err, result) => {
                if (err) return res.status(500).json(err)
                res.status(200).json(result)
            })
    }
}