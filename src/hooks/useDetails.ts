import { useState, useEffect } from 'react';
import appController from '../controllers/AppController';
import { FetchedData, AirlineData } from '../models/AppModel';

type PartialAirlineData = {
    name: string;
    country: string;
    logo: string;
    slogan: string;
    head_quaters: string;
};

const initialData: PartialAirlineData = {
    name: '',
    country: '',
    logo: '',
    slogan: '',
    head_quaters: ''
};

const useDetails = (passengerId: string): PartialAirlineData => {
    const [data, setData] = useState<PartialAirlineData>(initialData);

    useEffect(() => {
        const fetchedData = appController.getPassenger(passengerId);
        const airlineData = getAirlineData(fetchedData);
        const { name, country, logo, slogan, head_quaters }: PartialAirlineData = airlineData ?
            airlineData :
            initialData
        ;
        setData({ name, country, logo, slogan, head_quaters });
    }, [passengerId]);

    const getAirlineData = (fetchedData: FetchedData | undefined): AirlineData | null => {
        if (!fetchedData) {
            return null;
        }

        const airlineData = Array.isArray(fetchedData.airline) ?
            fetchedData.airline[0] :
            fetchedData.airline
        ;
        return airlineData;
    };

    return data;
};

export default useDetails;
