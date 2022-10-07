const CLIENT_ID = "800d269073764880a14d2efe37ffa2b4";
//The Redirect URI you want to add would be the URI you want to go to after the user has signed in.
const REDIRECT_URI =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/"
<<<<<<< HEAD
    : "https://jmrc1995.github.io/goodsoup/";    // This URI will work for production (same as spotify dashboard)
=======
    : "https://jmrc1995.github.io/goodsoup/";   
// This URI will work for production (same as spotify dashboard)
const AUTH_ENDPOINT = "http://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

const scopes = [
  "user-top-read",
  "user-read-private",
  "user-read-recently-played",
];

export const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(
  "%20"
)}&response_type=${RESPONSE_TYPE}&show_dialog=true`;

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};
