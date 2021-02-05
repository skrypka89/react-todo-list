import { FetchedData, Item, Fetched } from '../models/AppModel';

interface IAppController {
    loadMore(): Promise<Fetched>;
    getPassenger(passengerId: string): FetchedData | undefined;
    setItems(items: Item[]): void;
    getItems(): Item[];
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
        let items = {} as Fetched;

        try {
            items = await this._fetchPassengers(this._pageNumber);
            this._passengers.push(...items.data);
            this._pageNumber++;

        } catch (error) {
            console.log('Load more', error);
        } finally {
            return items;
        }
    }

    getPassenger(passengerId: string): FetchedData | undefined {
        return this._passengers.find(datum => datum!._id === passengerId);
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
