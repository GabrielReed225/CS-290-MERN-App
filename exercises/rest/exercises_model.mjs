// Get the mongoose object
import mongoose, { model } from 'mongoose';
import 'dotenv/config';

const EXERCISE_CLASS = 'exercise';

let connection = undefined;
let exercises = undefined;

/**
 * This function connects to the MongoDB server.
 */
async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        connection = mongoose.connection;
        console.log("Successfully connected to MongoDB using Mongoose!");
        exercises = createModel();
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

function createModel(){
    const userSchema = mongoose.Schema({
        name: {type: String},
        reps: {type: Number},
        weight: {type: Number},
        unit: {type: String},
        date: {type: String}
    })
    return mongoose.model(EXERCISE_CLASS, userSchema)
}

async function createExercise(name, reps, weight, unit, date) {
    const exercise = new exercises({name: name, reps: reps, weight: weight, unit: unit, date:  date})
        return exercise.save()
    }

async function findExercise(filter) {
    let query = exercises.find(filter)
    return query.exec()
}

async function findExerciseFromID(exerciseID) {
    let query = exercises.findById(exerciseID)
    return query.exec()
}

async function updateExercise(userID, updateValues) {
    let query = exercises.findByIdAndUpdate(userID, updateValues)
    return query.exec()
}

async function deleteExercise(exerciseID) {
    let query = exercises.findByIdAndDelete(exerciseID)
    return query.exec()
}

/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

export {deleteExercise}
export {updateExercise};
export {findExerciseFromID};
export {findExercise};
export {createExercise};
export { connect };
export {isDateValid}
