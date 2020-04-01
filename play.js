require('./config/connection')

const {master, commander} = require('./svc')
commander({trigger: 'left'})
// commander({trigger: 'create'})

