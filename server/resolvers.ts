export const resolvers = {
  Query: {
    users(parent, args, {db}) {
      return [{firstName: 'Nextjs'}]
    },
  },
}
