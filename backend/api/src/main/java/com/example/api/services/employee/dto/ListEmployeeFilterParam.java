package com.example.api.services.employee.dto;

import com.example.shared.enumeration.EmployeeRole;
import java.time.Instant;
import lombok.Data;

@Data
public class ListEmployeeFilterParam {
    private Long id;
    private String name;
    private String phoneNumber;
    private String avatar;
    private Instant dob;
    private Long busId;
    private String busNumberPlate;
    private Long mateId;
    private EmployeeRole role;
}
