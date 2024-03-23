package com.example.api.services.bus;

import com.example.api.services.bus.dto.GetListBusOutput;
import com.example.api.services.bus.dto.ListBusFilterParam;
import com.example.api.services.serviceA.dto.AddBusInput;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BusService {
    public Page<GetListBusOutput> getListBus(ListBusFilterParam filterParam, Pageable pageable);

    public void addBus(AddBusInput input);
}
