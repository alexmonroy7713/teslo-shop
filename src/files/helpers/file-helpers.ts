export const  fileFilter =( req:Express.Request,file:Express.Multer.File,cb:Function) =>{
    if (!file) {
        return cb(new Error('No file uploaded'),false)

         const fileEptension = file.mimetype.split("/") [1];
         const validarExtension = ["jpg","jpeg","png","gif"]
         if (!validarExtension.includes(fileEptension)) {
            return cb (null,true)
         }
         return cb(null,true)
          
                
        
    }

}