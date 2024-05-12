import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { asyncHandler } from './asyncHandler.js';

cloudinary.config({ 
  cloud_name: 'aayush-shrivastava', 
  api_key: '999711726997752', 
  api_secret: 'U7jtp8OMsOgPtz8nd4g5jREamCk',
  secure: true,
});

const uploadOnCloudinary = asyncHandler(async (req,res) => {
    try {
        const imageAlt = req.body.imageAlt;
        if (!imageAlt) return { success: false, message: "No imageAlt provided" }; 

        const localFilePath = `backend/public/temp/${imageAlt}`; 

        // Upload the file on Cloudinary
        const data = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        });

        // File has been successfully uploaded
        console.log("File is uploaded on Cloudinary");

        // Delete the local file
        fs.unlinkSync(localFilePath);

        res.status(201).json({
            success: true,
            url: data.url,
            public_id: data.public_id 
            
        })
        

    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        res.status(400).json({
            success: false,
            message:error.message

        })
    }
});

export { uploadOnCloudinary };
