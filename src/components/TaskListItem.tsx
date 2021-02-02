import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type TaskProps = {
    id: number;
    userId: string;
    value: string;
    onDelete: () => void;
};

const TaskListItem = (props: TaskProps) => {
    const [done, setDone] = useState<boolean>(false);
    const doneClass = done ? 'done' : 'undone';
    const doneText = done ? 'Done' : 'Undone';
    const { id, userId, value, onDelete } = props;

    const changeState = (): void =>
        setDone(true)
    ;

    return (
        <div className={`task ${doneClass}`}>
            <div className="text-box">
                <span className="id">{id + '. '}</span>
                <span className="text">{value}</span>
            </div>
            <div className="link-box">
                <Link to={`/second-page/${userId}`}>View details</Link>
            </div>
            <div className="botton-box">
                <button onClick={changeState}>{doneText}</button>
                <button className="x-botton" onClick={onDelete}>X</button>
            </div>
        </div>
    );
};

export default TaskListItem;
