package com.example.api.configs.security;

import com.example.shared.db.entities.Account;
import com.example.shared.enumeration.UserRole;
import java.util.Collection;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomUserDetails implements UserDetails {

    private long id;
    private String username;
    private String password;
    private UserRole role;

    public static CustomUserDetails fromAccount(com.example.shared.db.entities.Account account) {
        return new CustomUserDetails(
            account.getId(),
            account.getUsername(),
            account.getPassword(),
            account.getRole()
        );
    }

    public Account toAccount() {
        return Account.builder()
            .id(this.id)
            .username(this.username)
            .password(this.password)
            .role(this.role)
            .build();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.role == UserRole.ADMIN) {
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"),
                           new SimpleGrantedAuthority("ROLE_CLIENT"));
        } else {
            return List.of(new SimpleGrantedAuthority("ROLE_CLIENT"));
        }
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
