package com.example.api.controllers.client;

import com.example.api.controllers.client.dto.RequestRegistrationCreate;
import com.example.api.services.request_registration.RequestRegistrationService;
import com.example.shared.response.CommonResponse;
import com.example.shared.utils.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/client/request-registration")
@RequiredArgsConstructor
@Slf4j
public class RequestRegistrationController {
    private final RequestRegistrationService requestRegistrationService;
    @PostMapping("")
    public ResponseEntity<CommonResponse<Object>> requestRegistration(
        @RequestBody RequestRegistrationCreate request
        ) {
        requestRegistrationService.upsertRegistration(request.toInput());
        return ResponseUtil.toSuccessCommonResponse("Request registration successfully");
    }
}
