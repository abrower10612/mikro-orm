import express from 'express';
import { CommentsRoute, PostsRoute } from './routes';

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.use('/posts', PostsRoute)
app.use('/comments', CommentsRoute)

app.listen(port, () => console.log('Running on 5000'));