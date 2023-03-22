const router = require("express").Router();
const UserSchema = require("../models/User");
const OfferSchema = require("../models/Offer.js");
const InstructionsSchema = require("../models/Instructions");

router.post("/user/save", async (req, res) => {
  console.log(req.body);
  if (req.body?.email) {
    let user = await UserSchema.findOne({ email: req.body.email });
    if (!user) {
      const newUser = new UserSchema({
        email: req.body.email,
        picture: req.body.picture,
        email_verified: req.body.email_verified,
        full_name: req.body.full_name,
        role: req.body.role,
      });
      newUser.save().then((user) => {
        return res.status(200).json(user);
      });
    } else {
      await UserSchema.findOneAndUpdate(
        { email: req.body.email },
        {
          picture: req.body.picture,
          email_verified: req.body.email_verified,
          full_name: req.body.full_name,
          role: req.body.role,
        },
        { new: true }
      ).then((user) => {
        return res.status(200).json(user);
      });
    }
  } else {
    return res.status(400).json({ msg: "No email id" });
  }
});

router.get("/testing", async (req, res) => {
  return res.status(400).json({ msg: "Server is up and running" });
});

router.post("/user/profit/:emailId", async (req, res) => {
  UserSchema.findOneAndUpdate(
    { email: req.params.emailId },
    {
      $push: {
        profit_tracker: req.body,
      },
    },
    { new: true }
  )
    .then((profit) => {
      console.log("DONE", profit);
      return res.status(200).json(profit);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json(err);
    });
});

router.get("/user/profits/:emailId", async (req, res) => {
  UserSchema.findOne({ email: req.params.emailId })
    .select("profit_tracker")
    .then((profit) => {
      return res.status(200).json(profit);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json(err);
    });
});

router.delete("/user/profit/:emailId/:profitId", async (req, res) => {
  UserSchema.findOneAndUpdate(
    { email: req.params.emailId },
    {
      $pull: {
        profit_tracker: {
          _id: req.params.profitId,
        },
      },
    }
  )
    .then((response) => {
      console.log(response);
      return res.status(200).json({ msg: "Deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json(err);
    });
});

// router.put("/user/profit/:id/:profitId", async (req, res) => {
//   UserSchema.update(
//     { _id: req.params.id, "profit_tracker._id": req.params.profitId },
//     {
//       $set: {
//         profit_tracker: req.body,
//       },
//     },
//     {
//       upsert: true,
//       runValidators: true,
//     }
//   )
//     .then((response) => {
//       console.log(response);
//       return res.status(200).json({ msg: "Updated successfully" });
//     })
//     .catch((err) => {
//       console.log(err);
//       return res.status(400).json(err);
//     });
// });

router.get("/offers/:type", (req, res) => {
  OfferSchema.find({ type: req.params.type })
    .sort("order")
    .then((offers) => {
      return res.status(200).json(offers);
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json(err);
    });
});

router.get("/check/:email", async (req, res) => {
  console.log("CHECK", req.params.email);
  let user = await UserSchema.findOne({ email: req.params.email });

  if (!user) {
    return res.status(404).json({ msg: "No user found" });
  } else {
    return res.status(200).json({ user: user });
  }
});

router.get("/instructions/:type", (req, res) => {
  InstructionsSchema.find({ type: req.params.type })
    .sort("order")
    .then((instructions) => {
      return res.status(200).json(instructions);
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json(err);
    });
});

router.post("/premium/purchase/:userId", (req, res) => {
  UserSchema.findByIdAndUpdate(
    req.params.userId,
    {
      premium: {
        transaction_hash: req.body.transactionHash,
        bought_at: Date.now(),
      },
      role: "premium",
    },
    { new: true }
  )
    .then((newUser) => {
      console.log(newUser)
      return res.status(200).json(newUser);
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json(err);
    });
});

router.post("/premium/end/:userId", (req, res) => {
  UserSchema.findByIdAndUpdate(
    req.params.userId,
    {
      premium: {},
      role: "authenticated",
    },
    { new: true }
  )
    .then((newUser) => {
      return res.status(200).json(newUser);
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json(err);
    });
});


router.get("/instruction/details/:id", (req, res) => {
  InstructionsSchema.findById(req.params.id)
    .then((instruction) => {
      return res.status(200).json(instruction);
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json(err);
    });
});

router.get("/offer/details/:id", (req, res) => {
  OfferSchema.findById(req.params.id)
    .then((offer) => {
      return res.status(200).json(offer);
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json(err);
    });
});

module.exports = router;
