import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
  cloud_name: 'aayush-shrivastava', 
  api_key: '999711726997752', 
  api_secret: 'U7jtp8OMsOgPtz8nd4g5jREamCk',
  secure: true,
});

const uploadOnCloudinary = async (req) => {
    console.log(req.body) ; 

    try {
        const imageAlt = req.body.imageAlt;
        if (!imageAlt) return { success: false, message: "No imageAlt provided" }; 

        const localFilePath = `public/temp/${imageAlt}`; 

        // Upload the file on Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        });

        // File has been successfully uploaded
        console.log("File is uploaded on Cloudinary", response.url);

        // Delete the local file
        fs.unlinkSync(localFilePath);

        // Return additional metadata along with the URL
        return { success: true, url: response.url, public_id: response.public_id };

    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        return { success: false, message: "Error uploading image to Cloudinary" };
    }
}

export { uploadOnCloudinary };
