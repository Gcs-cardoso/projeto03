
const { buildSchema } = require('graphql')




module.exports = buildSchema(`
        type Receita{
            _id: ID!
            evento: Evento!
            usuario: Usuario!
            createdAt: String!
            updatedAt: String!
        }


        type Evento{
            _id: ID!
            nome: String!
            descricao: String!
            criador: Usuario!
        }

        input EventoInput{
            nome: String!
            descricao: String!
            criador: String
        }

        type Usuario{
            _id: ID!
            email: String!
            password: String
            receitasCriadas: [Evento!]
        }

        input UsuarioInput{
            email: String!
            password: String!
        }

        type AuthData{
            idUsuario: ID!
            token: String!
            TokenExpiration: Int!
        }

        type RootQuery{
            eventos: [Evento!]!
            receitas: [Receita!]!
            login(email: String!, password: String!): AuthData!
        }

        type RootMutation{
            criarEvento(eventoinput: EventoInput): Evento
            criarUsuario(usuarioinput: UsuarioInput): Usuario
            setReceita(idEvento: ID!): Receita!
            popReceita(idReceita: ID!): Evento!
            
        }

        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `)