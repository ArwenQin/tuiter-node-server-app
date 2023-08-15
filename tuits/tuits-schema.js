import mongoose from 'mongoose';
const schema = mongoose.Schema({
  tuit: String,
  likes: Number,
  liked: Boolean,
  disliked: Boolean,
  dislikes: Number,
  replies: Number,
  retuits: Number,
  time: String,
  title: String,
  handle: String,
  topic: String,
  image: String,
  username: String,
}, {collection: 'tuits'});
export default schema;

