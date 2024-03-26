package com.example.api.controllers.admin;

import com.example.api.controllers.admin.dto.ParentFilterParam;
import com.example.api.services.account.AccountService;
import com.example.shared.response.CommonResponse;
import com.example.shared.utils.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/account")
@RequiredArgsConstructor
@Slf4j
public class AccountController {
    private final AccountService accountService;

    @GetMapping("/pagination")
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CommonResponse<Object>> getParent(ParentFilterParam filterParam) {
        var res =accountService.searchParents(filterParam.toInput());
        return ResponseUtil.toSuccessCommonResponse(res);
    }
}
