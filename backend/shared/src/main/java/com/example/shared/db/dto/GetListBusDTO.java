package com.example.shared.db.dto;

import com.example.shared.db.entities.Bus;
import com.example.shared.db.entities.Employee;
import java.util.List;

public interface GetListBusDTO {
    public Bus getBus();
    public Employee getDriver();
    public Employee getDriverMate();
}
