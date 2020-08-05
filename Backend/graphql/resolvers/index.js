const resolverAuth = require('./auth')
const resolverReceita = require('./evento')
const resolverEventos = require('./receita')

const resolverRoot = {
    ...resolverAuth,
    ...resolverEventos,
    ...resolverReceita
}

module.exports = resolverRoot