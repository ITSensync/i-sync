import stuffService from '../services/stuff.service.js';

async function getAllStuff(req, res, next) {
  try {
    const stuffResult = await stuffService.getAll();
    res.status(stuffResult.statusCode).send(stuffResult);
  } catch (error) {
    next(error)
  }
}

async function getStuffById(req, res, next) {
  try {
    const stuffResult = await stuffService.getById(req.params.id)
    res.status(stuffResult.statusCode).send(stuffResult);
  } catch (error) {
    next(error)
  }
}

async function createStuff(req, res, next) {
  try {
    const stuffResult = await stuffService.create(req.body)
    res.status(stuffResult.statusCode).send(stuffResult)
  } catch {
    next(error)
  }
}

async function updateStuff(req, res, next) {
  try {
    const stuffResult = await stuffService.update(req.params.id, req.body)
    res.status(stuffResult.statusCode).send(stuffResult)
  } catch (error) {
    next(error)
  }
}

async function deleteStuff(req, res, next) {
  try {
    const result = await stuffService.remove(req.params.id)
    res.status(result.statusCode).send(result)
  } catch (error) {
    next(error)
  }
}

export default {
  getAllStuff,
  getStuffById,
  createStuff,
  updateStuff,
  deleteStuff
}