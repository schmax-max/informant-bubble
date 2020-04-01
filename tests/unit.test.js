const chai = require('chai')
const mongoose = require('mongoose')
const chaiAsPromised = require('chai-as-promised')
const expect = require('chai').expect
const should = require('chai').should()
chai.use(chaiAsPromised).should()

require ('../config/connection')
const {pull, fetchSources, fetchLinksPerSource} = require ('../svc/pull')
// const {perBubble} = require ('../svc/create')

beforeEach(async () => {
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error'))
    db.once('open', () => {
        console.log('test DB connected!')
    })
    // await db.clear();
});
  
const defaultTimeout = 60 * 1000 

// describe('TEST: mbfc ||', () => {
//     it('creates mbfc source:', async () => {
//         const allMbfcs = await perBubble('center')
//         const singleMbfc = allMbfcs[0]
//         expect(singleMbfc).to.have.nested.property('mbfc')
//         expect(singleMbfc).to.have.nested.property('mbfc.bubble')
//     }).timeout(defaultTimeout)
    
//     it('fetches mbfc sources:', async () => {
//         const allMbfcs = await fetchSources('mbfcs')
//         const singleMbfc = allMbfcs[0]
//         expect(singleMbfc).to.have.nested.property('mbfc')
//         expect(singleMbfc).to.have.nested.property('mbfc.bubble')
//     }).timeout(defaultTimeout)

//     // it('fetches links from a url:', async () => {
//     //     const url = ''
//     //     const allLinks = await fetchLinksPerSource(url)
//     //     expect(allLinks).to.have.nested.property('mbfc')
//     //     expect(singleMbfc).to.have.nested.property('mbfc.bubble')
//     // })
// })
