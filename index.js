const express = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const app = express();
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const VERSION = "v1.0.0";

const PUBLIC_URL_BASE = process.env.PUBLIC_URL; 

const s3 = new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
});

const upload = multer({ storage: multer.memoryStorage() });

const authenticate = (req, res, next) => {
    if (req.headers.authorization === SECRET_KEY) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

app.get('/', (req, res) => {
  res.send(`McGRiM's ShareX Uploader | Operational - Running on ${VERSION}`);
});

app.post('/upload', authenticate, upload.single('image'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const randomName = crypto.randomBytes(6).toString('hex');
    const ext = path.extname(req.file.originalname) || '.png';
    const filename = `${randomName}${ext}`;

    try {
        const command = new PutObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: filename,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        });

        await s3.send(command);

        const fileUrl = `${PUBLIC_URL_BASE}/${filename}`;
        res.json({ url: fileUrl });
        
    } catch (error) {
        console.error('Upload Error:', error);
        res.status(500).json({ error: 'Failed to upload image to R2' });
    }
});

app.listen(PORT, () => console.log(`McGRiM's ShareX Uploader running on port ${PORT}`));
