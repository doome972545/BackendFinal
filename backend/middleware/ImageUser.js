const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../frontend/public/user");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, 'User-' + uniqueSuffix + "-" + file.originalname);
    },
});
exports.UploadUser = multer({ storage: storage }).single('image')
