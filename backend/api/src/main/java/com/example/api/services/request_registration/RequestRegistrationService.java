package com.example.api.services.request_registration;

import com.example.api.services.request_registration.dto.CreateRequestInput;
import com.example.shared.db.entities.Account;

public interface RequestRegistrationService {
    void upsertRegistration(CreateRequestInput input, Account account);
}
