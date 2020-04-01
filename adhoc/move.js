const {Bubble} = require('../model')
module.exports = {move}


async function move () {
  try {
    const type = 'right'
    const modelName = type.replace('-', '_')
    console.log({modelName, type})
    const query = { 'mbfc_info.bubble': type }
    const docs = await Bubble.others.find(query)
    let iterations = docs.length
    // iterations = 1
    // console.log({iterations})
    await create (modelName, docs, iterations) 
    // if (iterations > 1) {
    //   await Bubble.others.deleteMany(query)
    // }

    
    return 'home'
  } catch(e) {
    console.log({e})
  }
}

// function getQuery (type) {
  
  
//   return {
    
//   }
// }

async function create (modelName, docs, iterations) {
  console.log({docs})
  for (let i=0; i<iterations; i++) {
    const doc = docs[i]
    try {
      const {source_url} = doc
      doc._id = doc._id
      const options = {upsert: true, new: true}
      await Bubble[modelName].findOneAndUpdate({source_url}, doc, options)
    } catch(e) {
      console.log({e})
    }
  }
}