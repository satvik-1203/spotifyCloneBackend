const SpotifyWebApi = require("spotify-web-api-node");
const Token = require("../schema/refreshToken");

const credentials = {
  clientId: "0e098488165c416b8f3451c972feee06",
  clientSecret: "689ce50f2eef4ca4bc6450d19e3e1a1d",
  redirectUri: "http://localhost:3000",
};

class SpotifyClass extends SpotifyWebApi {
  constructor() {
    super(credentials);
  }

  async login(req, res) {
    try {
      const code = req.body.code;

      const result = await super.authorizationCodeGrant(code);

      const tokenData = {
        tokenExpire: result.body["expires_in"],
        tokenAccess: result.body["access_token"],
        refreshToken: result.body["refresh_token"],
      };
      const token = new Token({
        accessToken: result.body["access_token"],
        refreshToken: result.body["refresh_token"],
      });
      try {
        await token.save();
        console.log(result.body);
        res.send(tokenData);
      } catch (err) {
        res.status(400).send("Already exist");
      }
    } catch (err) {
      res.status(401).send("Error from the backend");
    }
  }

  async getUserInfo(req, res) {
    super.setAccessToken(req.params.accessToken);

    super
      .getMe()
      .then((data) => {
        res.json(data.body);
      })
      .catch((err) => {
        console.log("Something went wrong");
        res.status(500).send("Something went wrong");
      });

    super.resetAccessToken();
  }

  async search(req, res) {
    const accessToke = req.params.accessToken;

    if (!accessToke) return res.status(401).send("No access token provided");

    super.setAccessToken();
    super
      .searchTracks(req.params.name)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(401).send("Server failed");
      });

    super.resetAccessToken();
  }
}

module.exports = SpotifyClass;
