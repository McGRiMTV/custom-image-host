<h1 align="center">McGRiM's ShareX Uploader</h1>
<p align="center"><strong>A lightweight open source project made using Javascript to integrate Cloudflare R2 Buckets and Railway with ShareX to upload images and share using your custom domain.</strong></p>
<br>
<p align="center">
  <a href="https://www.javascript.com/">
    <img src="https://forthebadge.com/images/badges/made-with-javascript.svg" alt="Made with JavaScript">
  </a>
  <br>
  <br>
  <img src="https://img.shields.io/badge/node.js-v22.15.0-339933?logo=node.js&logoColor=white&style=flat" alt="Node.js v22.15.0">
  <img src="https://img.shields.io/badge/deployed%20on-Railway-0B0D0E?logo=railway&logoColor=white&style=flat" alt="Deployed on Railway">
  <img src="https://img.shields.io/badge/storage-Cloudflare%20R2-F38020?logo=cloudflare&logoColor=white&style=flat" alt="Cloudflare R2">
  <br>
  <br>
  <img src="https://img.shields.io/badge/express-v4.18.2-000000?logo=express&logoColor=white&style=flat" alt="express v4.18.2">
  <img src="https://img.shields.io/badge/multer-v1.4.5--lts.1-CB3837?logo=npm&logoColor=white&style=flat" alt="multer v1.4.5-lts.1">
  <img src="https://img.shields.io/badge/@aws--sdk%2Fclient--s3-v3.535.0-569A31?logo=amazons3&logoColor=white&style=flat" alt="@aws-sdk/client-s3 v3.535.0">
  <br>
  <br>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-0298c3.svg?logo=opensourceinitiative&logoColor=white&style=flat" alt="License: MIT">
  </a>
</p>
<br>
<br>

## Getting Started

### Architecture
* **Frontend/Client:** ShareX v18.0.1 (Windows)
* **Backend API:** Node.js / Express (Hosted on Railway)
* **Storage:** Cloudflare R2
* **Domain:** Your custom domain `e.g., image.website.com` (Routed through Cloudflare)

#### 1. Cloudflare R2 Setup
1. Create a new bucket in Cloudflare R2. **Dashboard > Storage & databases > R2 Object Storage > Create bucket**
2. Under the bucket's **Settings > Custom Domains**, connect your custom domain.
3. On your *R2 Object Storage* page, note your `Account ID`
4. Remaining on the page from step 3, generate a User API Token with **Object Read & Write** permissions. Select *Apply to specific buckets only*. **Create User API Token** 
5. Save the `Access Key ID` and `Secret Access Key`.

#### 2. Railway Deployment
1. Fork or clone this repository and deploy it via the [Railway dashboard](https://railway.com/dashboard).
2. In your Railway Project Settings, navigate to the **Variables** tab.
3. Add the following environment variables:

| Variable | Value Description |
| :--- | :--- |
| `PUBLIC_URL` | Your custom domain. |
| `SECRET_KEY` | Your secure password for ShareX authentication ([Generate a Secret](https://api.madebyatlas.dev/password?length=40)). |
| `R2_ACCOUNT_ID` | Your Cloudflare Account ID. |
| `R2_ACCESS_KEY_ID` | Your R2 API Token Access Key. |
| `R2_SECRET_ACCESS_KEY` | Your R2 API Token Secret. |
| `R2_BUCKET_NAME` | The exact name of your R2 bucket. |

*Note: Railway will automatically install the necessary NPM dependencies during the build phase.*

#### 3. ShareX Configuration
Import the following JSON into your ShareX Custom Uploader Settings. Ensure you replace `YOUR_SECRET_KEY_HERE` with your actual environment variable, and update the `RequestURL` to match your active Railway deployment URL (**Project > Settings > Networking > Public > Generate Domain**).

```json
{
  "Version": "18.0.1",
  "Name": "McGRiM.dev ShareX Uploader",
  "DestinationType": "ImageUploader, TextUploader, FileUploader",
  "RequestMethod": "POST",
  "RequestURL": "[https://YOUR-RAILWAY-APP-URL.up.railway.app/upload](https://YOUR-RAILWAY-APP-URL.up.railway.app/upload)",
  "Headers": {
    "Authorization": "YOUR_SECRET_KEY_HERE"
  },
  "Body": "MultipartFormData",
  "FileFormName": "image",
  "URL": "{json:url}"
}
```

## Change Log
[View Change Log](CHANGELOG.md)

## Support
For support regarding this repository please join the [Atlas Development Discord Server](https://discord.gg/atlasdev)
### Bug Reporting
Please join the Discord server linked above and submit a bug via the `#bugs` forum.

## License
This project is licensed under the MIT License. This is a permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.

The license is viewable [here](LICENSE).

## Authors
**McGRiM** | [Website](https://mcgrim.dev) | [GitHub](https://github.com/McGRiMTV)

**Atlas Development** | [Website](https://madebyatlas.dev) | [GitHub](https://github.com/madebyatlas) | [Discord](https://discord.gg/atlasdev) | [Terms of Use](https://madebyatlas.dev/terms) | [Privacy Policy](https://madebyatlas.dev/privacy)

Copyright (c) 2026, 
McGRiM / Atlas Development
All rights reserved.