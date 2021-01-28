import React, { useState } from 'react';
import TaskList from './TaskList';

export type Task  = {
    id: number;
    value: string;
};

let counter = 2

const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 0, value: 'Go to the gym' },
        { id: 1, value: 'Create a React todo list based on hooks' }
    ]);
    const [inputValue, setInputValue] = useState<string>('');

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
