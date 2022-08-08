const CLIENT_ID = "800d269073764880a14d2efe37ffa2b4";
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "http://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

const scopes = ["user-top-read", "user-read-private","user-read-recently-played"];

export const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(
  "%20"
)}&response_type=${RESPONSE_TYPE}&show_dialog=true`;





