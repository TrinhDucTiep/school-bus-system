package com.example.api.controllers.admin.dto;

import com.example.api.services.account.dto.ParentAddInput;
import java.time.Instant;
import java.util.List;
import lombok.Data;

@Data
public class ParentAddRequest {
    private String name;
    private String avatar;
    private Instant dob;
    private String phoneNumber;
    private List<Long> studentIds;

    public ParentAddInput toInput() {
        return ParentAddInput.builder()
            .name(this.name)
            .avatar(this.avatar)
            .dob(this.dob)
            .phoneNumber(this.phoneNumber)
            .studentIds(this.studentIds)
            .build();
    }
}
