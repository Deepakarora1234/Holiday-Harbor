
import express from "express";
import { check, validationResult , body} from "express-validator";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel from "../models/hotel.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 100 * 1024 * 1024,
    }
});

router.post("/", verifyToken, [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("type is required"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required and must be a number"),
    body("facilities").notEmpty().isArray().withMessage("Facilities are required"),
    body("image").notEmpty().withMessage("Image is required"),
], upload.array("imageFiles", 6), async (req,res) => {
    try {
        const imageFiles = req.files;
        const newHotel = req.body;
        const imagePublicIds = [];

        const uploadPromises = imageFiles.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const uploadResult = await cloudinary.v2.uploader.upload(dataURI);
            imagePublicIds.push(uploadResult.public_id);
        });

        await Promise.all(uploadPromises);
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;

        newHotel.imageUrls = imagePublicIds.map(publicId => {
            return cloudinary.v2.url(publicId);
        });

        const hotel = new Hotel(newHotel);
        await hotel.save();
        res.status(201).send(hotel);
    } catch (e) {
        console.log("Error creating hotel: ", e);
        res.status(500).json({message: "Something went wrong"});
    }
});



export default router;
