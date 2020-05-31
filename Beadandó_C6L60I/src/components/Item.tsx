import React from 'react';
import IPerson from './Person';
import Actions from './Actions/index';

interface IPersonProps
{
    person: IPerson;
	
    handleEdit: (id: number) => void;
    handleDelete: (id: number) => void;
}

const Item: React.FunctionComponent<IPersonProps> = ({person, handleEdit, handleDelete}) =>
(
    <tr>
        <td><Actions handleEdit={() => handleEdit(person.id)} handleDelete={() => handleDelete(person.id)}/></td>
        <td>{person.id}</td>
        <td>{person.name}</td>
        <td>{person.lastname}</td>
        <td>{person.birthLoc}</td>
    </tr>
);

export default Item;