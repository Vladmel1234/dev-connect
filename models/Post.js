import { Post as PostSchema } from '../schemas'
import { includes } from 'lodash'

export default class Post {
  getAllPosts = async req => {
    try {
      const posts = await PostSchema.find({}).sort({ date: -1 })
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
      const post = await PostSchema.find({ user: id }).sort({ date: -1 })
      if (!post) {
        return { error: 'there is no post with this id' }
      }
      return post
    } catch (error) {
      return error
    }
  }

  deltePostById = async (postId, userId) => {
    try {
      // const profile = await ProfileSchema.findOne({ id: userId })
      const post = await PostSchema.findById(postId)

      if (post.user.toString() !== userId) {
        return { notauthorized: 'User notauthorize to delete' }
      }

      await PostSchema.findByIdAndDelete(postId)

      return { post: `post with id ${post._id} succesfully deleted` }
    } catch (error) {
      return error
    }
  }

  toggleLike = async (postId, userId) => {
    try {
      // const profile = await ProfileSchema.findOne({ id: userId })
      const post = await PostSchema.findById(postId)
      console.log('----------------------')
      console.log(userId)
      console.log('----------------------')
      console.log('----------------------')
      console.log(post.likes)
      console.log('----------------------')
      if (includes(post.likes, userId)) {
        const deletedLikePost = await PostSchema.findOneAndUpdate(
          { _id: postId },
          { $pull: { likes: userId } }
        )
        return deletedLikePost
      } else {
        const addedLikePost = await PostSchema.findOneAndUpdate(
          { _id: postId },
          { $push: { likes: userId.toString } },
          { new: true }
        )
        return addedLikePost
      }
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
