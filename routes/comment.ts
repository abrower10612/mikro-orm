import { Router } from 'express';
import { create } from '../controllers/comment';

const router = Router();

router.post('/create', create);

export = router;