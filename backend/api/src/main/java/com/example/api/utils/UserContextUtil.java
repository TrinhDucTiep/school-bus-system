package com.example.api.utils;

import com.example.api.configs.security.CustomUserDetails;
import com.example.shared.db.entities.Account;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class UserContextUtil {
    public static Account getCurrentAccount() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        return  userDetails.toAccount();
    }
}
