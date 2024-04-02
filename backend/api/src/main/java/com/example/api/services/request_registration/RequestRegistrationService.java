package com.example.api.services.request_registration;

import com.example.api.services.request_registration.dto.CreateRequestInput;

public interface RequestRegistrationService {
    void createRequest(CreateRequestInput input);
}
