import multer from 'multer';
import crypto from 'crypto';

const MIME_TO_EXT: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
};

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const ext = MIME_TO_EXT[file.mimetype];
        cb(null, `avatar-${crypto.randomUUID()}${ext}`);
    },
});

export const uploadAvatar = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (Object.prototype.hasOwnProperty.call(MIME_TO_EXT, file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Format non supporté'));
        }
    },
});
