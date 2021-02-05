import React from 'react';
import { useParams } from 'react-router-dom';
import useDetails from '../hooks/useDetails';

const Details = () => {
    const { passengerId } = useParams<{ passengerId: string }>();
    const data = useDetails(passengerId);

    if (Object.values(data).some(value => value === '')) {
        return null;
    }

    return (
        <div className="details">
            <p><span className="bold-text">Name: </span>{data.name}</p>
            <p><span className="bold-text">Country: </span>{data.country}</p>
            <p><span className="bold-text">Logo: </span>{data.logo}</p>
            <img src={data.logo} alt=""/>
            <p><span className="bold-text">Slogan: </span>{data.slogan}</p>
            <p><span className="bold-text">Head quaters: </span>{data.head_quaters}</p>
        </div>
    );
};

export default Details;
