package com.example.api.services.pickup_point.dto;

import lombok.Data;

@Data
public class GetListPickupPointOutput {
    private Long id;
    private String address;
    private Double latitude;
    private Double longitude;
}
