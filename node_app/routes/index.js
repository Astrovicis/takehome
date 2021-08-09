const express = require('express')
const router = express.Router()

const queries = require('../db/queries')

/* GET all addresses. */
router.get('/addresses', async (req, res, next) => {
  try {
    // This is awful validation. With more time, I would use Joi.
    console.log(req.query.keyword)
    let addresses = await queries.getMatching({keyword: req.query.keyword} || '')
    res.status(200).json(addresses)
  } catch (error) {
    next(error)
  }
})

/* GET address by id */
router.get('/addresses/:id', async (req, res, next) => {
  try {
    let address = await queries.getByID(req.params.id)
    res.status(200).json(address)
  } catch (error) {
    next(error)
  }
})

/* POST new address (create) */
router.post('/addresses', async (req, res, next) => {
  try {
    // zero validation: very bad.
    let addressID = await queries.add(req.body)
    let address = await queries.getByID(addressID)
    res.status(200).json(address)
  } catch (error) {
    next(error)
  }
})

/* PUT existing address (update) */
router.put('/addresses/:id', async (req, res, next) => {
  // terrible validation
  if (req.body.id !== undefined) {
    return res.status(422).json({
      error: 'You cannot update the id field',
    })
  }
  try {
    await queries.update(req.params.id, req.body)
    let address = await queries.getByID(req.params.id)
    res.status(200).json(address)
  } catch (error) {
    next(error)
  }
})

/* DELETE address */
router.delete('/addresses/:id', async (req, res, next) => {
  try {
    let address = await queries.getByID(req.params.id)
    await queries.deleteItem(req.params.id)
    res.status(200).json(address)
  } catch (error) {
    next(error)
  }
})

module.exports = router
