interface IRide {
    id: number;
    busId: number;
    startAt: string;
    endAt: string;
    startFrom: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

interface IUpsertRideRequest {
    id: number | null;
    busId: number | null;
    startAt: string | null;
    endAt: string | null;
    startFrom: string | null;
    pickupPointIds: number[] | null;
}