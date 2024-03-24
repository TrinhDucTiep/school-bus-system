package com.example.api.services.account.dto;


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

    private Long parentId;

    private Instant createdAt;

    private Instant updatedAt;
}
