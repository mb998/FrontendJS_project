import React from 'react';
import './actions.css';

interface IActionProp
{
    handleEdit: ({target}: React.MouseEvent<HTMLButtonElement>) => void;
    handleDelete: ({target}: React.MouseEvent<HTMLButtonElement>) => void;
}

const Actions: React.FunctionComponent<IActionProp> = ({handleEdit, handleDelete}) =>
{
    return (
        <div>
            <button id="del" type="button" onClick={handleDelete}> Törlés </button>
            <button id="edit" type="button" onClick={handleEdit}> Szerkesztés </button>
        </div>
    );
}

export default Actions;