import Fastify, { fastify } from 'fastify'
import { Fruit } from './fruits'
import cors from '@fastify/cors'
import { MongoClient } from 'mongodb'

async function main() {
    const uri: string = "mongodb://root:password@localhost:27017";
    const client = new MongoClient(uri);
    client.connect()
        .then(() => console.log("MongoDB connected successfully"))
        .catch(err => console.error("MongoDB connection error:", err));

    const db = client.db("production");
    const collection = db.collection("fruits");

    const fastify = Fastify({
        logger: true
    })

    fastify.register(cors, {
        origin: '*',
        methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    })

    // Declare a route
    fastify.get('/fruits', async function (request, reply) {
        const fruitsApi = await collection.find().toArray();
        reply.send(fruitsApi);
    })

    fastify.get('/fruits/:id', async function (request, reply){
        //Gets the id from the url and converts it to a string
        const getId  = await request.params as { id: string }
        //Converts the id to an integer and finds the fruit with that id in the database
        const fruitsApi = await collection.findOne({'id': parseInt(getId.id)});
        
        if (!fruitsApi) return reply.callNotFound()
        return reply.send(fruitsApi)
    })

    fastify.post('/fruits', async function (request, reply) {
        const fruitsApi = await collection.find().toArray();
        const lastId = fruitsApi.length > 0 ? fruitsApi[fruitsApi.length - 1].id : 0
        const newFruit: Fruit = { id: lastId + 1, ...request.body as Omit<Fruit, 'id'> }
        
        await client.db("production").collection("fruits").insertOne(newFruit);
        
        return reply.status(201).send(newFruit)
    })

    fastify.delete('/fruits/:id', async function (request, reply) {
        const getId =  request.params as { id: string }
        const deleteFruit = await collection.deleteOne({'id': parseInt(getId.id)});
        return reply.send(deleteFruit)
    })

    fastify.listen({ port: 8080 }, function (err, address) {
        if (err) {
            fastify.log.error(err)
            process.exit(1)
        }
    })
}

main().catch(err => {
    console.error(err)
    process.exit(0);
})
