/**
 * UPLOAD MIDDLEWARE
 *
 * This middleware handles file uploads using Multer for multipart/form-data requests.
 * Configured for seamless integration with Cloudinary for image storage.
 *
 * Key Features:
 * - Handles multiple file uploads (room images, profile pictures)
 * - Uses disk storage for temporary file handling
 * - Integrates with Cloudinary upload workflow
 * - Supports various image formats for hotel and room photos
 *
 * Usage:
 * - Apply to routes that need file upload capability
 * - Typically used with room creation and hotel registration
 *
 * Dependencies:
 * - Multer: For handling multipart/form-data and file uploads
 * - Works in conjunction with Cloudinary for permanent storage
 */

import multer from "multer";

/**
 * MULTER STORAGE CONFIGURATION
 *
 * Configures disk storage for temporary file handling before Cloudinary upload.
 * Uses default settings which store files in the system temp directory.
 * Files are automatically cleaned up after Cloudinary processing.
 */
const storage = multer.diskStorage({});

/**
 * UPLOAD MIDDLEWARE INSTANCE
 *
 * Creates a multer instance with disk storage configuration.
 * This middleware parses multipart/form-data and makes uploaded files
 * available in req.files for further processing.
 *
 * @type {Function} Multer middleware function
 * @usage router.post('/upload', upload.array('images'), handler)
 */
const upload = multer({ storage });

export default upload;
