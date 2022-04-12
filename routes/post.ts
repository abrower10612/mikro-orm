import { Router } from 'express';
import { create, deleteOne, readAll, readOne, updateOne } from '../controllers/post';

const router = Router();

router
  .post('/create', create)
  .get('/read-all', readAll)
  .get('/read-one', readOne)
  .put('/update-one', updateOne)
  .delete('/delete-one/:id', deleteOne)


export = router;