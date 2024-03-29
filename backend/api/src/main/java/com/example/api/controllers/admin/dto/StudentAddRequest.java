package com.example.api.controllers.admin.dto;

import com.example.api.services.account.dto.StudentAddInput;
import com.example.shared.utils.DateConvertUtil;
import java.time.Instant;
import lombok.Data;

@Data
public class StudentAddRequest {
    private String name;
    private String avatar;
    private String dob;
    private String phoneNumber;
    private String studentClass;
    private Long parentId;

    public StudentAddInput toInput() {
        return StudentAddInput.builder()
            .name(this.name)
            .avatar(this.avatar)
            .dob(DateConvertUtil.convertStringToInstant(this.dob))
            .phoneNumber(this.phoneNumber)
            .studentClass(this.studentClass)
            .parentId(this.parentId)
            .build();
    }
}
