package com.example.api.services.account;

import com.example.api.services.account.dto.ParentSearchInput;
import com.example.api.services.account.dto.ParentSearchOutput;
import org.springframework.data.domain.Page;

public interface AccountService {
    Page<ParentSearchOutput> searchParents(ParentSearchInput input);
}
