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

const uploadOnCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        if (!buffer) {
            return reject('No file buffer provided');
        }

        // Upload the file directly from the buffer
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload failed:", error);
                    reject("Cloudinary upload failed");
                } else {
                    resolve(result);
                }
            }
        );

        // Pipe the buffer to the upload stream
        stream.end(buffer);
    });
};

//since we dont have no localfole as we will be dealing with buffer
// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null;

//         //upload the file on cloudinary
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto"
//         })
//         //file has been uploaded successfully
//         // console.log("File is uploaded on Cloudinary: ", response.url);
        
//         return response

//     } catch (error) {
//         return null;
//     }
// }

const deleteFromCloudinary = async (publicId, type) => {
    try {
        if (!publicId) return null;

        const response = await cloudinary.uploader.destroy(publicId, {
            resource_type: type ? type : "image"
        });
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
