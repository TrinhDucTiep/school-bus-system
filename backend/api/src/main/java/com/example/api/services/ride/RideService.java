package com.example.api.services.ride;

import com.example.api.services.ride.dto.AddRideInput;
import com.example.api.services.ride.dto.UpdateRideInput;

public interface RideService {
    void addRide(AddRideInput addRideInput);

    void updateRide(UpdateRideInput updateRideInput);
}
