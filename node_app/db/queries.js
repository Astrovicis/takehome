const knex = require('./knex.js')

function Addresses() {
  return knex('addresses')
}

// *** queries *** //

function getAll() {
  return Addresses().select()
}

function getMatching({ keyword = '' }, columns = []) {
  if (typeof columns === 'string') {
    columns = [columns]
  }
  else if (Array.isArray(columns) && !columns.length) {
    // With more time, I would use objection.js and ask for the table columns
    columns = ['line1', 'line2', 'city', 'state', 'zip']
  }

  let query = Addresses()
  if (keyword) {
    query.orWhere(query => {
      for (const column of columns) {
        const lower = `lower(${column}) like '%' || lower(?) || '%'`
        query.orWhereRaw(lower, keyword)
      }
    })
  }

  return query
}

function getByID(showID) {
  return Addresses().where('id', parseInt(showID)).first()
}

function add(address) {
  return Addresses().insert(address, 'id')
}

function update(addressID, updates) {
  return Addresses().where('id', parseInt(addressID)).update(updates)
}

function deleteItem(addressID) {
  return Addresses().where('id', parseInt(addressID)).del()
}

module.exports = {
  getAll,
  getByID,
  getMatching,
  add,
  update,
  deleteItem,
}
