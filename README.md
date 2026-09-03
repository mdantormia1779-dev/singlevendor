This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## AWS S3 Product Image Upload Setup

This project uses **AWS S3** (`@aws-sdk/client-s3`) for uploading and serving product images.

### 1. Environment Configuration

Add the following environment variables to your `.env` or deployment environment:

```env
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-access-key-id"
AWS_SECRET_ACCESS_KEY="your-secret-access-key"
AWS_BUCKET_NAME="your-bucket-name"
# Optional custom CDN domain (e.g. CloudFront):
# AWS_S3_CUSTOM_DOMAIN="https://cdn.example.com"
```

### 2. S3 Bucket IAM Permissions

Ensure the IAM user associated with your `AWS_ACCESS_KEY_ID` has at least the following permissions on your S3 bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject"
      ],
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

### 3. S3 Bucket CORS Configuration

If direct client access or canvas manipulation is required, set the bucket's CORS configuration under **Permissions -> Cross-origin resource sharing (CORS)**:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"]
  }
]
```

### 4. Upload Features
- **File Type Validation**: Only JPEG, PNG, and WebP images are permitted.
- **Max File Size**: Enforces a strict limit of 5MB per image both client-side and server-side.
- **Unique Collision-Free Filenames**: Names are generated using timestamp and UUID (`crypto.randomUUID()`).
- **Progress Tracking & Preview**: Real-time upload percentage progress bar, thumbnail preview, primary image selector, and S3 URL clipboard copy.

