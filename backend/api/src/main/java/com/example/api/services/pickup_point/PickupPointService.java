package com.example.api.services.pickup_point;

import com.example.api.controllers.admin.dto.PickupPointFilterParam;
import com.example.api.services.pickup_point.dto.AddPickupPointInput;
import com.example.api.services.pickup_point.dto.GetListPickupPointOutput;
import com.example.api.services.pickup_point.dto.UpdatePickupPointInput;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PickupPointService {
    Page<GetListPickupPointOutput> getListPickupPoint(
        PickupPointFilterParam filterParam,
        Pageable pageable
    );

    void addPickupPoint(AddPickupPointInput input);

    void updatePickupPoint(UpdatePickupPointInput input);

    void deletePickupPoint(Long id);
}
