package com.example.api.services.account.dto;

import java.time.Instant;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ParentAddInput {
    private String name;

    private Instant dob;

    private String avatar;

    private String phoneNumber;

    private List<Long> studentIds;
}
