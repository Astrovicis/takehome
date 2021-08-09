addresses = require('../addresses.json')
exports.seed = async (knex) => {
  await knex('addresses').del()
  for (const address of addresses) {
    await knex("addresses").insert(address);
  }
}
