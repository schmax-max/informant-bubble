const {create} = require('./create')
const {pull} = require('./pull')
const {gateway} = require('./gateway')

module.exports = {master, commander}

async function master (req = {}) {
  console.log('starting master')
  if (gateway (req)) {
    return await commander(req.params)
  } else {
    return
  } 
}


async function commander (params = {}) {
  const {trigger} = params
  if (trigger === 'create') {
    return await create()
  } else {
    return await pull(trigger)
  }
}