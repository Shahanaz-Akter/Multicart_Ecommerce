
// Multer configuration
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/front_assets/new_img/");
    },
    filename: function (req, file, cb) {
        let filename = file.originalname.trim(); //first and last space remove
        filename = filename.replace(/\s+/g, ''); //middle space remove
        const name = Date.now() + "_" + filename;
        cb(null, name);
    },
});



const upload = multer({ storage: storage });

module.exports = upload;
