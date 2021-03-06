var router = require("express").Router();
const User = require("../models/User");
const app = require("../app");
const { exists } = require("../models/User");

router.get("/", (req, res, next) => {
  User.findOne(req.user)
    .then((user) => {
      res.status(200).json({ moods: user.registeredMoods });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/", (req, res, next) => {
  const { mood, amOrPm } = req.body;
  time = new Date();
  const currentUser = req.user;
  User.findOne(req.user).then((user) => {
    let existsAlready = false;
    if (user.registeredMoods.length !== 0) {
      console.log(user.registeredMoods.length);

      for (let thisMood of user.registeredMoods) {
        console.log(thisMood);
        if (
          compareDate(new Date(), thisMood.time) &&
          amOrPm === thisMood.amOrPm
        ) {
          existsAlready = true;
        }
      }
    }
    if (existsAlready) {
      return res.json({
        message: String(
          `you have already submitted your mood for ${
            amOrPm === "AM" ? "this morning" : "this afternoon/evening"
          }`
        ),
      });
    } else {
      User.findByIdAndUpdate(currentUser, {
        $push: { registeredMoods: { mood, time, amOrPm } },
      })
        .then((updatedUser) => {
          res.status(200).json({ message: "mood submitted" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

const compareDate = (firstDate, secondDate) => {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
};

module.exports = router;
