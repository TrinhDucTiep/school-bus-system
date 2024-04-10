package com.example.api.controllers.admin.dto;

import com.example.api.services.ride.dto.AddRideInput;
import com.example.shared.utils.DateConvertUtil;
import java.util.List;
import lombok.Data;

@Data
public class AddRideRequest {
    private Long busId;
    private String startAt;
    private String endAt;
    private String startFrom;

    private List<Long> pickupPointIds;

    public AddRideInput toInput() {
        return AddRideInput.builder()
                .busId(busId)
                .startAt(DateConvertUtil.convertStringToInstant(startAt))
                .endAt(DateConvertUtil.convertStringToInstant(endAt))
                .startFrom(startFrom)
                .pickupPointIds(pickupPointIds)
                .build();
    }
}
