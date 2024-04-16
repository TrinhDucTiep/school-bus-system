package com.example.api.services.common_dto;

import com.example.shared.enumeration.RidePickupPointStatus;
import java.time.Instant;

public class RidePickupPointOutput {
    private Long id;
    private Long rideId;
    private Long pickupPointId;
    private Integer orderIndex;
    private RidePickupPointStatus status;

    private Instant createdAt;
    private Instant updatedAt;
}
