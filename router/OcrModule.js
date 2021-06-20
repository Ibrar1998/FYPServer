const express = require('express');
const { createWorker ,PSM, OEM } =require('tesseract.js');
const router = express.Router();

const multer=require('multer');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});

const upload=multer({storage:storage});


router.post('/upload',upload.single('uploadedImage'),(req,res)=>{

    console.log(req.file);
    const path= './uploads/'+req.file.originalname;
    console.log(path);
  
  
    const worker = createWorker({
        logger: m => console.log(m)
      });
       
      (async () => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');  
        await worker.setParameters({
            tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVXYZ0123456789-',
            tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
            tessedit_pageseg_mode: PSM.SPARSE_TEXT,

            
          });          //+req.file.filename
        const { data: { text } } = await worker.recognize(path);
        res.send(text);
        console.log(text)
        
        await worker.terminate();
      })();  
}); 

router.post('/manual',(req,res)=>{
      console.log(req.body);
      res.send(200);
})

module.exports=router;