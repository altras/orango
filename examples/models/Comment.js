module.exports = ({ orango }) => {
  class Comment extends orango.Model {
    constructor(data) {
      super(data, Comment.schema)
    }
  }

  Comment.schema = orango.schema(
    {
      message: String
    },
    {
      type: 'edge',
      from: 'User',
      to: ['Tweet', 'Comment']
    }
  )

  return orango.model('Comment', Comment)
}