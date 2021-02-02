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
                    key={task.id}
                    id={index + 1}
                    userId={task.userId}
                    value={task.value}
                    onDelete={() => props.delete(task.id)}
                />
            })}
        </div>
    );
};

export default TaskList;
