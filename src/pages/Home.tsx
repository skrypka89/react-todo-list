import { observer } from "mobx-react";
import React, { useMemo, useEffect } from 'react';
import HomeViewModel from '../viewModels/pages/HomeViewModel';
import List from '../components/List';

const Home = observer(() => {
    const model = useMemo(() => new HomeViewModel(), []); 
    const {
        inputValue,
        isVisible,
        items,
        changeInputValue,
        onKeyUp,
        createItem,
        updateItem,
        deleteItem,
        loadPage
    } = model;

    useEffect(() => {
        const getInitialData = async () => {
            if (items.length) {
                return;
            }

            await loadPage();
        };

        getInitialData();
    });

    return (
        <div className="home">
            <div className="form-box">
                <input
                    type="text"
                    onChange={changeInputValue}
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
            {isVisible && <p className="visible">Hello, world!</p>}
        </div>
    );
});

export default Home;
