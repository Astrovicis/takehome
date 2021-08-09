exports.up = async function (knex) {
  await knex.schema.createTable("addresses", (table) => {
    table.increments("id");
    table.string("line1");
    table.string("line2");
    table.string("city");
    table.string("state");
    table.string("zip");
    table.timestamps(true, true);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("addresses");
};