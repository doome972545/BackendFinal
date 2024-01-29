const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../frontend/public/image");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, 'upload-' + uniqueSuffix + "-" + file.originalname);
    },
});
exports.upload = multer({ storage: storage }).single('image')
