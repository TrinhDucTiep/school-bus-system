package com.example.api.controllers.auth.dto;

import com.example.api.services.auth.dto.SignUpInput;
import com.example.shared.enumeration.EnumConstraint;
import com.example.shared.enumeration.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequest {
    @NonNull
    private String username;
    @NonNull
    private String password;
    @NonNull
    @EnumConstraint(enumClass = UserRole.class, message = "Invalid role")
    private UserRole role;

    public SignUpInput toInput() {
        return SignUpInput.builder()
                .username(this.username)
                .password(this.password)
                .role(this.role)
                .build();
    }
}
