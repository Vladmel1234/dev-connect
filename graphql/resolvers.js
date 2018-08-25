import { Post as PostSchema } from '../schemas'

const resolvers = {
  Query: {
    posts: async () => {
      const posts = PostSchema.find({}).sort({ date: -1 })
      return posts
    }
  }
}

export default resolvers
