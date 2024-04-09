interface IPickupPoint {
    id: number;
    address: string;
    latitude: number;
    longitude: number;
}

interface IPickupPointTable {
    pickupPoint: IPickupPoint;
    students: IStudent[];
    rides: IRide[];
}

interface IGetListPickupPointParams {
    address?: string;
}