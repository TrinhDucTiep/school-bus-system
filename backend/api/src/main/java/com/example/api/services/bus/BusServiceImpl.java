package com.example.api.services.bus;

import com.example.api.services.bus.dto.GetListBusOutput;
import com.example.api.services.bus.dto.ListBusFilterParam;
import com.example.api.services.bus.dto.AddBusInput;
import com.example.api.services.bus.dto.UpdateBusInput;
import com.example.shared.db.dto.GetListBusDTO;
import com.example.shared.db.entities.Bus;
import com.example.shared.db.entities.Employee;
import com.example.shared.db.repo.BusRepository;
import com.example.shared.db.repo.EmployeeRepository;
import com.example.shared.exception.MyException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class BusServiceImpl implements BusService {
    private final BusRepository busRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public Page<GetListBusOutput> getListBus(ListBusFilterParam filterParam, Pageable pageable) {
        try {
            Page<GetListBusDTO> getListBusDTOS = busRepository.getListBus(
                filterParam.getNumberPlate(),
                filterParam.getSeatNumber(),
                filterParam.getStatus(),
                filterParam.getDriverName(),
                filterParam.getDriverId(),
                filterParam.getDriverMateName(),
                filterParam.getDriverMateId(),
                pageable
            );
            return getListBusDTOS.map(GetListBusOutput::fromDto);
        } catch (Exception e) {
            throw new MyException(null,
                "GET_LIST_BUS_ERROR",
                "Invalid input",
                HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public void addBus(AddBusInput input) {
        Bus bus = busRepository.findByNumberPlate(input.getNumberPlate());
        if (bus != null) {
            throw new MyException(null,
                "BUS_ALREADY_EXISTS",
                "Bus with number plate " + input.getNumberPlate() + " already exists",
                HttpStatus.BAD_REQUEST);
        }

        Bus newBus = Bus.builder()
            .numberPlate(input.getNumberPlate())
            .seatNumber(input.getSeatNumber())
            .status(input.getStatus())
            .driverId(input.getDriverId())
            .driverMateId(input.getDriverMateId())
            .build();
        busRepository.save(newBus);
    }

    @Override
    public void updateBus(UpdateBusInput input) {
        Bus bus = busRepository.findById(input.getId())
            .orElseThrow(() -> new MyException(null,
                "BUS_NOT_FOUND",
                "Bus with id " + input.getId() + " not found",
                HttpStatus.NOT_FOUND));

        // validate driver and driver mate
        if (input.getDriverId() != null) {
            Employee driver = employeeRepository.findById(input.getDriverId())
                .orElseThrow(() -> new MyException(null,
                    "DRIVER_NOT_FOUND",
                    "Driver with id " + input.getDriverId() + " not found",
                    HttpStatus.NOT_FOUND));
            if (busRepository.existsByDriverId(input.getDriverId())) {
                throw new MyException(null,
                    "DRIVER_ALREADY_ASSIGNED",
                    "Driver with id " + input.getDriverId() + " already assigned to another bus",
                    HttpStatus.BAD_REQUEST);

            }
        }
        if (input.getDriverMateId() != null) {
            Employee driverMate = employeeRepository.findById(input.getDriverMateId())
                .orElseThrow(() -> new MyException(null,
                    "DRIVER_MATE_NOT_FOUND",
                    "Driver mate with id " + input.getDriverMateId() + " not found",
                    HttpStatus.NOT_FOUND));
            if (busRepository.existsByDriverId(input.getDriverMateId())) {
                throw new MyException(null,
                    "DRIVER_MATE_ALREADY_ASSIGNED",
                    "Driver mate with id " + input.getDriverMateId() + " already assigned to another bus",
                    HttpStatus.BAD_REQUEST);
            }
        }


//        bus.setNumberPlate(input.getNumberPlate()); // not allow to update number plate
        bus.setSeatNumber(input.getSeatNumber());
        bus.setStatus(input.getStatus());
        bus.setDriverId(input.getDriverId());
        bus.setDriverMateId(input.getDriverMateId());
        busRepository.save(bus);
    }

    @Override
    public void deleteBus(Long id) {
        Bus bus = busRepository.findById(id)
            .orElseThrow(() -> new MyException(null,
                "BUS_NOT_FOUND",
                "Bus with id " + id + " not found",
                HttpStatus.NOT_FOUND));
        busRepository.delete(bus);
    }

}
