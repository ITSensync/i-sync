import { Router } from 'express';

import box from './box.js';
import stuff from './stuff.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/boxes', box);
router.use('/stuff', stuff);

export default router;
