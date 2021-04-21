
const path = require('path');


exports.validateFile = (file)=> {
    allowedFileTypes = /jpeg|jpg|png|gif/;
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedFileTypes.test(file.mimetype);
    if (extension && mimeType) {
        return true /*cb(null, true)*/;
    } else {
        throw new Error("Invalid file type. Only JPEG, PNG and GIF file are allowed.")
    }
}

