import { useState } from 'react';
import { useNavigate } from "react-router-dom";


export const EditExercisePage = ({exerciseToEdit}) => {

    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const navigate = useNavigate();

    const editExercise = async () => {
        const editedExercise = {name, reps, weight, unit, date};
        const response = await fetch(
            `/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(editedExercise)
            
        });
        if(response.status === 200){
          alert("Successfully edited the exercise!");
        } else {
          alert(`Failed to edit exercise, status code = ${response.status}`);
        }
        navigate("/");
      };

    return (
        <div>
            <h2>Edit Exercise</h2>
            <input class="userInput"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input class="userInput"
                type="number"
                value={reps}
                onChange={e => setReps(e.target.valueAsNumber)} />
            <input class="userInput"
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.valueAsNumber)} />
            <select class="selectInput" onChange={e => setUnit(e.target.value)}>
                    <option value ="">Select Unit</option>
                    <option value ="kgs">kgs</option>
                    <option value="lbs">lbs</option>
            </select>
            <input class="userInput"
                type="text"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button class="userInput"
                onClick={editExercise}
            >Update</button>
        </div>
        
    
    );
}

export default EditExercisePage;