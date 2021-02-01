import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';

export type Task  = {
    id: number;
    value: string;
};

type AirlineData = {
    id: number;
    name: string;
    country: string;
    logo: string;
    slogan: string;
    head_quaters: string;
    website: string;
    established: string;
};

type FetchedData = {
    _id: string;
    name: string;
    trips: number;
    airline: AirlineData | AirlineData[];
    __v: number;
};

type Fetched = {
    totalPassengers: number;
    totalPages: number;
    data: FetchedData[];
};

let counter = 0

const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [pageNumber, setPageNumber] = useState<number>(1);

    useEffect(() => {
        const getInitialTasks = async () => {
            const fetched = await fetchPageData(0);
            const initialPage = getPageFromFetched(fetched);
            setTasks(initialPage);
        };
        
        getInitialTasks();
    }, []);

    const fetchPageData = async (pageNumber: number): Promise<Fetched> => {
        const response = await fetch(`https://api.instantwebtools.net/v1/passenger?page=${pageNumber}&size=5`);
        const fetched = await response.json() as Fetched;
        return fetched;
    };

    const getPageFromFetched = (fetched: Fetched): Task[] =>
        fetched.data.map(datum => {
            if (Array.isArray(datum.airline)) {
                return { id: counter++, value: datum.airline[0].slogan };
            } else {
                return { id: counter++, value: datum.airline.slogan };
            }
        })
    ;

    const createTask = (): void => {
        const inputValueTrim = inputValue.trim();

        if (inputValueTrim) {
            setTasks([
                ...tasks,
                { id: counter++, value: inputValueTrim }
            ]);
            setInputValue('');
        }
    };

    const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            createTask();
        }
    };

    const loadPage = async (): Promise<void> => {
        setPageNumber(pageNumber + 1);
        const fetched = await fetchPageData(pageNumber);
        const page = getPageFromFetched(fetched);
        setTasks([...tasks, ...page]);
    };

    const deleteTask = (id: number): void => {
        const tasksClone = [...tasks];
        const index = tasksClone.findIndex(task => task.id === id);
        tasksClone.splice(index, 1);
        setTasks(tasksClone);
    };

    return (
        <div className="tasks">
            <div className="form-box">
                <input
                    type="text"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value)}
                    onKeyPress={onKeyUp}
                    value={inputValue}
                />
                <button className="add-button" onClick={createTask}>Add</button>
            </div>
            <TaskList delete={deleteTask} tasks={tasks} />
            <button className="load-more-button" onClick={loadPage}>Load more</button>
        </div>
    );
};

export default Tasks;
