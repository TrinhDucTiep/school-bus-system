interface IRidePickupPoint {
    id: number;
    rideId: number;
    pickupPointId: number;
    order: number;
    status: string;
    created_at: string;
    updated_at: string;
}

// employee
interface IEmployeeUpdateRidePickupPointRequest {
    rideId: number;
    pickupPointId: number;
    status: string;
}