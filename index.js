const express = require('express');

const app = express();
const port = 9000;

app.use(express.json({ limit: '5mb' }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "*")
    next()
});



const notes = [];

app.post('/api/notes', (req, res) => {
    req.body.id = Math.random().toString()
    notes.push(req.body)    
    res.status(201)
    res.send({ ...req.body })
});



app.get("/api/notes", (req, res) => {
    res.send({ notes:notes })
})

app.delete("/api/notes/:id", (req, res) => {
    let index = notes.findIndex((note) => note.id === req.params.id)    
    notes.splice(index, 1)
    res.send({ valid: 'true' })
});

app.put("/api/notes/:id", (req, res) => {
    let index = notes.findIndex((note) => note.id === req.params.id)
    notes.splice(index, 1, req.body)    
    res.send({ valid: 'true' })
})


app.listen(port, () => {
    console.log(`http://localhost${port}`)
})