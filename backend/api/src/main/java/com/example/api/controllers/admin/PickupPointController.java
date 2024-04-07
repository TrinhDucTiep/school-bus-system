package com.example.api.controllers.admin;

import com.example.api.controllers.admin.dto.PickupPointFilterParam;
import com.example.api.services.pickup_point.PickupPointService;
import com.example.shared.response.CommonResponse;
import com.example.shared.utils.PageableUtils;
import com.example.shared.utils.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/pickup-point")
@RequiredArgsConstructor
@Slf4j
public class PickupPointController {
    private final PickupPointService pickupPointService;

    @GetMapping("/pagination")
    public ResponseEntity<CommonResponse<Object>> getPickupPoints(PickupPointFilterParam filterParam,
                                                                  Integer page, Integer size,
                                                                  String sort) {
        Pageable pageable = PageableUtils.generate(page, size, sort);

        return ResponseUtil.toSuccessCommonResponse(
                pickupPointService.getListPickupPoint(filterParam, pageable)
        );
    }

}
