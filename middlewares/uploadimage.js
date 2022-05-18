const multer = require('multer');

module.exports = (
    multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'public/upload/carros')
        },
        filename: (req, file, cb) => {          
          cb(null, Date.now().toString() + '_' + file.originalname)
        }
    }),
    fileFilter: (req, file, cb) => {
        const extensaoImg = ['image/png', 'image/jpg','image/jpeg', 'image/bmp', 'image/webp'].find
        // const extensaoImg = ['foto1/png', 'foto1/jpg','foto1/jpeg', 'foto1/bmp', 'foto1/webp'].find
          (formatoAceito => formatoAceito == file.mimetype);

        if (extensaoImg){
            return cb(null, true);
        }

        return cb(null, false);                            
        // return cb({message:'Formato não suportado'}, false);
    },
    // upload: multer({
    //   storage:storage,
    //   limits:{ fileSize: 1024*1024 },
    //   fileFilter: fileFilter,
    // })
}));