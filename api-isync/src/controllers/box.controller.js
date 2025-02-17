import boxService from '../services/box.service.js';

async function getAllBox(req, res, next) {
  try {
    const boxResult = await boxService.getAll();
    res.status(boxResult.statusCode).send(boxResult);
  } catch (error) {
    next(error)
  }
}

async function getBoxById(req, res, next) {
  try {
    const boxResult = await boxService.getById(req.params.id)
    res.status(boxResult.statusCode).send(boxResult);
  } catch (error) {
    next(error)
  }
}

async function getBoxByIdAndPopulate(req, res, next) {
  try {
    const boxResult = await boxService.getByIdWithPopulate(req.params.id)
    res.status(boxResult.statusCode).send(boxResult);
  } catch (error) {
    next(error)
  }
}

async function createBox(req, res, next) {
  try {
    const boxResult = await boxService.create(req.body)
    res.status(boxResult.statusCode).send(boxResult)
  } catch {
    next(error)
  }
}

async function updateBox(req, res, next) {
  try {
    const boxResult = await boxService.update(req.params.id, req.body)
    res.status(boxResult.statusCode).send(boxResult)
  } catch (error) {
    next(error)
  }
}

async function deleteBox(req, res, next) {
  try {
    const result = await boxService.remove(req.params.id)
    res.status(result.statusCode).send(result)
  } catch (error) {
    next(error)
  }
}

export default {
  getAllBox,
  getBoxByIdAndPopulate,
  getBoxById,
  createBox,
  updateBox,
  deleteBox
}