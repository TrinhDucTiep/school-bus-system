package com.example.api.controllers.admin.dto;

import com.example.shared.enumeration.RequestRegistrationStatus;
import java.util.List;
import lombok.Data;

@Data
public class RequestRegistrationFilterParam {
    private Long studentId;
    private Long parentId;
    private List<RequestRegistrationStatus> statuses;
    private String address;
}
