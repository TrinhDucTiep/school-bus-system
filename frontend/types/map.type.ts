interface IPosition {
    latitude: number;
    longitude: number;
}

interface ICoordinates {
    value: number[];
}

interface IGeometry {
    coordinates: ICoordinates;
    type: string;
}

interface IProperties {
    id: string;
    continent: string;
    label: string;
    name: string;
    street: string;
    county: string;
    region: string;
    country: string;
}

interface IFeature {
    geometry: IGeometry;
    properties: IProperties;
    type: string;
}

interface IAutoCompleteGetResponse {
    features: IFeature[];
    type: string;
}

interface IAutoCompleteParams {
    text: string;
    focus?: {
        point?: {
            lon?: number | null;
            lat?: number | null;
        } | null;
    } | null;
    boundary?: {
        rect?: {
            min_lon?: number | null;
            min_lat?: number | null;
            max_lon?: number | null;
        } | null;
        country?: string | null;
    } | null;
}