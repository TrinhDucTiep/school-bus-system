package com.example.api.services.pickup_point;

import com.example.api.controllers.admin.dto.PickupPointFilterParam;
import com.example.api.services.pickup_point.dto.GetListPickupPointOutput;
import com.example.shared.db.repo.PickupPointRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class PickupPointServiceImpl implements PickupPointService {
    private final PickupPointRepository pickupPointRepository;

    @Override
    public Page<GetListPickupPointOutput> getListPickupPoint(PickupPointFilterParam filterParam,
                                                             Pageable pageable) {
        return null;
    }
}
