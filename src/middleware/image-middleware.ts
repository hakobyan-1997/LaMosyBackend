import * as multer from 'multer';
import * as moment from 'moment';

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './uploads')
    },
    filename(req, file, cb) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS');
        cb(null, `${date}-${file.originalname}`)
    }
});


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
};

const limits = {
    fileSize: 1024 * 1024 * 3 //3 megabayt
};

const mult = multer({storage, fileFilter, limits,});
export { mult }
