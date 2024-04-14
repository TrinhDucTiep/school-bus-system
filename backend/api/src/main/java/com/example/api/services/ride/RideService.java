package com.example.api.services.ride;

import com.example.api.services.ride.dto.UpsertRideInput;
import com.example.api.services.ride.dto.UpdateRideInput;

public interface RideService {
    void upsertRide(UpsertRideInput upsertRideInput);

    void updateRide(UpdateRideInput updateRideInput);
}
