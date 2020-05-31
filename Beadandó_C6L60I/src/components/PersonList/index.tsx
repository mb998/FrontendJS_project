import React from 'react';
import IPerson from '../Person';
import './PersonList.css';
import Item from '../Item';

const PersonList: React.FunctionComponent = () =>
{
    const [personellList, setPersonellList] = React.useState<IPerson []>([]);
    
    React.useEffect(() =>
	{
        Initialize();
    }, []);
	
	const [controlAdd, setControlAdd] = React.useState<{value: boolean, type: number}>({value: true, type: 1});
	
    const inputFunction = (type: number) =>
	{
        setControlAdd({value: (controlAdd.value) ? false: true, type: type});
    }

	const [newPerson, setNewPerson] = React.useState<any>
	({
        id: 0,
        name: '',
        lastname: '',
        birthLoc: ''
    });

    const handleInput = ({target: {name, value}}: React.ChangeEvent<HTMLInputElement>) =>
	{
        setNewPerson({...newPerson, [name]: value});
    }
	
    const saveNew = () =>
	{
        if (newPerson)
		{
            if (newPerson.name && newPerson.lastname && newPerson.birthLoc)
			{
                newPerson.id = (personellList.length > 0) ? personellList[personellList.length - 1].id + 1 : 0;
                Reset();
                personellList.push(newPerson);
                saveData(personellList);
                inputFunction(1);
            }
			else
			{
				alert('Az összes mezőt töltsd ki!');
            }
        }
    }

    const saveData = (list: IPerson []) =>
	{
        localStorage.setItem('people', JSON.stringify(list));
    }
	
    const Reset = () =>
	{
        setNewPerson({id: '', name: '', lastname: '', birthLoc: ''});
    }
	
	const handleEdit = (id: number) =>
	{
        const itemToUpdate: any = personellList.find(item => item.id === id);
        setNewPerson({id: itemToUpdate.id, name: itemToUpdate.name, lastname: itemToUpdate.lastname, birthLoc: itemToUpdate.birthLoc});
        inputFunction(2);
    }

    const saveEdit = () =>
	{
        const indexUpdate = personellList.findIndex(item => item.id === newPerson.id);
        if (indexUpdate !== -1)
		{
            let p = personellList;
            p.splice(indexUpdate, 1, newPerson);
            setPersonellList(p);
            saveData(p);
            Reset();
            inputFunction(1);
        }
    }

    const handleDelete = (id: number) =>
	{
        const itemDelete = personellList.findIndex(item => item.id === id);
		
        if (itemDelete !== -1)
		{
            let p = personellList;
            p.splice(itemDelete, 1);
            setPersonellList(p);
            saveData(p);
            Reset();
        }
    }
	
	const Initialize = () =>
	{
        const people = localStorage.getItem('people');
        if (people)
		{
            setPersonellList(JSON.parse(people));
        }
		else
		{
            setPersonellList([]);
        }
    }

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Műveletek</th>
                        <th scope="col">ID</th>
                        <th scope="col">Vezetéknév</th>
                        <th scope="col">Keresztnév</th>
                        <th scope="col">Születési hely</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <button id="new" className={`${controlAdd.value ? 'show' : 'hide'}`} onClick={() => inputFunction(1)}> Új rekord </button>
                            <button id="save" className={`${!controlAdd.value ? 'show' : 'hide'}`} onClick={(controlAdd.type === 1) ? saveNew: saveEdit}> Mentés </button>
                        </td>
                        <td> -- </td>
                        <td><input placeholder="Ide írd a vezetéknevet" name="name" onChange={handleInput} disabled={controlAdd.value} value={newPerson.name}/></td>
                        <td><input placeholder="Ide a keresztnevet" name="lastname" onChange={handleInput} disabled={controlAdd.value} value={newPerson.lastname}/></td>
                        <td><input placeholder="Ide a születési helyet" name="birthLoc" onChange={handleInput} disabled={controlAdd.value} value={newPerson.birthLoc}/></td>
                    </tr>
                    <tr>
                        <td className={personellList.length > 0 ? 'hide': ''} colSpan={5}> A nyilvántartás jelenleg üres </td>
                    </tr>
                    {personellList.map((person) => (<Item person={person} key={person.id} handleDelete={handleDelete} handleEdit={handleEdit}/>))}
                </tbody>
            </table>
        </div>
    );
}

export default PersonList;