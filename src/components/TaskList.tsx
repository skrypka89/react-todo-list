import React from 'react';
import { Task } from './Tasks';
import TaskListItem from './TaskListItem';

type TaskListProps = {
    delete: (id: number) => void;
    tasks: Task[];
};

const TaskList = (props: TaskListProps) => {
    return (
        <div className="taskList">
            {props.tasks.map((task, i) => {
                return <TaskListItem
                    id={i + 1}
                    onDelete={() => props.delete(task.id)}
                    key={task.id}
                    value={task.value}
                />
            })}
        </div>
    );
};

export default TaskList;
