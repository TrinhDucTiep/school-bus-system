package com.example.api.services.request_registration.dto;

import com.example.api.controllers.client.dto.StudentAddress;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateRequestInput {
    private Long parentId;
    private List<StudentAddress> studentAddress;
}
