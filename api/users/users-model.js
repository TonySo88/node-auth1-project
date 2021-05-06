const db = require('../../data/db-config')

/**
  resolves to an ARRAY with all users, each user having { user_id, username }
 */
const find = async () => {
  const results = await db('users')
    .select('user_id', 'username')
  return results
}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
const findBy = async (filter) => {
  const results = await db('users as u')
   .select("user_id", "username", "password")
   .where(filter)
   .first()
  return results
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
const findById = async (user_id) => {
  const results = await db ('users as u')
    .where("u.users_id", user_id)
    .first()
    .select("u.user_id", "u.username")
  return results
}

/**
  resolves to the newly inserted user { user_id, username }
 */
const add = async (user) => {
  const [id] = await db('users').insert(user)
  return findById(id)
}

// Don't forget to add these to the `exports` object so they can be required in other modules
module.exports = {
  find,
  findBy,
  findById,
  add
}