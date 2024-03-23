package com.example.api.controllers.admin;

import com.example.api.controllers.admin.dto.AddBusRequest;
import com.example.api.services.bus.BusService;
import com.example.api.services.bus.dto.ListBusFilterParam;
import com.example.shared.response.CommonResponse;
import com.example.shared.utils.PageableUtils;
import com.example.shared.utils.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/bus")
@RequiredArgsConstructor
@Slf4j
public class BusController {
    private final BusService busService;

    // get list of buses
    @GetMapping("/pagination")
    public ResponseEntity<CommonResponse<Object>> getBuses(ListBusFilterParam filterParam,
                                                           Integer page, Integer size,
                                                           String sort) {
        Pageable pageable = PageableUtils.generate(page, size, sort);

        return ResponseUtil.toSuccessCommonResponse(
                busService.getListBus(filterParam, pageable)
        );
    }

    @PostMapping("")
    public ResponseEntity<CommonResponse<Object>> addBus(
        @RequestBody AddBusRequest request
        ) {
        busService.addBus(request.toInput());
        return ResponseUtil.toSuccessCommonResponse("Add bus successfully");
    }
}
