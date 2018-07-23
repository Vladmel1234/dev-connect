import { Profile as ProfileSchema } from '../schemas'
import { isEmpty } from 'lodash'

export default class Profile {
    one = async id => {
      try {
        const user = await ProfileSchema.findOne({
          user: id
        })
          .populate('user', ['name', 'avatar'])
          .lean()

        if (isEmpty(user)) {
          return 404
        }
        return user
      } catch (error) {
        return error
      }
    }

    oneByHandle = async handle => {
      const errors = {}
      try {
        const user = await ProfileSchema.findOne({
          handle
        }).populate('user', ['name', 'avatar'])

        if (isEmpty(user)) {
          return (errors.noprofile = 'There is no profile for this user')
        }
        return user
      } catch (error) {
        return (errors.generatedError = error)
      }
    }

    oneById = async id => {
      const errors = {}
      try {
        const user = await ProfileSchema.findById(id).populate('user', [
          'name',
          'avatar'
        ])

        if (isEmpty(user)) {
          return (errors.noprofile = 'There is no profile for this user')
        }
        return user
      } catch (error) {
        return (errors.generatedError = error)
      }
    }

    normalizeProfile = req => ({
      user: req.user._id,
      handle: req.body.handle,
      company: req.body.company,
      website: req.body.website,
      location: req.body.location,
      status: req.body.status,
      skills: req.body.skills.split(','),
      bio: req.body.bio,
      gitHub: req.body.gitHub,
      social: {
        facebook: req.body.facebook,
        twitter: req.body.twitter,
        linkedin: req.body.linkedin,
        googleplus: req.body.googleplus
      }
    })

    normalizeExpirience = req => ({
      expirience: [].unshift({
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      })
    })

    normalizeEducation = req => ({
      education: [].unshift({
        school: req.body.school,
        degree: req.body.degree,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      })
    })

    getAll = async () => {
      const profiles = await ProfileSchema.find({}).populate('user', [
        'name',
        'avatar'
      ])
      return profiles
    }

    addExpirience = async req => {
      try {
        const user = await ProfileSchema.findOneAndUpdate(
          { user: req.user._id },
          {
            $set: this.normalizeExpirience(req)
          },
          { new: true }
        )
        return user
      } catch (error) {
        return error
      }
    }

    deleletExpirience = async req => {
      try {
        const user = await ProfileSchema.findOne({ user: req.user._id })
        const removedExp = user.expirience.filter(
          item => String(item._id) !== req.params.id
        )
        user.expirience = removedExp
        user.save()
        return user
      } catch (error) {
        return error
      }
    }

    addEdcuation = async req => {
      try {
        const user = await ProfileSchema.findOneAndUpdate(
          { user: req.user._id },
          {
            $set: this.normalizeEducation(req)
          },
          { new: true }
        )
        return user
      } catch (error) {
        return error
      }
    }

    deleletEducation = async req => {
      try {
        const user = await ProfileSchema.findOne({ user: req.user._id })
        const removedEdc = user.education.filter(
          item => String(item._id) !== req.params.id
        )
        user.education = removedEdc
        user.save()
        return user
      } catch (error) {
        return error
      }
    }

    createOrUpdate = async req => {
      try {
        let user = await ProfileSchema.findOne({
          id: req.user._id
        })
        if (user) {
          user = await ProfileSchema.findOneAndUpdate(
            { id: req.user._id },
            {
              $set: this.normalizeProfile(req)
            },
            { new: true }
          )
        } else {
          user = await ProfileSchema.create(this.normalizeProfile(req))
        }
        return user
      } catch (error) {
        return error
      }
    }
}
