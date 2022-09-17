const express = require('express');
const router = express.Router();
const boats = require('../services/boats');

/* GET boats. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await boats.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting boats `, err.message);
    next(err);
  }
});

/* POST boats */
router.post('/', async function(req, res, next) {
  try {
    res.json(await boats.create(req.body));
  } catch (err) {
    console.error(`Error while creating boats`, err.message);
    next(err);
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    res.json(await boats.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating Boats`, err.message);
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await boats.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting Boats`, err.message);
    next(err);
  }
});


module.exports = router;
