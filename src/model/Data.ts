export interface Place {
    postal_code: string;
    country_code: string;
    latitude: string;
    longitude: string;
    city: string;
    state: string;
    city_en: string;
    state_en: string;
    state_code: string;
    province: string;
    province_code: string;
}

export interface Results {
    [key: string]: Place[];
}

export interface Query {
    codes: string[];
    country: null;
}

export interface Data {
    query: Query;
    results: Results;
}
