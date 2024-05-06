package com.example.api.services.history;

import com.example.api.services.history.dto.AdminHistoryRideFilterParam;
import com.example.api.services.history.dto.AdminHistoryRideOutput;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface HistoryService {
    Page<AdminHistoryRideOutput> getAdminHistoryRides(AdminHistoryRideFilterParam filterParam,
                                                      Pageable pageable);
}
