package com.example.api.services.bus;

import com.example.api.services.bus.dto.GetListBusOutput;
import com.example.api.services.bus.dto.ListBusFilterParam;
import com.example.api.services.bus.dto.AddBusInput;
import com.example.api.services.bus.dto.UpdateBusInput;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BusService {
    Page<GetListBusOutput> getListBus(ListBusFilterParam filterParam, Pageable pageable);

    void addBus(AddBusInput input);

    void updateBus(UpdateBusInput input);

    void deleteBus(Long id);
}
