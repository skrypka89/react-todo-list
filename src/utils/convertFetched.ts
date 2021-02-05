import { Fetched, Item } from '../models/AppModel';

export default function convertFetched(fetched: Fetched): Item[] {
    return fetched.data.map(datum => {
        if (Array.isArray(datum.airline)) {
            return {
                id: datum._id,
                passengerId: datum._id,
                value: datum.airline[0].slogan,
                done: false
            };
        } else {
            return {
                id: datum._id,
                passengerId: datum._id,
                value: datum.airline.slogan,
                done: false
            };
        }
    });
};