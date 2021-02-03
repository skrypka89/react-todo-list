import React from 'react';
import { useParams } from 'react-router-dom';
import useDetails from './../hooks/useDetails';

const Details = () => {
    const { userId } = useParams<{ userId: string }>();
    const data = useDetails(userId);

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
