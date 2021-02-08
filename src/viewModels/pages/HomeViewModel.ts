import { observable } from 'mobx';
import { Item } from '../../models/AppModel';
import appController from '../../controllers/AppController';

export default class HomeViewModel {
    @observable
    private _inputValue: string = '';

    get inputValue(): string {
        return this._inputValue;
    }

    get items(): Item[] {
        return appController.items;
    }

    changeInputValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this._inputValue = event.target.value;
    };

    onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            this.createItem();
        }
    };

    createItem = (): void => {
        const inputValueTrim = this._inputValue.trim();

        if (!inputValueTrim) {
            return;
        }

        appController.createItem(inputValueTrim);
        this._inputValue = '';
    };

    updateItem = (passengerId: string): void => {
        appController.updateItem(passengerId, { done: true });
    };

    deleteItem = (passengerId: string): void => {
        appController.deleteItem(passengerId);
    };

    loadPage = async (): Promise<void> => {
        await appController.loadMore();
    };
}
