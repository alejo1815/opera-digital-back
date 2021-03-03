const { model, Schema } = require('mongoose')

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        async validator(email) {
          const user = await User.findOne({ email })
          return !user
        },
        message: 'That email is already in use',
      },
    },
    password: {
      type: String,
      required: true,
    },
    articles: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
    },
  },
  {
    timestamps: true,
  }
)

const User = model('User', userSchema)

module.exports = User
