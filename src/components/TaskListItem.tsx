import React from 'react';

type TaskProps = {
    id: number;
    onDelete: () => void;
    value: string;
};

type TaskState = {
    done: boolean;
};

class TaskListItem extends React.Component<TaskProps> {
    state: TaskState = {
        done: false
    };

    changeStateHandler = (): void => {
        this.setState({ done: true });
    }

    render() {
        const doneClass = this.state.done ? 'done' : 'undone';
        const doneText = this.state.done ? 'Done' : 'Undone';
        const { id, value, onDelete } = this.props;

        return (
            <div className={`task ${doneClass}`}>
                <div className="text-box">
                    <span className="id">{id + '. '}</span>
                    <span className="text">{value}</span>
                </div>
                <div className="botton-box">
                    <button onClick={this.changeStateHandler}>{doneText}</button>
                    <button className="x-botton" onClick={onDelete}>X</button>
                </div>
            </div>
        );
    }
}

export default TaskListItem;
