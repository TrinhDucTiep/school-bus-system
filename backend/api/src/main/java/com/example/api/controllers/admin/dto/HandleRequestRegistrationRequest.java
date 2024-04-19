package com.example.api.controllers.admin.dto;

import com.example.api.services.request_registration.dto.HandleRequestRegistrationInput;
import com.example.shared.enumeration.RequestRegistrationStatus;
import lombok.Data;

@Data
public class HandleRequestRegistrationRequest {
    private Long requestId;
    private RequestRegistrationStatus status;
    private Long pickupPointId;
    private String address;
    private Double latitude;
    private Double longitude;

    public HandleRequestRegistrationInput toInput() {
        return HandleRequestRegistrationInput.builder()
            .requestId(requestId)
            .status(status)
            .pickupPointId(pickupPointId)
            .address(address)
            .latitude(latitude)
            .longitude(longitude)
            .build();
    }
}
