import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

function ExerciseItem({ exercise, onDelete, onEdit }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><CiEdit onClick = {e => {e.preventDefault(); onEdit(exercise)}}/></td>
            <td><RiDeleteBin5Line onClick = {e => {e.preventDefault(); onDelete(exercise._id)}}/></td>
        </tr>
    );
};

export default ExerciseItem;