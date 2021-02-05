export type Item  = {
    passengerId: string;
    value: string;
    done: boolean;
};

export type AirlineData = {
    id: number;
    name: string;
    country: string;
    logo: string;
    slogan: string;
    head_quaters: string;
    website: string;
    established: string;
};

export type FetchedData = {
    _id: string;
    name: string;
    trips: number;
    airline: AirlineData | AirlineData[];
    __v: number;
};

export type Fetched = {
    totalPassengers: number;
    totalPages: number;
    data: FetchedData[];
};
