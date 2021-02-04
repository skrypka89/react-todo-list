import React from 'react';
import { Item } from '../models/AppModel';
import ListItem from './ListItem';

type ListProps = {
    items: Item[];
    onSetDone: (id: number) => void;
    onDelete: (id: number) => void;
};

const List = (props: ListProps) => {
    return (
        <div className="list">
            {props.items.map((item, index) => {
                return <ListItem
                    key={item.id}
                    id={index + 1}
                    passengerId={item.passengerId}
                    value={item.value}
                    done={item.done}
                    onSetDone={() => props.onSetDone(item.id)}
                    onDelete={() => props.onDelete(item.id)}
                />
            })}
        </div>
    );
};

export default List;
