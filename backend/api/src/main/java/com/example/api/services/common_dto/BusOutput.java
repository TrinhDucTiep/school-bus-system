package com.example.api.services.common_dto;

import com.example.shared.enumeration.BusStatus;
import java.time.Instant;

public class BusOutput {
    private Long id;
    private String numberPlate;
    private Integer seatNumber;
    private Long driverId;
    private Long driverMateId;
    private BusStatus status;
    private Double currentLatitude;
    private Double currentLongitude;

    private Instant createdAt;
    private Instant updatedAt;
}
