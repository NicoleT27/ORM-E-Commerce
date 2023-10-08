const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include:[
      {
        model: Product,
        through:ProductTag,
      },
    ],
  })
  .then((tags) => res.json(tags));
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  }).then((tag) => {
    res.json(tag);
  });
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  
    Tag.create(req.body).then((tag) => res.status(200).json(tag));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((tag) => res.status(200).json(tag));
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  }).then((tag) => res.status(200).json(tag));
  // delete on tag by its `id` value
});

module.exports = router;
