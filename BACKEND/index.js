const express = require('express'); //import modules and packages into your application.
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const cors = require('cors'); //Cross-Origin Resource Sharing, 
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());



const uri = 'mongodb+srv://krsarita:kissu111@cluster0.esokis0.mongodb.net/?retryWrites=true&w=majority';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    
    await client.connect();
    console.log("hello bookshelf");

    const database = client.db("bookstore");
    const usersCollection = database.collection("bookself");

    app.get('/users', async (req, res) => {
        const cursor = usersCollection.find();
        const result = await cursor.toArray();
        res.send(result)
    })

    app.get('/users/:id', async (req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await usersCollection.findOne(query);
        res.send(result);
    })

    app.post('/users', async (req, res) => {
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        res.send(result);
    });

    app.delete('/users/:id', async (req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};

        const result = await usersCollection.deleteOne(query);
        res.send(result);
    })

    app.put('/users/:id', async (req, res) => {
        const id = req.params.id;
        const user = req.body;

        const filter = {_id: new ObjectId(id)};
        const options = { upsert: true };
        const updateduser = {
            $set:{
                name: user.name,
                email: user.email,
                photoURL: user.photoURL
            }
        }

        const result = await usersCollection.updateOne(filter, updateduser, options);
        res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello Bookshelf!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
