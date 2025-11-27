import React from "react";
import ExerciseItem from "./ExerciseItem";
function ExerciseCollection({ exercises, onDelete, onEdit}) {
    return (
        
        <div className="collection-container">
            <table>
                <thead>
                    <tr>
                        <th> Name </th>
                        <th> Reps </th>
                        <th> Weight </th>
                        <th> Unit </th>
                        <th> Date </th>
                        <th> Edit </th>
                        <th> Delete </th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map((exercise, i) =><ExerciseItem exercise = {exercise} onDelete = {onDelete} onEdit = {onEdit} key={i}/>)}
                </tbody>
            </table>
        </div>

    );
}

export default ExerciseCollection;