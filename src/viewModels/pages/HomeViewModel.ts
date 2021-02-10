import { observable, makeObservable, action } from 'mobx';
import { Item } from '../../models/AppModel';
import appController from '../../controllers/AppController';

export default class HomeViewModel {
    @observable
    private _inputValue: string = '';

    @observable
    private _isVisible: boolean = false;

    constructor() {
        makeObservable(this);
    }

    get inputValue(): string {
        return this._inputValue;
    }

    get isVisible(): boolean {
        return this._isVisible;
    }

    get items(): Item[] {
        return appController.items;
    }

    @action
    changeInputValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this._inputValue = event.target.value;
        const inputValueTrim = this._inputValue.trim();
        this._isVisible = inputValueTrim === 'hi';
    };

    onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            this.createItem();
        }
    };

    @action
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
