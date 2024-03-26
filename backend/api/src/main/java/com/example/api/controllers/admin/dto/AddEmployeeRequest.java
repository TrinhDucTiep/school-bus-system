package com.example.api.controllers.admin.dto;

import com.example.api.services.employee.dto.AddEmployeeInput;
import com.example.shared.enumeration.EmployeeRole;
import java.time.Instant;
import lombok.Data;

@Data
public class AddEmployeeRequest {
    private Long accountId;
    private String name;
    private String phoneNumber;
    private String address;
    private String avatar;
    private Instant dob;
    private Long busId;
    private EmployeeRole role;

    public AddEmployeeInput toInput() {
        return AddEmployeeInput.builder()
                .name(name)
                .phoneNumber(phoneNumber)
                .address(address)
                .avatar(avatar)
                .dob(dob)
                .busId(busId)
                .role(role)
                .accountId(accountId)
                .build();
    }
}
