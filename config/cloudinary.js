const cloudinary = require('cloudinary')
// const dotenv = require('dotenv')
// dotenv.config()
require('dotenv').config({path: './config/.env'});

cloudinary.config({
   cloud_name: process.env.CLOUD_NAME, 
   api_key: process.env.CLOUDINARY_API_KEY, 
   api_secret: process.env.CLOUDINARY_API_SECRET
})

// const uploads = (file, folder) => {
exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.url,
                // id: result.public_id,
                // id: result
                id: result.original_filename,
            })
        }, {
            resource_type: "auto",
            folder:folder,
            use_filename: true,
            unique_filename: false,
        })
    })
}

// module.exports = uploads;