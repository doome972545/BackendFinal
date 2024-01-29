const connection = require('../config/db')

module.exports = {
    readUser: (req, res) => {
        try {
            connection.query("SELECT * FROM id_card_information", (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send(err)
                }
                res.status(200).send(result)
            })
        } catch (e) {
            res.status(500).send({ massage: "couldn't read" })
        }
    },


    readUserId: (req, res) => {
        try {
            const id = req.params.id
            connection.query('SELECT * FROM `id_card_information` WHERE id = ?', [id], (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(400).send(err)
                }
                res.status(200).send(result)
            })
        } catch (err) {
            res.status(500).send({ massage: "couldn't read", err })
        }
    },

    myrecommend: (req, res) => {
        let data = req.body
        let id = req.params.id
        try {
            connection.query('INSERT INTO `recommend`(`patient_id`, `commend`) VALUES (?,?)',
                [id,data.commend], (err, result) => {
                    if(err) res.status(400).send(err)
                    res.status(200).json({message:"เพิ่มคำแนะนำเรียบร้อยแล้ว"})
                })
        } catch (e) {
            res.status(500).json(e)
        }
    },

    listCommend:(req, res) => {
        let id = req.params.id
        try{
            connection.query('SELECT *, TIME(created_at) AS recommend_time FROM recommend WHERE `patient_id` = ? ORDER BY created_at DESC',
            [id],(err, result) => {
                if(err) res.status(400).send(err)
                res.status(200).json(result)
            })
        }catch(e){
            res.status(500).json(e)
        }
    }

}
