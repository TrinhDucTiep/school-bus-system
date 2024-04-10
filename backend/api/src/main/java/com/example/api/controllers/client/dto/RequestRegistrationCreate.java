package com.example.api.controllers.client.dto;

import com.example.api.services.request_registration.dto.CreateRequestInput;
import java.util.List;
import lombok.Data;

@Data
public class RequestRegistrationCreate {
    private Long parentId;
    private List<StudentAddress> studentAddress;

    public CreateRequestInput toInput() {
        return CreateRequestInput.builder()
            .studentAddress(studentAddress)
            .parentId(parentId)
            .build();
    }
}

