const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

//Registration
exports.createUser = (req, res, next) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(402).json({ errors: errors, oldData: req.body });

  User.findOne({ email: email }).then(user => {
    if (user) {
      return res.status(403).json({
        errors: {
          errors: [
            {
              param: "email",
              msg: "Email alredy in use.",
              value: email,
              location: "body",
            },
          ],
        },
      });
    } else {
      if (password !== password2) {
        return res.status(422).json({
          errors: {
            errors: [
              {
                param: "password",
                msg: "Please make sure your passwords match",
                value: password,
                location: "body",
              },
              {
                param: "password2",
                msg: "Please make sure your passwords match",
                value: password2,
                location: "body",
              },
            ],
          },
        });
      }
      return bcrypt.hash(password, 12).then(hashedPassword => {
        const user = new User({
          fullName: fullName,
          email: email,
          password: hashedPassword,
        });
        user
          .save()
          .then(response => {
            res.status(200).json(response);
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  });
};

//Login
exports.loginUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(402).json({ errors: errors, oldData: req.body });

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        res.status(401).json({
          errors: {
            errors: [
              {
                param: "email",
                msg: "User not found.",
                value: email,
                location: "body",
              },
            ],
          },
        });
      } else {
        bcrypt.compare(password, user.password).then(doMatch => {
          if (!doMatch) {
            res.status(401).json({
              errors: {
                errors: [
                  {
                    param: "password",
                    msg: "Wrong password.",
                    value: password,
                    location: "body",
                  },
                ],
              },
            });
          } else {
            const token = jwt.sign(
              {
                email: user.email,
                userId: user._id.toString(),
              },
              "superpersusecretnajtajnijistringikadaever",
              { expiresIn: "1h" }
            );
            res.status(200).json({ token: token });
          }
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};
