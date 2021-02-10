import { observer } from "mobx-react";
import React, { useMemo, useRef, useEffect } from 'react';
// import { autorun } from 'mobx';
import { reaction } from 'mobx';
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
    const bool = useRef<string>('false');

    useEffect(() => {
        const getInitialData = async () => {
            if (items.length) {
                return;
            }

            await loadPage();
        };

        getInitialData();
    });

    // autorun(() => {
    //     if (isVisible) {
    //         bool.current = 'true';
    //     } else {
    //         bool.current = 'false';
    //     }
    // });
    reaction(
        () => isVisible,
        isVisible => {
            if (isVisible) {
                bool.current = 'true';
            } else {
                bool.current = 'false';
            }
        },
        { fireImmediately: true }
    );

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
            <p className={`${bool.current} visible`}>Hello, world!</p>
        </div>
    );
});

export default Home;
