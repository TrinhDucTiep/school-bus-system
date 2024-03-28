package com.example.api.services.account.dto;


import com.example.shared.db.entities.Student;
import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentSearchOutput {
    private Long id;

    private String name;

    private String avatar;

    private Instant dob;

    private String phoneNumber;

    private String studentClass;

    private Long parentId;

    private Instant createdAt;

    private Instant updatedAt;


    public static StudentSearchOutput from(Student dto) {
        return StudentSearchOutput.builder()
            .id(dto.getId())
            .name(dto.getName())
            .avatar(dto.getAvatar())
            .dob(dto.getDob() != null ? Instant.ofEpochMilli(dto.getDob().toEpochMilli()) : null)
            .phoneNumber(dto.getPhoneNumber())
            .studentClass(dto.getStudentClass())
            .parentId(dto.getParent() != null ? dto.getParent().getId() : null)
            .createdAt(Instant.now())
            .updatedAt(Instant.now())
            .build();
    }
}
