let baseUrl;
let room = process.env.NEXT_PUBLIC_ROOM;

if (room === "dev") {
  baseUrl = process.env.NEXT_PUBLIC_DEV_BASE_URL;
} else if (room === "prod") {
  baseUrl = process.env.NEXT_PUBLIC_PROD_BASE_URL;
} else if (room === "staging") {
  baseUrl = process.env.NEXT_PUBLIC_STAGING_BASE_URL;
}

export default baseUrl;
