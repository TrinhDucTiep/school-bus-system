package com.example.api.services.pickup_point;

import com.example.api.controllers.admin.dto.PickupPointFilterParam;
import com.example.api.services.common_dto.RideOutput;
import com.example.api.services.common_dto.StudentOutput;
import com.example.api.services.pickup_point.dto.AddPickupPointInput;
import com.example.api.services.pickup_point.dto.GetListPickupPointOutput;
import com.example.api.services.pickup_point.dto.UpdatePickupPointInput;
import com.example.shared.db.dto.GetListPickupPointDTO;
import com.example.shared.db.entities.PickupPoint;
import com.example.shared.db.repo.ParentRepository;
import com.example.shared.db.repo.PickupPointRepository;
import com.example.shared.db.repo.RidePickupPointRepository;
import com.example.shared.db.repo.RideRepository;
import com.example.shared.db.repo.RoutePickupPointRepository;
import com.example.shared.db.repo.StudentPickupPointRepository;
import com.example.shared.db.repo.StudentRepository;
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
public class PickupPointServiceImpl implements PickupPointService {
    private final PickupPointRepository pickupPointRepository;
    private final StudentPickupPointRepository studentPickupPointRepository;
    private final RidePickupPointRepository ridePickupPointRepository;
    private final RoutePickupPointRepository routePickupPointRepository;
    private final ParentRepository parentRepository;
    private final StudentRepository studentRepository;
    private final RideRepository rideRepository;

    @Override
    public Page<GetListPickupPointOutput> getListPickupPoint(PickupPointFilterParam filterParam,
                                                             Pageable pageable) {
        Page<PickupPoint> pickupPointPage = pickupPointRepository.getPagePickupPoint(
            filterParam.getAddress(), pageable);

        Page<GetListPickupPointOutput> result = pickupPointPage.map(GetListPickupPointOutput::fromEntity);
        // find all students and rides for each pickup point
        for (GetListPickupPointOutput output : result) {
            output.setStudents(
                studentRepository.findAllByPickupPointId(output.getPickupPoint().getId())
                    .stream().map(StudentOutput::fromEntity).toList()
            );
            output.setRides(
                rideRepository.findByPickupPointId(output.getPickupPoint().getId())
                    .stream().map(RideOutput::fromEntity).toList()
            );
        }

        return result;
    }

    @Override
    @Transactional
    public void addPickupPoint(AddPickupPointInput input) {
        if (input.getAddress() == null || input.getLatitude() == null ||
            input.getLongitude() == null) {
            throw new MyException(
                null,
                "INVALID_INPUT",
                "Address, latitude, and longitude must not be null",
                HttpStatus.BAD_REQUEST
            );
        }

        if (pickupPointRepository.existsByAddress(input.getAddress())) {
            throw new MyException(
                null,
                "PICKUP_POINT_ALREADY_EXISTS",
                "Pickup point with address " + input.getAddress() + " already exists",
                HttpStatus.BAD_REQUEST
            );
        }

        PickupPoint pickupPoint = PickupPoint.builder()
            .address(input.getAddress())
            .latitude(input.getLatitude())
            .longitude(input.getLongitude())
            .build();

        pickupPointRepository.save(pickupPoint);
    }

    @Override
    @Transactional
    public void updatePickupPoint(UpdatePickupPointInput input) {
        if (input.getId() == null || input.getAddress() == null
            || input.getLatitude() == null || input.getLongitude() == null) {
            throw new MyException(
                null,
                "INVALID_INPUT",
                "Id, address, latitude, and longitude must not be null",
                HttpStatus.BAD_REQUEST
            );
        }

        PickupPoint pickupPoint = pickupPointRepository.findById(input.getId())
            .orElseThrow(() -> new MyException(
                null,
                "PICKUP_POINT_NOT_FOUND",
                "Pickup point with id " + input.getId() + " not found",
                HttpStatus.NOT_FOUND
            ));

        // check new address duplicate
        if (!pickupPoint.getAddress().equals(input.getAddress())
            && pickupPointRepository.existsByAddress(input.getAddress())) {
            throw new MyException(
                null,
                "PICKUP_POINT_ALREADY_EXISTS",
                "Pickup point with address " + input.getAddress() + " already exists",
                HttpStatus.BAD_REQUEST
            );
        }

        pickupPoint.setAddress(input.getAddress());
        pickupPoint.setLatitude(input.getLatitude());
        pickupPoint.setLongitude(input.getLongitude());

        pickupPointRepository.save(pickupPoint);
    }

    @Override
    @Transactional
    public void deletePickupPoint(Long id) {
        PickupPoint pickupPoint = pickupPointRepository.findById(id)
            .orElseThrow(() -> new MyException(
                null,
                "PICKUP_POINT_NOT_FOUND",
                "Pickup point with id " + id + " not found",
                HttpStatus.NOT_FOUND
            ));

        studentPickupPointRepository.deleteAllByPickupPoint(pickupPoint);
        ridePickupPointRepository.deleteAllByPickupPoint(pickupPoint);
        routePickupPointRepository.deleteAllByPickupPoint(pickupPoint);

        pickupPointRepository.delete(pickupPoint);
    }
}
