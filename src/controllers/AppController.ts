import { v4 as uuidv4 } from 'uuid';
import { FetchedData, Item, Fetched } from '../models/AppModel';
import convertFetched from '../utils/convertFetched';

interface IAppController {
    readonly items: Item[];
    loadMore(): Promise<void>;
    getPassenger(passengerId: string): FetchedData | undefined;
    createItem(inputValueTrim: string): void;
    updateItem(passengerId: string, partial: Partial<Item>): void;
    deleteItem(passengerId: string): void;
}

class AppController implements IAppController {
    private _pageNumber: number = 0;
    private _passengers: FetchedData[] = [];
    private _items: Item[] = [];

    private async _fetchPassengers(pageNumber: number, size: number = 5) {
        const response = await fetch(`https://api.instantwebtools.net/v1/passenger?page=${pageNumber}&size=${size}`);
        const fetched = await response.json() as Fetched;
        return fetched;
    }

    get items() {
        return this._items;
    }

    async loadMore(): Promise<void> {
        let fetched = {} as Fetched;

        try {
            fetched = await this._fetchPassengers(this._pageNumber);
            this._passengers = this._passengers.concat(fetched.data);
            const items = convertFetched(fetched);
            this._items = this._items.concat(items);
            this._pageNumber++;
        } catch (error) {
            console.log('Load more', error);
        }
    }

    getPassenger(passengerId: string): FetchedData | undefined {
        return this._passengers.find(datum => datum!._id === passengerId);
    }

    createItem(inputValueTrim: string): void {
        const item: Item = {
            passengerId: uuidv4(),
            value: inputValueTrim,
            done: false,
        };
        this._items.push(item);
    }

    updateItem(passengerId: string, partial: Partial<Item>): void {
        const index = this._items.findIndex(item => item.passengerId === passengerId);
        this._items[index] = Object.assign(this._items[index], partial);
    }

    deleteItem(passengerId: string): void {
        const index = this._items.findIndex(item => item.passengerId === passengerId);

        if (!~index) {
            return;
        }

        this._items.splice(index, 1);
    }
};

const appController = new AppController();

export default appController;
