const express = require('express')
const cors = require('cors')
const app = express()
const { readJsonFile, writeJsonFile } = require("./fsUtils");

const PORT = 3001

app.use(cors())

app.use((req, _, next)=>{
    console.log('new request', req.method, req.url);
    next()
})

app.use(express.json())

app.get('/api/entries',(_, res)=>{
    readJsonFile('./entries.json')
    .then((entries)=>res.status(200).json({success: true ,result: entries}))
    .catch((err)=>{console.log(err);
    res.status(500).json({success:false, error: 'failed to load'})
    })
})

app.post('/api/entries', (req,res)=>{
    const newEntry = {
        id: Date.now(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mail: req.body.mail,
        message: req.body.message
    }
    readJsonFile('./entries.json')
    .then((entries)=>[...entries,newEntry])
    .then((newEntriesArr)=>writeJsonFile('./entries.json',newEntriesArr))
    .then(newEntriesArr=>res.status(200).json({success:true,result:newEntriesArr}))
    .catch(err=>{console.log(err);
    res.status(500).json({success: false, error:'failed to update entry'})
    })
})

app.delete('/api/entries/:entryId',(req,res)=>{
    const id = req.params.entryId
    readJsonFile('./entries.json')
    .then((entries)=>{
        const entriesWithoutDeleted=entries.filter((entry)=> entry.id.toString()!== id)
        return entriesWithoutDeleted
    })
    .then((newEntriesArr)=>writeJsonFile('./entries.json', newEntriesArr))
    .then((newEntriesArr)=>res.status(200).json({success:true,result:newEntriesArr}))
    .catch((err)=>{
        console.log(err);
        res.status(500).json({success:false, error:'failed to remove entry'})
    })
})

app.use((_,res)=>{
    res.status(404).json({success: false, error: "Route not found"})
})

app.listen(PORT, ()=>{
    console.log('server listening on port:'+PORT);
})