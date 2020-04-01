const axios = require('axios')
const {Bubble} = require('../../model')
const postData = require('../../config/postData')

module.exports = {
  pull
}

async function pull (trigger) {
  // console.log({trigger})
  const sources = await Bubble[trigger].find()
  let iterations = sources.length
  // iterations = 1

  for (let i=0; i<iterations; i++) {
    try {
      const {source_url} = sources[i]
      // console.log({source_url})
      const links = await postData({
        target: 'helper-links', 
        data: {url: source_url},
        mins: 1,
      })  
      postData({
        target: 'scanner', 
        data: {source_url, source_type: `bubble_${trigger}`, links}
      })
    } catch(e) {
      console.log({e})
    }
  }
  
  return
}

