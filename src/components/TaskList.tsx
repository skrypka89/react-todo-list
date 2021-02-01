import React from 'react';
import { Task } from './Home';
import TaskListItem from './TaskListItem';

type TaskListProps = {
    delete: (id: number) => void;
    tasks: Task[];
};

const TaskList = (props: TaskListProps) => {
    return (
        <div className="taskList">
            {props.tasks.map((task, index) => {
                return <TaskListItem
                    id={index + 1}
                    onDelete={() => props.delete(task.id)}
                    key={task.id}
                    value={task.value}
                />
            })}
        </div>
    );
};

export default TaskList;
