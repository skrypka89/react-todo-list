import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Item, Fetched } from '../models/AppModel';
import appController from '../controllers/AppController';
import List from './List';

const Home = () => {
    const [items, setItems] = useState<Item[]>(appController.getItems());
    const [inputValue, setInputValue] = useState<string>('');
    const [pageNumber, setPageNumber] = useState<number>(appController.getPageNumber());
    const counter = useRef<number>(appController.getCounter());

    useEffect(() => {
        const getInitialData = async () => {
            if (appController.getItems().length) {
                return;
            }

            const fetched = await appController.fetchPassengers(0);
            const initialItems = getItemsFromFetched(fetched);
            setItems(initialItems);
        };
        
        const count = counter.current;
        getInitialData();
        return () => {
            appController.setItems(items);
            appController.setPageNumber(pageNumber);
            appController.setCounter(count);
        };
    }, [items, pageNumber]);

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
            id: counter.current++,
            passengerId: uuidv4(),
            value: inputValueTrim,
            done: false
        };
        setItems([...items, item]);
        setInputValue('');
    };

    const changeDone = (id: number): void => {
        const itemsClone = [...items];
        const index = itemsClone.findIndex(item => item.id === id);
        itemsClone[index].done = true;
        setItems(itemsClone);
    };

    const deleteItem = (id: number): void => {
        const itemsClone = [...items];
        const index = itemsClone.findIndex(item => item.id === id);
        itemsClone.splice(index, 1);
        setItems(itemsClone);
    };

    const getItemsFromFetched = (fetched: Fetched): Item[] => {
        return fetched.data.map(datum => {
            if (Array.isArray(datum.airline)) {
                return {
                    id: counter.current++,
                    passengerId: datum._id,
                    value: datum.airline[0].slogan,
                    done: false
                };
            } else {
                return {
                    id: counter.current++,
                    passengerId: datum._id,
                    value: datum.airline.slogan,
                    done: false
                };
            }
        });
    };

    const loadPage = async (): Promise<void> => {
        setPageNumber(pageNumber + 1);
        const fetched = await appController.fetchPassengers(pageNumber);
        const page = getItemsFromFetched(fetched);
        setItems([...items, ...page]);
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
                onSetDone={changeDone}
                onDelete={deleteItem}
            />
            <button className="load-more-button" onClick={loadPage}>Load more</button>
        </div>
    );
};

export default Home;
