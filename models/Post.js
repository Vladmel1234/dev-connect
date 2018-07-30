import { Post as PostSchema } from '../schemas'

export default class Post {
  getAllPosts = async req => {
    try {
      const posts = await PostSchema.find({}).sort('1')
      if (!posts) {
        return { error: 'there is no posts at all' }
      }
      return posts
    } catch (error) {
      return error
    }
  }

  getUserPostById = async id => {
    try {
      const post = await PostSchema.find({ user: id }).sort('0')
      if (!post) {
        return { error: 'there is no post with this id' }
      }
      return post
    } catch (error) {
      return error
    }
  }

  createPost = async req => {
    try {
      const post = await PostSchema.create({
        user: req.user._id,
        text: req.body.text,
        avatar: req.body.name,
        name: req.body.name
      })

      return post
    } catch (error) {
      return error
    }
  }
}
