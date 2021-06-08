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

  async spotifySearch(req, res) {
    const accessToken = req.params.accessToken;
    console.log(accessToken);
    if (!accessToken) return res.status(401).send("No access token provided");

    super.setAccessToken(accessToken);
    super
      .searchTracks(req.params.name)
      .then((data) => {
        if (data) {
          res.json(data);
        } else {
          res.status(404).json("No songs found under that name");
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
    super.resetAccessToken();
  }

  async loginWithToken(req, res) {
    let accessToken = req.params.accessToken;
    const result = await Token.findOne({
      accessToken: accessToken,
    });

    if (!result) return res.status(400).send("Invalid Token");

    super.setAccessToken(accessToken);
    super.setRefreshToken(result.refreshToken);

    super
      .refreshAccessToken()
      .then(async (data) => {
        console.log("The access token has been refreshed!");

        // Save the access token so that it's used in future calls
        await Token.findOneAndUpdate(
          { accessToken: req.params.accessToken },
          {
            accessToken: data.body["access_token"],
          }
        );
        res.json({ accessToken: data.body["access_token"] });
      })
      .catch((err) => {
        console.log("Could not refresh access token", err);
      });

    super.resetAccessToken();
    super.resetRefreshToken();
  }
}

module.exports = SpotifyClass;
