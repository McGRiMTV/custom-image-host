# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Released]

## [[1.0.1](https://github.com/McGRiMTV/sharex-uploader/releases/tag/v1.0.1)] - 2026-04-07

### Changed
- Upgrade dependencies: Express 5.2.1, Multer 2.1.1, @aws-sdk/client-s3 3.1026.0
- Update to ShareX 19.0.2
- Fixed README badges

## [[1.0.0](https://github.com/McGRiMTV/sharex-uploader/releases/tag/v1.0.0)] - 2026-03-28

### Added
- Cloudflare R2 Storage Pipeline: Images are piped directly to R2 using the AWS SDK, providing permanent, high-availability storage routed through a custom domain.
- In-Memory Processing: Uploads are held entirely in RAM using multer.memoryStorage(), eliminating local disk I/O bottlenecks and making it perfectly suited for ephemeral deployment platforms.
- ShareX Native Integration: Full support for ShareX custom uploaders, including multipart form data parsing and secure header authentication.
- Railway Ready: Built specifically to be deployed on Railway with zero configuration, utilizing dynamic environment variables for port mapping and secret management.
