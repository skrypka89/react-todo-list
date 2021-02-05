import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Item } from '../models/AppModel';
import appController from '../controllers/AppController';
import List from '../components/List';
import convertItemsFromFetched from '../utils/convertFetchedItems';

const Home = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [items, setItems] = useState<Item[]>(appController.getItems());

    useEffect(() => {
        const getInitialData = async () => {
            if (appController.getItems().length) {
                return;
            }

            const fetched = await appController.loadMore();
            const initialItems = convertItemsFromFetched(fetched);
            setItems(initialItems);
        };
        
        getInitialData();
        return () => {
            appController.setItems(items);
        };
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

        const item: Item = {
            passengerId: uuidv4().toString(),
            value: inputValueTrim,
            done: false
        };
        setItems([...items, item]);
        setInputValue('');
    };

    const changeDone = (id: string): void => {
        const itemsClone = [...items];
        const index = itemsClone.findIndex(item => item.passengerId === id);
        itemsClone[index].done = true;
        setItems(itemsClone);
    };

    const deleteItem = (id: string): void => {
        const itemsClone = [...items];
        const index = itemsClone.findIndex(item => item.passengerId === id);
        itemsClone.splice(index, 1);
        setItems(itemsClone);
    };

    const loadPage = async (): Promise<void> => {
        const fetched = await appController.loadMore();
        const page = convertItemsFromFetched(fetched);
        setItems([...items, ...page]);
    };

    console.log(0, '_render')
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
                onSetDone={changeDone}
                onDelete={deleteItem}
            />
            <button className="load-more-button" onClick={loadPage}>Load more</button>
        </div>
    );
};

export default Home;
