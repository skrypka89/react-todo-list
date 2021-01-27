import React from 'react';
import TaskList from './TaskList';

export type Task  = {
    id: number;
    value: string;
};

type TasksState = {
    tasks: Task[];
    inputValue: string;
};

let counter = 0

class Tasks extends React.Component {
    state: TasksState = {
        tasks: [],
        inputValue: ''
    };

    createTaskHandler = (): void => {
        let { tasks, inputValue } = this.state;
        inputValue = inputValue.trim();

        if (inputValue) {
            this.setState({
                tasks: [
                    ...tasks,
                    {
                        id: counter++,
                        value: inputValue
                    }
                ],
                inputValue: ''
            });
        }
    }

    changeInputValueHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ inputValue: event.target.value });
    }

    onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            this.createTaskHandler();
        }
    }

    deleteTaskHandler = (id: number): void => {
        const tasks = [...this.state.tasks];
        const index = tasks.findIndex(task => task.id === id);
        tasks.splice(index, 1);
        this.setState({ tasks });
    }

    render() {
        const { tasks, inputValue } = this.state;

        return (
            <div className="tasks">
                <div className="form-box">
                    <input
                        type="text"
                        onChange={this.changeInputValueHandler}
                        onKeyPress={this.onKeyUp}
                        value={inputValue}
                    />
                    <button className="add-button" onClick={this.createTaskHandler}>Add</button>
                </div>
                <TaskList delete={this.deleteTaskHandler} tasks={tasks} />
            </div>
        );
    }
}

export default Tasks;
