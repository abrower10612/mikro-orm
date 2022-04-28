import express from 'express';
import {
  CommentsRoutes,
  PostsRoutes,
  AuthorsRoutes,
  BooksRoutes,
} from './routes';

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.use('/posts', PostsRoutes);
app.use('/comments', CommentsRoutes);
app.use('/authors', AuthorsRoutes);
app.use('/books', BooksRoutes);

app.listen(port, () => console.log('Running on 5000'));
