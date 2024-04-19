package com.example.api.services.request_registration.dto;

import com.example.shared.enumeration.RequestRegistrationStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HandleRequestRegistrationInput {
    private Long requestId;
    private RequestRegistrationStatus status;
    private Long pickupPointId;
    private String address;
    private Double latitude;
    private Double longitude;
}
