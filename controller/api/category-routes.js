const router = require('express').Router();
const Category = require('../../models/Category');

// Get all Categories
router.get('/', (req, res) => {
    Category.findAll({})
    .then(dbCategory => res.json(dbCategory))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get a Category by ID 
router.get('/:id', (req, res) => {
    Category.findOne({
        where: {
            id: req.params.id
        }
    })
      .then(dbCategory => {
          if (!dbCategory) {
              res.status(404).json({ message: 'No Category found with this id'});
              return;
          } else {
              res.json(dbCategory);
          }
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// Create a Category
router.post('/', (req, res) => {
    Category.create({
        name: req.body.name, 
    })
      .then(dbCategory => res.json(dbCategory))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// Delete a Category
router.delete('/:id', (req, res) => {
    Category.destroy({
        where: {
            id: req.params.id
        }
    })
      .then(dbCategory => {
          if (!dbCategory) {
              res.status(404).json({ message: 'No Category found with this id'});
          } else {
              res.json(dbCategory);
          }
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});




module.exports = router;