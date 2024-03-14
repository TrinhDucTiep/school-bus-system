package com.example.api.controllers.auth.dto;

import com.example.api.services.auth.dto.LoginInput;
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
public class LoginRequest {
    @NonNull
    private String username;
    @NonNull
    private String password;
    @NonNull
    private UserRole role;

    public static LoginInput toInput(LoginRequest request) {
        return LoginInput.builder()
                .username(request.getUsername())
                .password(request.getPassword())
                .role(request.getRole())
                .build();
    }
}
