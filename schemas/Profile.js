import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Profile = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  gitHub: {
    type: String
  },
  expirience: {
    type: [
      {
        title: {
          type: String,
          required: true
        },
        company: {
          type: String,
          required: true
        },
        location: {
          type: String
        },
        from: {
          type: Date,
          require: true
        },
        to: {
          type: Date
        },
        current: {
          type: Boolean,
          default: false
        },
        description: {
          type: String
        }
      }
    ]
  },
  education: {
    type: [
      {
        school: {
          type: String,
          required: true
        },
        degree: {
          type: String,
          required: true
        },
        location: {
          type: String
        },
        from: {
          type: Date,
          require: true
        },
        to: {
          type: Date
        },
        current: {
          type: Boolean,
          default: false
        },
        description: {
          type: String
        }
      }
    ]
  },
  social: {
    facebook: {
      type: String
    },
    youtube: {
      type: String
    },
    linkedin: {
      type: String
    },
    github: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Profile', Profile, 'Profile')
