import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';

const app = express();
app.use(express.json())

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    await exercises.connect(false)
    console.log(`Server listening on port ${PORT}...`);
});

app.post('/exercises', asyncHandler(async (req, res) => {
    let exercisesValues = [req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date]
    if (typeof(req.body.name) !== "string" || req.body.name === ""){
        res.status(400).send({Error: "Invalid Request"})
        return
    }
    if (typeof(req.body.reps) !== "number" || (req.body.reps <= 0) === true || Number.isInteger(req.body.reps) === false){
        res.status(400).send({Error: "Invalid Request"})
        return
    }
    if (typeof(req.body.weight) !== "number" || (req.body.weight <= 0) === true || Number.isInteger(req.body.weight) === false){
        res.status(400).send({Error: "Invalid Request"})
        return
    }
    if (typeof(req.body.unit) !== "string" || (req.body.unit !== "kgs" && req.body.unit !== "lbs")){
        res.status(400).send({Error: "Invalid Request"})
        return
    }
    if ( typeof(req.body.date) === "undefined" || exercises.isDateValid(req.body.date) !== true){
        res.status(400).send({Error: "Invalid Request"})
        return
    }
    if (typeof(exercisesValues[5]) !== "undefined"){
        console.log("made it")
        res.status(400).send({Error: "Invalid Request"})
        return
    }
    else{
        let newExercise = await exercises.createExercise(exercisesValues[0], exercisesValues[1], exercisesValues[2], exercisesValues[3], exercisesValues[4])
        res.status(201).send(newExercise)
    }
}))

app.get('/exercises', asyncHandler(async (req, res) => {
    let parameters = req.query
    let exerciseResults = await exercises.findExercise(parameters)
    res.status(200).send(exerciseResults)
    }))

app.get('/exercises/:id', asyncHandler(async (req, res) => {
    const exerciseID = req.params.id
    let exerciseResults = await exercises.findExerciseFromID(exerciseID)
    if ( exerciseResults === null){
        res.status(404).send({Error: "Not Found"})
    }
    else{res.status(200).send(exerciseResults)}
    }))

app.put('/exercises/:id', asyncHandler(async (req, res) => {
    let exercisesValues = [req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date]
    if (typeof(req.body.name) !== "string" || req.body.name === ""){
        res.status(400).send({Error: "Invalid Request"})
        return
    }
    if (typeof(req.body.reps) !== "number" || (req.body.reps <= 0) === true || Number.isInteger(req.body.reps) === false){
        res.status(400).send({Error: "Invalid Request"})
        return
    }
    if (typeof(req.body.weight) !== "number" || (req.body.weight <= 0) === true || Number.isInteger(req.body.weight) === false){
        res.status(400).send({Error: "Invalid Request"})
        return
    }
    if (typeof(req.body.unit) !== "string" || (req.body.unit !== "kgs" && req.body.unit !== "lbs")){
        res.status(400).send({Error: "Invalid Request"})
        return
    }
    if ( typeof(req.body.date) === "undefined" || exercises.isDateValid(req.body.date) !== true){
        res.status(400).send({Error: "Invalid Request"})
        return
    }
    if (typeof(exercisesValues[5]) !== "undefined"){
        console.log("made it")
        res.status(400).send({Error: "Invalid Request"})
        return
    }
    else{
        const exerciseID = req.params.id
        let updateValues = req.body
        let exerciseUpdate = await exercises.updateExercise(exerciseID, updateValues)
        if (exerciseUpdate === null){
            res.status(404).send({Error: "Not Found"})
        }
        else{res.status(200).send(exerciseUpdate)}
    }    
}))

app.delete('/exercises/:id', asyncHandler(async (req, res) => {
    const exerciseID = req.params.id
    let deleteResults = await exercises.deleteExercise(exerciseID)
    if (deleteResults === null){
        res.status(404).send({Error: "Not Found"})
    }
    else{res.status(204).send()}
    }))
