import React, { useState, useEffect } from 'react';
import { Item } from '../models/AppModel';
import appController from '../controllers/AppController';
import List from '../components/List';

const Home = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [items, setItems] = useState<Item[]>(appController.items);

    useEffect(() => {
        const getInitialData = async () => {
            if (appController.items.length) {
                return;
            }

            await appController.loadMore();
            setItems(appController.items);
        };

        getInitialData();
    }, [items]);

    const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            createItem();
        }
    };

    const createItem = (): void => {
        const inputValueTrim = inputValue.trim();

        if (!inputValueTrim) {
            return;
        }

        appController.createItem(inputValueTrim);
        setItems(appController.items);
        setInputValue('');
    };

    const updateItem = (passengerId: string): void => {
        appController.updateItem(passengerId, { done: true });
        setItems([...appController.items]);
    };

    const deleteItem = (passengerId: string): void => {
        appController.deleteItem(passengerId);
        setItems([...appController.items]);
    };

    const loadPage = async (): Promise<void> => {
        await appController.loadMore();
        setItems(appController.items);
    };

    return (
        <div className="home">
            <div className="form-box">
                <input
                    type="text"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value)}
                    onKeyPress={onKeyUp}
                    value={inputValue}
                />
                <button className="add-button" onClick={createItem}>Add</button>
            </div>
            <List
                items={items}
                onSetDone={updateItem}
                onDelete={deleteItem}
            />
            <button className="load-more-button" onClick={loadPage}>Load more</button>
        </div>
    );
};

export default Home;
