const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then((tag) => {
      res.json(tag);
    })
    .catch((error) => {
      console.log(error);
    });
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
  }).catch((error) => {    
    console.log(error);
  })
  // find a single tag by its `id`
  // be sure to include its associated Product data
});


router.post("/", async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch (error) {
    console.log(error);
  }
});


router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
     }).then((tag) => {
    res.status(200).json(tag);
  }).catch((error) => {    
    console.log(error);
  })
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  }).then((tag) => {
  res.status(200).json(tag);
   }).catch((error) => {    
    console.log(error);
  })
  // delete on tag by its `id` value
});

module.exports = router;
