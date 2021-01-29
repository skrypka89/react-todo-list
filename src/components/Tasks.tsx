import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';

export type Task  = {
    id: number;
    value: string;
};

type FetchedTask = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

let counter = 5

const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        const getInitialTasks = async () => {
            const arr = await fetchTask();
            console.log('hi');
            const initialTasks = convertFetchedTask(arr);
            setTasks(initialTasks);
        };
        
        getInitialTasks()
    }, []);

    const fetchTask = async (): Promise<FetchedTask[]> => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
        const fetchedTask = await response.json() as FetchedTask[];
        return fetchedTask;
    };

    const convertFetchedTask = (arr: FetchedTask[]): Task[] =>
        arr.map((task, index) =>
            ({ id: index, value: task.title })
        ).slice(0, 5)
    ;

    const createTask = (): void => {
        const inputValueTrim = inputValue.trim();

        if (inputValueTrim) {
            setTasks([
                ...tasks,
                { id: counter++, value: inputValueTrim }
            ]);
            setInputValue('');
        }
    };

    const changeInputValue = (event: React.ChangeEvent<HTMLInputElement>): void =>
        setInputValue(event.target.value)
    ;

    const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            createTask();
        }
    };

    const deleteTask = (id: number): void => {
        const tasksClone = [...tasks];
        const index = tasksClone.findIndex(task => task.id === id);
        tasksClone.splice(index, 1);
        setTasks(tasksClone);
    };

    return (
        <div className="tasks">
            <div className="form-box">
                <input
                    type="text"
                    onChange={changeInputValue}
                    onKeyPress={onKeyUp}
                    value={inputValue}
                />
                <button className="add-button" onClick={createTask}>Add</button>
            </div>
            <TaskList delete={deleteTask} tasks={tasks} />
        </div>
    );
};

export default Tasks;
