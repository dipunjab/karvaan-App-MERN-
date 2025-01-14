import { v2 as cloudinary } from "cloudinary";
import { error } from "console";
import fs from "fs"
//fs is availble with node


//cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SERCRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has been uploaded successfully
        // console.log("File is uploaded on Cloudinary: ", response.url);
        
        fs.unlinkSync(localFilePath) //remove the locally save temporary file 
        return response

    } catch (error) {
        fs.unlinkSync(localFilePath) //remove the locally save temporary file as the upload operation got failed
        return null;
    }
}

const deleteFromCloudinary = async (publicId) => {
    try {
        if (!publicId) return null;

        const response = await cloudinary.uploader.destroy(publicId);
        if (response.result !== "ok") {
            console.log("Failed to delete file from Cloudinary:", response);
            return null;
        }
        return response;
    } catch (error) {
        console.error("Failed to delete file from Cloudinary:", error.message);
        return null;
    }
};


export {
    uploadOnCloudinary,
    deleteFromCloudinary
}
