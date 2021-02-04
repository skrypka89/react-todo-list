import { FetchedData, Item, Fetched } from '../models/AppModel';

interface IAppController {
    setPageNumber(pageNumber: number): void;
    getPageNumber(): number;
    fetchPassengers(pageNumber: number, size?: number): Promise<Fetched>;
    getPassenger(passengerId: string): FetchedData | undefined;
    setCounter(counter: number): void;
    getCounter(): number;
    setItems(items: Item[]): void;
    getItems(): Item[];
}

const AppController = class implements IAppController {
    private _pageNumber: number = 1;
    private _passengers: FetchedData[] = [];
    private _counter: number = 0;
    private _items: Item[] = [];

    setPageNumber(pageNumber: number): void {
        this._pageNumber = pageNumber;
    }

    getPageNumber(): number {
        return this._pageNumber;
    }

    async fetchPassengers(pageNumber: number, size: number = 5): Promise<Fetched> {
        const response = await fetch(`https://api.instantwebtools.net/v1/passenger?page=${pageNumber}&size=${size}`);
        const fetched = await response.json() as Fetched;
        this._passengers.push(...fetched.data);
        return fetched;
    }

    getPassenger(passengerId: string): FetchedData | undefined {
        return this._passengers.find(datum => datum!._id === passengerId);
    }

    setCounter(counter: number): void {
        this._counter = counter;
    }

    getCounter(): number {
        return this._counter;
    }

    setItems(items: Item[]): void {
        this._items = [...items];
    }

    getItems(): Item[] {
        return this._items;
    }
};

const appController = new AppController();

export default appController;
