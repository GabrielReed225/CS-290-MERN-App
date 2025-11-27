import { useState } from 'react';
import { useNavigate } from "react-router-dom";


export const CreateExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
          method: 'POST',
          body: JSON.stringify(newExercise),
          headers: { 'Content-Type': 'application/json'}
        });
        if(response.status === 201){
          alert("Successfully added the exercise!");
        } else {
          alert(`Failed to add exercise, status code = ${response.status}`);
        }
        navigate("/");
      };

    return (
        <div>
            <h2>Add Exercise</h2>
            <input class="userInput"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input class="userInput"
                type="number"
                value={reps}
                placeholder="Enter reps"
                onChange={e => setReps(e.target.valueAsNumber)} />
            <input class="userInput"
                type="number"
                placeholder="Enter weight"
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
                placeholder="Enter date (MM-DD-YY)"
                onChange={e => setDate(e.target.value)} />
            <button class="userInput"
                onClick={addExercise}
            >Create</button>
        </div>
    );
}

export default CreateExercisePage;