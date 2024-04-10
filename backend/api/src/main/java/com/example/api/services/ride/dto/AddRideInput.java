package com.example.api.services.ride.dto;

import java.time.Instant;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddRideInput {
    private Long busId;
    private Instant startAt;
    private Instant endAt;
    private String startFrom;

    private List<Long> pickupPointIds;
}
