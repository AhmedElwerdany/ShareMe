const router = require("express").Router();
const User = require("../models/user.model");


// Create a User
router.post("/", (req, res) => {

  const newuser = new User(
    Object.assign(req.body, { lovers: 0, likers: 0, smilers: 0 })
  );

  newuser
    .save()
    .then(() => res.json("user add!"))
    .catch(error => res.json(error));

});


// Delete an individual User
router.delete("/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(data => res.send(data))
    .then(() => console.log("user deleted"));
});

router.post("/update", (req, res) => {
  const { id, react, count } = req.body;

  User.updateOne(
    { _id: id },
    { $inc: { [count]: react[0] === "u" ? -1 : 1 } }
  ).then(data => {
    res.json(data);
  });
});



// user/

router.get("/count/:type", (req, res) => {
  if (req.params.type === "all")
    User.estimatedDocumentCount().then(count => res.json({ count }));
  else
    User.countDocuments({ socialMedia: req.params.type }).then(count =>
      res.json({ count })
    );
});

  const social = ["whatsapp", "twitter", "snapchat"];

  
router.get("/:type/:skip", (req, res) => {
  const type = social.includes(req.params.type)
    ? { socialMedia: req.params.type }
    : null;

  (social.includes(req.params.type) || req.params.type === "all") &&
    User.find(type)
      .sort({ createdAt: -1 })
      .skip(Number(req.params.skip))
      .limit(9)
      .then(data => res.json(data))
      .catch(error => res.json(error));
});



module.exports = router;
