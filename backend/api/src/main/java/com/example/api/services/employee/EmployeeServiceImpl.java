package com.example.api.services.employee;

import com.example.api.services.employee.dto.AddEmployeeInput;
import com.example.api.services.employee.dto.GetListEmployeeOutput;
import com.example.api.services.employee.dto.ListEmployeeFilterParam;
import com.example.api.services.employee.dto.UpdateEmployeeInput;
import com.example.shared.db.dto.GetListEmployeeDTO;
import com.example.shared.db.entities.Account;
import com.example.shared.db.entities.Bus;
import com.example.shared.db.entities.Employee;
import com.example.shared.db.repo.AccountRepository;
import com.example.shared.db.repo.BusRepository;
import com.example.shared.db.repo.EmployeeRepository;
import com.example.shared.enumeration.EmployeeRole;
import com.example.shared.exception.MyException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService{
    private final EmployeeRepository employeeRepository;
    private final BusRepository busRepository;
    private final AccountRepository accountRepository;

    @Override
    public Page<GetListEmployeeOutput> getListEmployee(ListEmployeeFilterParam filterParam,
                                                       Pageable pageable) {
        try {
            Page<GetListEmployeeDTO> listEmployeeDTOS = employeeRepository.getListEmployee(
                    filterParam.getId(),
                    filterParam.getName(),
                    filterParam.getPhoneNumber(),
                    filterParam.getDob(),
                    filterParam.getBusId(),
                    filterParam.getBusNumberPlate(),
                    filterParam.getRole(),
                    pageable
            );
            return listEmployeeDTOS.map(GetListEmployeeOutput::fromDto);
        } catch (Exception e) {
            throw new MyException(null,
                    "GET_LIST_EMPLOYEE_ERROR",
                    "Invalid input",
                    HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    @Transactional
    public void addEmployee(AddEmployeeInput input) {
        Employee employee = employeeRepository.findByPhoneNumber(input.getPhoneNumber())
            .orElse(null);
        if (employee != null) {
            throw new MyException(null,
                    "EMPLOYEE_ALREADY_EXISTS",
                    "Employee already exists",
                    HttpStatus.BAD_REQUEST);
        }

        Account account = accountRepository.findById(input.getAccountId())
            .orElseThrow(() -> new MyException(null,
                    "ACCOUNT_NOT_FOUND",
                    "Account not found",
                    HttpStatus.NOT_FOUND));

        employee = Employee.builder()
                .account(account)
                .name(input.getName())
                .phoneNumber(input.getPhoneNumber())
                .avatar(input.getAvatar())
                .dob(input.getDob())
                .busId(input.getBusId())
                .role(input.getRole())
                .build();
        employeeRepository.save(employee);
    }

    @Override
    @Transactional
    public void updateEmployee(UpdateEmployeeInput input) {
        Employee employee = employeeRepository.findById(input.getId())
            .orElseThrow(() -> new MyException(null,
                    "EMPLOYEE_NOT_FOUND",
                    "Employee not found",
                    HttpStatus.NOT_FOUND));

        Bus bus = null;
        if (input.getBusId() != null) {
            bus = busRepository.findById(input.getBusId())
                .orElseThrow(() -> new MyException(null,
                    "BUS_NOT_FOUND",
                    "Bus not found",
                    HttpStatus.NOT_FOUND));
        }
        if (input.getBusId() != null && bus.getDriverId() != null
            && !bus.getDriverId().equals(input.getId())
            && input.getRole() != null
            && input.getRole() == EmployeeRole.DRIVER) {
            throw new MyException(null,
                    "BUS_ALREADY_ASSIGNED",
                    "Bus already assigned to another driver",
                    HttpStatus.BAD_REQUEST);
        }
        if (input.getBusId() != null && bus.getDriverMateId() != null
            && !bus.getDriverMateId().equals(input.getId())
            && input.getRole() != null
            && input.getRole() == EmployeeRole.DRIVER_MATE) {
            throw new MyException(null,
                    "BUS_ALREADY_ASSIGNED",
                    "Bus already assigned to another driver mate",
                    HttpStatus.BAD_REQUEST);
        }

        employee.setName(input.getName());
        employee.setPhoneNumber(input.getPhoneNumber());
        employee.setAvatar(input.getAvatar());
        employee.setDob(input.getDob());
        employee.setBusId(input.getBusId());
        employee.setRole(input.getRole());
        employeeRepository.save(employee);
    }

    @Override
    @Transactional
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new MyException(null,
                    "EMPLOYEE_NOT_FOUND",
                    "Employee not found",
                    HttpStatus.NOT_FOUND));

        if (employee.getBusId() != null) {
            Bus bus = busRepository.findById(employee.getBusId())
                .orElseThrow(() -> new MyException(null,
                    "BUS_NOT_FOUND",
                    "Bus not found",
                    HttpStatus.NOT_FOUND));
            if (bus.getDriverId() != null && bus.getDriverId().equals(id)) {
                bus.setDriverId(null);
            }
            if (bus.getDriverMateId() != null && bus.getDriverMateId().equals(id)) {
                bus.setDriverMateId(null);
            }
            busRepository.save(bus);
        }
        employeeRepository.delete(employee);
    }
}
