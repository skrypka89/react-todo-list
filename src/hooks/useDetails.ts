import { useState, useEffect } from 'react';
import { FetchedData, AirlineData } from './../components/Home';

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

const useDetails = (userId: string): PartialAirlineData => {
    const [data, setData] = useState<PartialAirlineData>(initialData);

    useEffect(() => {
        const getDetails = async () => {
            const fetchedData = await fetchUserData(userId);
            const airlineData = getAirlineData(fetchedData);
            const { name, country, logo, slogan, head_quaters }: PartialAirlineData = airlineData ?
                airlineData :
                initialData
            ;
            setData({ name, country, logo, slogan, head_quaters });
        };

        getDetails();
    }, [userId]);

    const fetchUserData = async (userId: string): Promise<FetchedData | null> => {
        let fetchedData: FetchedData | null;

        try {
            const response = await fetch(`https://api.instantwebtools.net/v1/passenger/${userId}`);
            fetchedData = await response.json() as FetchedData;
        } catch {
            fetchedData = null;
        }
        
        return fetchedData;
    };

    const getAirlineData = (fetchedData: FetchedData | null): AirlineData | null => {
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
