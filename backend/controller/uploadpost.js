const connection = require('../config/db')
const fs = require('fs');


module.exports = {
    uploadPost: (req, res) => {
        const text = req.body;
        const imagePath = req.file.filename;
        try {
            connection.query('INSERT INTO `post`(`title`, `desc`, `image`) VALUES (?,?,?)',
                [text.title, text.desc, imagePath], (err, result) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json(err)
                    }
                    res.status(200).json({ message: 'เพิ่มรูปภาพเรียบร้อยแล้ว' });
                })
        } catch (e) {
            res.status(500).json({ message: "Err upload", e })
        }
    },

    showPost: (req, res) => {
        try {
            connection.query('SELECT * FROM `post`', (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json(err)
                }
                res.status(200).json(result)
            })
        } catch (e) {
            res.status(500).json({ message: "show post error!!" })
        }
    },

    removePost: (req, res) => {
        const id = req.params.id;
        console.log(id)
        try {
            connection.query('SELECT * FROM `post` WHERE id = ?', [id], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: "Error fetching post data", error: err });
                } else {
                    const imageName = result[0].image
                    connection.query('DELETE FROM `post` WHERE id = ?',
                        [id], async (err, result) => {
                            if (err) {
                                console.log(err);
                                res.status(500).json({ message: "error remove!!!", err })
                            }
                            await fs.unlink('../frontend/public/image/' + imageName, (err) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    res.status(200).json("deleted successfully!!")
                                }
                            }
                            )
                        }
                    )
                }
            })
        } catch (e) {
            res.status(500).json({ message: "error remove post", e })
        }
    },

    editPost: (req, res) => {
        const id = req.params.id;
        const data = req.body
        const imagePath = req.file.filename;
        try {
            connection.query('SELECT image FROM `post` WHERE id = ?',
                [id], async (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ message: "Error fetching post data", error: err });
                    } else {
                        const oldimage = result[0].image
                        await fs.unlink('../frontend/public/image/' + oldimage, (err) => {
                            if (err) {
                                console.log(err)
                            }
                            connection.query('UPDATE `post` SET `title`=?,`desc`=?,`image`=? WHERE id = ?',
                                [data.title, data.desc, imagePath, id], (err, result) => {
                                    if (err) {
                                        console.log(err)
                                        res.status(500).json({ message: "Error fetching post data", err })
                                    }
                                    res.status(200).json({ message: "แก้ไขโพสต์เรียบร้อย" })
                                })
                        })
                    }
                })
        } catch (e) {
            res.status(500).json({ message: "error remove post", e })
        }
    },


}
