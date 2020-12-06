const jwt = require("jsonwebtoken");

exports.isUserAuthenticated = (req, res, next) => {
  console.log("something");
  const token = req.body.Authorization.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(
      token,
      "superpersusecretnajtajnijistringikadaever"
    );
  } catch (error) {
    console.log(error);
  }
  if (!decodedToken) {
    return res.status(401).json({ isUserAuthenticated: false });
  } else {
    next();
  }
  //   next();
};
