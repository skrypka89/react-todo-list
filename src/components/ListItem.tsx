import { observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';

type ItemProps = {
    id: number;
    passengerId: string;
    value: string;
    done: boolean;
    onSetDone: () => void;
    onDelete: () => void;
};

const ListItem = observer((props: ItemProps) => {
    const { id, passengerId, value, done, onSetDone, onDelete } = props;
    const doneClass = done ? 'done' : 'undone';
    const doneText = done ? 'Done' : 'Undone';

    return (
        <div className={`item ${doneClass}`}>
            <div className="text-box">
                <span className="id">{id + '. '}</span>
                <span className="text">{value}</span>
            </div>
            <div className="link-box">
                <Link to={`/second-page/${passengerId}`}>View details</Link>
            </div>
            <div className="botton-box">
                <button onClick={onSetDone}>{doneText}</button>
                <button className="x-botton" onClick={onDelete}>X</button>
            </div>
        </div>
    );
});

export default ListItem;
