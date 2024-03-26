package com.example.api.services.employee.dto;

import com.example.shared.enumeration.EmployeeRole;
import java.time.Instant;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddEmployeeInput {
    private Long accountId;
    private String name;
    private String phoneNumber;
    private String address;
    private String avatar;
    private Instant dob;
    private Long busId;
    private EmployeeRole role;
}
