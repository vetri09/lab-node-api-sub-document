const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose')
const { lesson, squad } = require('./Schema/schema')
const url = 'mongodb+srv://vetrivelan:vetrivelan@cluster0.iczh2.mongodb.net/classroom?retryWrites=true&w=majority'
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true})
// functions
// lesson
// get
app.get('/lessons', async (req,res)=>{
    const list = await lesson.find()
    res.send({
        list,
        message:"displaying all lessons"
    })
})
// get id
app.get('/lessons/:_id', async (req,res)=>{
    await lesson.find(req.params)
    .then(result=>{
        res.send({
            result,
            message:"lesson found"
        })
    }).catch(err=>{
        res.send({
            err,
            error_message:"error in id"
        })
    })
})
// post
app.post('/lessons', async (req,res)=>{
    const list = await new lesson({
        name:req.body.name
    })
    list.save()
    res.send({
        list,
        message:"lesson added"
    })
})
// put
app.put('/lessons/:_id', async(req,res)=>{
    await lesson.updateOne(req.params,req.body)
    .then(result=>{
        res.send({
            result,
            message:"lesson updated"
        })
    })
})
// delete
app.delete('/lessons/:_id', async(req,res)=>{
    await lesson.deleteOne(req.params,req.body)
    .then(result=>{
        res.send({
            result,
            message:"lesson deleted"
        })
    }).catch(err=>{
        res.send({
            err,
            error_message:"error in id"
        })
    })
})

// squad
// get
app.get('/squads', async (req,res)=>{
    const list = await squad.find()
    res.send({
        list,
        message:"displaying all squads"
    })
})
// get id
app.get('/squads/:_id', async(req,res)=>{
    try {
        const list = await squad.find(req.params)
        res.send({
            list,
            message:"squad found"
        })
    } catch (error) {
        res.send({
            error,
            error_message:"error"
        })
    }
})
// post
app.post('/squads', async (req,res)=>{
    const list = await new squad({
        name:req.body.name,
        lessonId:req.body.lessonId,
        cohort:req.body.cohort
    })
    list.save()
    res.send({
        list,
        message:"squad added"
    })
})
// put
app.put('/squads/:_id', async(req,res)=>{
    try {
        const list = await squad.updateOne(req.params,req.body)
        res.send({
            list,
            message:"squad updated"
        })
    } catch (error) {
        res.send({
            error,
            message:"error in update"
        })
    }
})
// delete
app.delete('/squads/:_id', async(req,res)=>{
    try {
        await squad.deleteOne(req.params,req.body)
        res.json({
            message:"squad deleted"
        })
    } catch (error) {
        res.json({
            message:"error in squad deletion"
        })
    }
})

app.listen(3000,()=>console.log("server at 3000"))
