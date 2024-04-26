import mongoose from 'mongoose';

const librarySchema = new mongoose.Schema({
  title: String,
  author: String,
  publisher: String,
  copies: String,
});

const Library = mongoose.model('Library', librarySchema);

export default Library;
