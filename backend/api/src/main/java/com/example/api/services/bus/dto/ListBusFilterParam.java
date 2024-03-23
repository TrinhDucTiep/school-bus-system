package com.example.api.services.bus.dto;

import com.example.shared.enumeration.BusStatus;
import lombok.Data;

@Data
public class ListBusFilterParam {
    private String numberPlate;
    private Integer seatNumber;
    private BusStatus status;
    private String driverName;
    private Long driverId;
    private String driverMateName;
    private Long driverMateId;
}
