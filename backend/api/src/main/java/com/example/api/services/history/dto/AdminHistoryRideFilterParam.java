package com.example.api.services.history.dto;

import java.time.Instant;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminHistoryRideFilterParam {
    // filter for ride
    private Instant startAt;
    private Integer rideId;
    private String numberPlate;
    private String status;
    private Boolean isToSchool;
    private String address;

    // filter for student
    private String studentPhoneNumber;
    private String parentPhoneNumber;

    private Integer page;
    private Integer size;
    private String sort;
}
