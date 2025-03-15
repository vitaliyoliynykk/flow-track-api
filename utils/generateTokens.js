const jwt = require("jsonwebtoken");

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign({ id: userId }, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

const generateNewAccessToken = (refreshToken) => {
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
  return jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = { generateTokens, generateNewAccessToken };
