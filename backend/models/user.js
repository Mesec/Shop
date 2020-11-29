const mongoose = require("mongoose");
const Product = require("./product");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (req, res) {
  const token = req.body.Authorization.split(" ")[1];
  const decodedToken = jwt.verify(
    token,
    "superpersusecretnajtajnijistringikadaever"
  );
  const userId = decodedToken.userId;
  const productId = req.body.cartData.productId;
  const quantity = req.body.cartData.quantity;

  User.findById(userId)
    .then((user) => {
      if (user.cart.items.length > 0) {
        let cartIndex;
        let productExists = user.cart.items.filter((item, index) => {
          cartIndex = index;
          return item.productId.toString() === productId;
        });

        if (productExists.length > 0) {
          user.cart.items[cartIndex].quantity += quantity;
          user
            .save()
            .then((result) => {
              res.status(200).json(result);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          user.cart.items.push({ productId, quantity });
          user
            .save()
            .then((result) => {
              res.status(200).json(result);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        user.cart.items.push({ productId, quantity });
        user
          .save()
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
