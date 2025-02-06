//the problem faced was we can not store it on diskstorage if we are in production so here i found the memory storage

import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
    storage
});











// import multer from "multer"

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/temp')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// })

// export const upload = multer({
//     storage
// })