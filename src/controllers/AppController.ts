import { FetchedData, Item, Fetched } from '../models/AppModel';
import convertItemsFromFetched from '../utils/convertFetchedItems';

interface IAppController {
    readonly items: Item[];

    loadMore(): Promise<void>;
    getPassenger(passengerId: string): FetchedData | undefined;
    addItem(item: Item): void;

    deleteItem(itemId: string): void;
    updateItem(item: Item): void;
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

    public async loadMore() {
        let fetchedPassengers = {} as Fetched;

        try {
            fetchedPassengers = await this._fetchPassengers(this._pageNumber);
            this._passengers = this._passengers.concat(fetchedPassengers.data);
            const convertedItems = convertItemsFromFetched(fetchedPassengers);
            this._items = this._items.concat(convertedItems);
            this._pageNumber++;

        } catch (error) {
            console.log('Load more', error);
        }
    }

    get items() { return this._items; }

    getPassenger(passengerId: string): FetchedData | undefined {
        return this._passengers.find(datum => datum!._id === passengerId);
    }

    addItem(item: Item) {
        if (!item) {
            return;
        }

        const isExist = this.items.find(el => el.passengerId === item.passengerId);

        if (!isExist) {
            this._items.push(item);
        }
    }

    deleteItem(itemId: string) {

    }

    updateItem(item: Item) {

    }
};

const appController = new AppController();

export default appController;
