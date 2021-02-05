import React from 'react';
import { Item } from '../models/AppModel';
import ListItem from './ListItem';

type ListProps = {
    items: Item[];
    onSetDone: (id: string) => void;
    onDelete: (id: string) => void;
};

const List = (props: ListProps) => {
    return (
        <div className="list">
            {props.items.map((item, index) => {
                return <ListItem
                    key={item.passengerId}
                    id={index + 1}
                    passengerId={item.passengerId}
                    value={item.value}
                    done={item.done}
                    onSetDone={() => props.onSetDone(item.passengerId)}
                    onDelete={() => props.onDelete(item.passengerId)}
                />
            })}
        </div>
    );
};

export default List;
