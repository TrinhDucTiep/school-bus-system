package com.example.api.services.request_registration.dto;

import com.example.shared.db.entities.Parent;
import com.example.shared.db.entities.RequestRegistration;
import com.example.shared.db.entities.Student;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetListRequestRegistrationOutput {
    private Parent parent;
    private Student student;
    private RequestRegistration requestRegistration;
}
