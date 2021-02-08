import React, { useEffect } from 'react';
import { observer, useLocalObservable } from "mobx-react";
import { Item } from '../models/AppModel';
import appController from '../controllers/AppController';
import List from '../components/List';

type Input = {
    value: string;
    setValue: (str: string) => void;
};

type Items = {
    values: Item[];
    setItems: (newItes: Item[]) => void;
};

const Home = observer(() => {
    const input = useLocalObservable<Input>(() => ({
        value: '',
        setValue(str) {
            this.value = str;
        }
    }));
    const items = useLocalObservable<Items>(() => ({
        values: appController.items,
        setItems(newItems) {
            this.values = newItems;
        }
    }));

    useEffect(() => {
        const getInitialData = async () => {
            if (appController.items.length) {
                return;
            }

            await appController.loadMore();
            items.setItems(appController.items);
        };

        getInitialData();
    }, [items]);

    const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            createItem();
        }
    };

    const createItem = (): void => {
        const inputValueTrim = input.value.trim();

        if (!inputValueTrim) {
            return;
        }

        appController.createItem(inputValueTrim);
        items.setItems(appController.items);
        input.setValue('');
    };

    const updateItem = (passengerId: string): void => {
        appController.updateItem(passengerId, { done: true });
        items.setItems(appController.items);
    };

    const deleteItem = (passengerId: string): void => {
        appController.deleteItem(passengerId);
        items.setItems(appController.items);
    };

    const loadPage = async (): Promise<void> => {
        await appController.loadMore();
        items.setItems(appController.items);
    };

    return (
        <div className="home">
            <div className="form-box">
                <input
                    type="text"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => input.setValue(event.target.value)}
                    onKeyPress={onKeyUp}
                    value={input.value}
                />
                <button className="add-button" onClick={createItem}>Add</button>
            </div>
            <List
                items={items.values}
                onSetDone={updateItem}
                onDelete={deleteItem}
            />
            <button className="load-more-button" onClick={loadPage}>Load more</button>
        </div>
    );
});

export default Home;
