const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require("express");
const cors = require("cors");
const app = express();
const port = 2100;

//medile Ware :
app.use(cors());
app.use(express.json());

//test simple server:
app.get('/', (req, res) => {
    res.send('node is comming')
})
//database : mongobd;
const uri = "mongodb+srv://shakeeb-test:hho90c88ncTtea61@cluster-skv.zmdghy4.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const mongoDb = async () => {
    try {
        client.connect();
        console.log('dataBase connected');
    } catch (error) {
        console.log(error.name, error.message);
    }
}
mongoDb();

const User = client.db('Text-Hook').collection('user');

app.post('/user', async (req, res) => {
    const cursor = req.body;
    try {
        const user = await User.insertOne(cursor);
        res.send(
            {
                succerss: true,
                message: `successfully added user - ${cursor.name}`,
                data: user
            }
        )
    } catch (error) {
        console.log(error.name, error.message);
        res.send(
            {
                succerss: false,
                message: "cannot add product"
            }
        )
    }

})
app.get('/users', async (req, res) => {
    const cursor = User.find({});
    try {
        const users = await cursor.toArray();
        res.send(
            {
                succerss: true,
                data: users
            }
        )
    } catch (error) {
        console.log(error.name, error.message);
        res.send(
            {
                succerss: false,
                message: "cannot show producy"
            }
        )
    }
})
app.delete('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = User.deleteOne({ _id: ObjectId(id) });
        res.send(
            {
                succerss: true,
                data: user
            }
        )
    } catch (error) {
        console.log(error.name, error.message);
        res.send(
            {
                succerss: false,
                message: "Delate item faild"
            }
        )
    }
})

app.listen(port, () => console.log(port, "port is open"))
