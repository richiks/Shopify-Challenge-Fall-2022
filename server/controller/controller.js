var Footweardb = require("../model/model");

// create and save new item
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  // new item
  const item = new Footweardb({
    name: req.body.name,
    vendor: req.body.vendor,
    size: req.body.size,
    color: req.body.color,
    price: req.body.price,
  });

  // save item in the database
  item
    .save(item)
    .then((data) => {
      //res.send(data);
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while performing a create operation",
      });
    });
};
// retrieve and return all items or a single item
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Footweardb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: `Cannot find item with id ${id}!` });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: `Error encountered in retrieving item with id ${id}!`,
        });
      });
  } else {
    Footweardb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error occurred while retrieving item information",
        });
      });
  }
};
// update a new item by user id
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Data update fields cannot be empty" });
    return;
  }

  const id = req.params.id;
  Footweardb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot update item with id ${id}!` });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error encountered in updating item information" });
    });
};

// delete a user with specified user id
exports.delete = (req, res) => {
  const id = req.params.id;
  Footweardb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot delete item with ${id}!` });
      } else {
        res.send({ message: "Item was deleted successfully!" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: `Error encountered in deleting item with id ${id}` });
    });
};
