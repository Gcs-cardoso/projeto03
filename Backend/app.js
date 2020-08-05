const express = require('express')
const bodyParser = require('body-parser')
const graphqlHTTP = require('express-graphql').graphqlHTTP
const isAuth = require('./middleware/is-auth')
const mongoose = require('mongoose')

const GSchema = require('./graphql/schema/index.js')
const GResolver = require('./graphql/resolvers/index.js')

const app = express()

app.use(bodyParser.json())

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if(req.method === 'OPTIONS'){
      return res.sendStatus(200)
  }
  next()
})

app.use(isAuth)


app.use('/graphql', graphqlHTTP({
    schema: GSchema,
    rootValue: GResolver,
    graphiql: true
}))

mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.8lf8j.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,{useNewUrlParser: true,useUnifiedTopology: true }
).then(()=>{
app.listen(9000)

}).catch(err =>{
    console.log(err)
})


