package com.example.api.services.employee;

import com.example.api.services.employee.dto.AddEmployeeInput;
import com.example.api.services.employee.dto.GetListEmployeeOutput;
import com.example.api.services.employee.dto.ListEmployeeFilterParam;
import com.example.api.services.employee.dto.UpdateEmployeeInput;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EmployeeService {
    Page<GetListEmployeeOutput> getListEmployee(ListEmployeeFilterParam filterParam, Pageable pageable);

    void addEmployee(AddEmployeeInput input);

    void updateEmployee(UpdateEmployeeInput input);

    void deleteEmployee(Long id);
}
