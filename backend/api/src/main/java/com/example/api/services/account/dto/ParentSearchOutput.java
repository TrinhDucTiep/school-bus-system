package com.example.api.services.account.dto;


import com.example.shared.db.dto.GetParentAndChildDTO;
import java.time.Instant;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParentSearchOutput {
    private Long id;

    private String name;

    private String avatar;

    private Instant dob;

    private Instant createdAt;

    private Instant updatedAt;

    private List<StudentSearchOutput> students;

    public static ParentSearchOutput from(GetParentAndChildDTO dto) {
        return ParentSearchOutput.builder()
            .id(dto.getParentId())
            .name(dto.getParentName())
            .avatar(dto.getParentAvatar())
            .dob(Instant.parse(dto.getParentDateOfBirth()))
            .createdAt(Instant.now())
            .updatedAt(Instant.now())
            .build();
    }
}
