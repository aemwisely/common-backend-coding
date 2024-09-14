export default () => ({
  driver: process.env.MINIO_DRIVER,
  url: process.env.MINIO_URL,
  port: parseInt(process.env.MINIO_PORT, 10),
  ssl: process.env.MINIO_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
  bucket: process.env.MINIO_BUCKET,
});
