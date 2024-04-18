package com.example.api.services.request_registration.dto;

import com.example.api.services.common_dto.ParentOutput;
import com.example.api.services.common_dto.RequestRegistrationOutput;
import com.example.api.services.common_dto.StudentOutput;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetListRequestRegistrationOutput {
    private ParentOutput parent;
    private StudentOutput student;
    private RequestRegistrationOutput requestRegistration;
}
