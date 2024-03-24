package com.example.api.services.account;

import com.example.api.services.account.dto.ParentSearchInput;
import com.example.api.services.account.dto.ParentSearchOutput;
import com.example.shared.db.repo.AccountRepository;
import com.example.shared.db.repo.ParentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AccountServiceImpl implements AccountService{
    private final AccountRepository accountRepository;
    private final ParentRepository parentRepository;


    @Override
    public Page<ParentSearchOutput> searchParents(ParentSearchInput input) {
        var res =  parentRepository.searchPageParent(
            input.getId(),
            input.getName(),
            input.getRole(),
            input.getSearchBy().getValue(),
            input.getPageable()
        );
        return res.map(ParentSearchOutput::from);
    }
}
