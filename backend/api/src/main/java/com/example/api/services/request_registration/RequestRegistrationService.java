package com.example.api.services.request_registration;

import com.example.api.services.request_registration.dto.CreateRequestInput;
import com.example.api.services.request_registration.dto.GetListRequestRegistrationOutput;
import com.example.shared.db.entities.Account;
import java.util.List;

public interface RequestRegistrationService {
    void upsertRegistration(CreateRequestInput input, Account account);

    List<GetListRequestRegistrationOutput> getListRequestRegistration(Account account);
}
