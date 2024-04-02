package com.example.api.controllers.client.dto;

import com.example.api.services.request_registration.dto.CreateRequestInput;
import com.example.shared.enumeration.RequestRegistrationStatus;
import lombok.Data;

@Data
public class CreateRequestRequest {
    private Long studentId;
    private Long parentId;
    private String address;
    private Double longitude;
    private Double latitude;

    public CreateRequestInput toInput() {
        return CreateRequestInput.builder()
                .studentId(studentId)
                .parentId(parentId)
                .address(address)
                .longitude(longitude)
                .latitude(latitude)
                .build();
    }
}
