import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FetchedData, AirlineData } from './Home';

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

const Details = () => {
    const { userId } = useParams<{ userId: string }>();
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

    return (
        <div className="details">
            {Object.values(data).some(value => value === '') ?
                null :
                <>
                    <p><span className="bold-text">Name: </span>{data.name}</p>
                    <p><span className="bold-text">Country: </span>{data.country}</p>
                    <p><span className="bold-text">Logo: </span>{data.logo}</p>
                    <p><span className="bold-text">Slogan: </span>{data.slogan}</p>
                    <p><span className="bold-text">Head quaters: </span>{data.head_quaters}</p>
                </>
            }
        </div>
    );
};

export default Details;
