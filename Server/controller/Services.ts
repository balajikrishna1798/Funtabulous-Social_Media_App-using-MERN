import multer from "multer";

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads')
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, Date.now() + "-" + file.originalname);
    }
});

var upload = multer({
    storage:storage,
    limits:{fileSize:10000000},
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
          
        } else {
          cb(null, false);
       
          return cb('Only .png, .jpg and .jpeg format allowed!');
        }
    }
})

export default upload