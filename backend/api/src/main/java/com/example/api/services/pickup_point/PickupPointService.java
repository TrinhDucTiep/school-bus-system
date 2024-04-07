package com.example.api.services.pickup_point;

import com.example.api.controllers.admin.dto.PickupPointFilterParam;
import com.example.api.services.pickup_point.dto.GetListPickupPointOutput;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PickupPointService {
    Page<GetListPickupPointOutput> getListPickupPoint(
        PickupPointFilterParam filterParam,
        Pageable pageable
    );
}
