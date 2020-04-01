const axios = require('axios')
const {AllHtmlEntities} = require('html-entities');
const {decode} = new AllHtmlEntities();
const {Source} = require('../../model')

module.exports = {create, createPerBubble}

async function create () {
  let bubbleArray = [
    // 'left',
    'leftcenter',
    'center',
    'right-center',
    'right',
    'pro-science',
    'conspiracy',
    'fake-news',
    'satire'
  ]
  let iterations = bubbleArray.length
  // iterations = 1
  
  for (let i=0; i<iterations; i++) {
    try {
      await createPerBubble(bubbleArray[i])
    } catch (e) {
      console.log('error happening')
      console.error({e})
    }
  }
}

async function createPerBubble (bubble) {
  console.log(`starting createPerBubble for ${bubble}`)
  const url = `https://mediabiasfactcheck.com/${bubble}`
  if (bubble === 'leftcenter') {
    bubble = 'left-center'
  }
  let {data} = await axios.get(url)
  
  data = chopIrrelevantContent (data, '</strong></p>', 1)
  data = chopIrrelevantContent (data, '</tbody>', 0)
  
  let array = data.split(`a href="`)
  array.shift()
  let iterations = array.length
  // iterations = 1
  for (let i=0; i<iterations; i++) {
    const item = array[i]
    const itemArray = item.split(`">`)
    const link = itemArray[0]
    let name = itemArray[1].split('</a>')[0].split(' (')[0]
    name = decode(name)
    const sourceObj = {name, link}
    try {
      await updateSource(bubble, sourceObj)
    } catch (e) {
      console.log('error happening')
      console.error({e})
    }
  }
  return
}


function chopIrrelevantContent (data, identifier, index) {
  if (data.includes(identifier)) {
    const array = data.split(identifier)
    if (index === 0) {
      data = array[0]
    } else if (index === 1) {
      array.shift()
      data = array.join(identifier)
    }
  } else {
    console.log(`data does not contain identifier: ${identifier}`)
    // console.log({data})
  }
  return data
}



async function updateSource (bubble, {name, link}) {
  console.log(`starting updateSource for ${name}`)
  let {data} = await axios.get(link)
  data = chopIrrelevantContent (data, '</header>', 1)
  const dataForInfo = chopIrrelevantContent (data, '<p>Source', 0)
  const dataForUrl = chopIrrelevantContent (data, '<p>Source', 1)
  const mbfc_info = Object.assign({}, {bubble}, {link}, processContent (dataForInfo))
  const source_url = processUrl(dataForUrl) 
  const source = Object.assign({}, {name}, {source_url}, {mbfc_info})
  const options = {upsert: true, new: true}
  return await Source.mbfcs.findOneAndUpdate({name, source_url}, source, options)
}

function processUrl (relevant) {
  let url = relevant.split('</a></p>')[0]
  const urlArray = url.split('>')
  url = urlArray.slice(-1).pop()
  return url
}


function processContent (relevant) {
  relevant = decode(relevant)
  let strippedText = ''
  let array = relevant.split('<')
  array.shift()
  array.forEach((item) => {
    const text = item.split('>')[1]
    strippedText += text
  })
  const strippedArray = strippedText.split('\n')
  let cleanArray = []

  let response = {}
  strippedArray.forEach((item) => {
    const infoIndicators = [
      'Factual Reporting:',
      'Country:',
      'Source:',
      'World Press Freedom Rank:',
    ]
    const infoIndicatorsRegEx = new RegExp(infoIndicators.join('|'))
    const infoContent = item.split(infoIndicatorsRegEx)[1]
    if (item.includes('Factual Reporting:')) {
      response.quality = infoContent.trim()
    } 
    else if (item.includes('Country:')) {
      response.country = infoContent.trim()
    } 
    else if (item.includes('Source:')) {
      response.url = infoContent.trim()
    } 
    else if (item.includes('World Press Freedom Rank:')) {
      response.rank = infoContent.trim()
    } 
    else if (item.length > 0) {
      cleanArray.push(item)
    }
  })
  response.description = cleanArray.join('\n')
  
  return response
}
