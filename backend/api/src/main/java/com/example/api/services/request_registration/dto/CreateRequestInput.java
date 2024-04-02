package com.example.api.services.request_registration.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateRequestInput {
    private Long studentId;
    private Long parentId;
    private String address;
    private Double longitude;
    private Double latitude;
}
