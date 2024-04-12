package com.example.api.controllers.admin;

import com.example.api.controllers.admin.dto.AddRideRequest;
import com.example.api.controllers.admin.dto.UpdateRideRequest;
import com.example.api.services.ride.RideService;
import com.example.shared.response.CommonResponse;
import com.example.shared.utils.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/ride")
@RequiredArgsConstructor
@Slf4j
public class RideController {
    private final RideService rideService;

    @PostMapping()
    public ResponseEntity<CommonResponse<Object>> addRide(
            @RequestBody AddRideRequest addRideRequest
    ) {
        rideService.addRide(addRideRequest.toInput());

        return ResponseUtil.toSuccessCommonResponse("Ride added successfully" );
    }

    @PutMapping()
    public ResponseEntity<CommonResponse<Object>> updateRide(
            @RequestBody UpdateRideRequest updateRideRequest
    ) {
        rideService.updateRide(updateRideRequest.toInput());

        return ResponseUtil.toSuccessCommonResponse("Ride updated successfully");
    }
}
