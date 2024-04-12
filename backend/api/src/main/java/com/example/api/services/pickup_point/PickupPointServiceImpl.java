package com.example.api.services.pickup_point;

import com.example.api.controllers.admin.dto.PickupPointFilterParam;
import com.example.api.services.pickup_point.dto.AddPickupPointInput;
import com.example.api.services.pickup_point.dto.GetStudentPickupPointOutput;
import com.example.api.services.pickup_point.dto.GetListPickupPointOutput;
import com.example.api.services.pickup_point.dto.UpdatePickupPointInput;
import com.example.shared.db.dto.GetListPickupPointDTO;
import com.example.shared.db.dto.GetStudentPickupPointDTO;
import com.example.shared.db.entities.Account;
import com.example.shared.db.entities.Parent;
import com.example.shared.db.entities.PickupPoint;
import com.example.shared.db.repo.ParentRepository;
import com.example.shared.db.repo.PickupPointRepository;
import com.example.shared.db.repo.RidePickupPointRepository;
import com.example.shared.db.repo.RoutePickupPointRepository;
import com.example.shared.db.repo.StudentPickupPointRepository;
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

    @Override
    public Page<GetListPickupPointOutput> getListPickupPoint(PickupPointFilterParam filterParam,
                                                             Pageable pageable) {
        Page<GetListPickupPointDTO> pickupPointPage = pickupPointRepository.getListPickupPoint(
            filterParam.getAddress(), pageable);

        return pickupPointPage.map(GetListPickupPointOutput::fromDto);
    }

    @Override
    public Page<GetStudentPickupPointOutput> getListStudentPickupPoint(Account account, Pageable pageable) {
        Parent parent = parentRepository.findByAccountId(account.getId())
            .orElseThrow(() -> new MyException(
                null,
                "PARENT_NOT_FOUND",
                "Parent with account id " + account.getId() + " not found",
                HttpStatus.NOT_FOUND
            ));

        Page<GetStudentPickupPointDTO> pickupPointPage = pickupPointRepository.getListStudentPickupPointByParentId(
            parent.getId(),
            pageable
        );
        return pickupPointPage.map(GetStudentPickupPointOutput::fromDto);
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
