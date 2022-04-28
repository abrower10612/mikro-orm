import { Router } from 'express';
import { create, readOne } from '../controllers/book';

const router = Router();

router.post('/create', create);
router.get('/read-one', readOne);

export = router;
