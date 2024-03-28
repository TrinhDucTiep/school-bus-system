package com.example.api.controllers.admin.dto;

import com.example.api.services.account.dto.ParentUpdateInput;
import java.time.Instant;
import java.util.List;
import lombok.Data;

@Data
public class ParentUpdateRequest {
    private Long id;
    private String name;
    private String avatar;
    private Instant dob;
    private String phoneNumber;
    private String username;
    private String password;
    private List<Long> studentIds;

    public ParentUpdateInput toInput() {
        return ParentUpdateInput.builder()
            .id(this.id)
            .name(this.name)
            .avatar(this.avatar)
            .dob(this.dob)
            .phoneNumber(this.phoneNumber)
            .username(this.username)
            .password(this.password)
            .studentIds(this.studentIds)
            .build();
    }
}
