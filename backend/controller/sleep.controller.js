const connection = require('../config/db')

module.exports = {
    saveSleepTime: (req, res) => {
        const time = req.body.sleep_time
        const id = req.params.id
        try {
            connection.query('INSERT INTO `sleep_data`(`id`, `sleep_time`) VALUES (?,?)',
                [id, time], (err, result) => {
                    if (err) {
                        console.log(err)
                        return
                    }
                    res.status(200).send(result)
                }
            )
        } catch (e) {
            res.status(500).send(e)
        }
    }
}