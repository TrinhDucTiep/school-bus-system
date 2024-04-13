package com.example.api.services.ride;

import com.example.api.services.ride.dto.AddRideInput;
import com.example.api.services.ride.dto.UpdateRideInput;
import com.example.shared.db.entities.Bus;
import com.example.shared.db.entities.PickupPoint;
import com.example.shared.db.entities.Ride;
import com.example.shared.db.entities.RidePickupPoint;
import com.example.shared.db.entities.RidePickupPointHistory;
import com.example.shared.db.repo.BusRepository;
import com.example.shared.db.repo.PickupPointRepository;
import com.example.shared.db.repo.RideHistoryRepository;
import com.example.shared.db.repo.RidePickupPointHistoryRepository;
import com.example.shared.db.repo.RidePickupPointRepository;
import com.example.shared.db.repo.RideRepository;
import com.example.shared.db.repo.StudentPickupPointRepository;
import com.example.shared.enumeration.RidePickupPointStatus;
import com.example.shared.enumeration.RideStatus;
import com.example.shared.exception.MyException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class RideServiceImpl implements RideService {
    private final RideRepository rideRepository;
    private final RidePickupPointRepository ridePickupPointRepository;
    private final BusRepository busRepository;
    private final PickupPointRepository pickupPointRepository;
    private final StudentPickupPointRepository studentPickupPointRepository;
    private final RideHistoryRepository rideHistoryRepository;
    private final RidePickupPointHistoryRepository ridePickupPointHistoryRepository;

    @Override
    @Transactional
    public void addRide(AddRideInput addRideInput) {
        // validate input
        if (addRideInput.getBusId() == null || addRideInput.getStartFrom() == null || addRideInput.getStartAt() == null || addRideInput.getPickupPointIds() == null) {
            throw new MyException(
                null,
                "missing_required_fields",
                "Missing required fields",
                HttpStatus.BAD_REQUEST
            );
        }
        if (addRideInput.getPickupPointIds().isEmpty()) {
            throw new MyException(
                null,
                "pickup_point_required",
                "Pickup points are required",
                HttpStatus.BAD_REQUEST
            );
        }
        if (addRideInput.getEndAt() != null && addRideInput.getStartAt().isAfter(addRideInput.getEndAt())) {
            throw new MyException(
                null,
                "invalid_time",
                "Start time must be before end time",
                HttpStatus.BAD_REQUEST
            );
        }
        // validate bus
        Bus bus = busRepository.findById(addRideInput.getBusId())
                .orElseThrow(() -> new MyException(
                    null,
                    "bus_not_found",
                    "Bus not found with id: " + addRideInput.getBusId(),
                    HttpStatus.BAD_REQUEST
                ));

        // validate pickup points
        List<PickupPoint> pickupPoints = pickupPointRepository.findAllById(addRideInput.getPickupPointIds());
        if (pickupPoints.size() != addRideInput.getPickupPointIds().size()) {
            throw new MyException(
                null,
                "pickup_point_not_found",
                "Some pickup points not found",
                HttpStatus.BAD_REQUEST
            );
        }

        // save ride
        Ride ride = Ride.builder()
                .bus(bus)
                .startAt(addRideInput.getStartAt())
                .endAt(addRideInput.getEndAt())
                .startFrom(addRideInput.getStartFrom())
                .status(RideStatus.PENDING)
                .build();
        rideRepository.save(ride);
        rideHistoryRepository.save(ride.toRideHistory());

        // save ride pickup points
        pickupPoints.forEach(pickupPoint -> {
            RidePickupPoint ridePickupPoint = ridePickupPointRepository.save(
                RidePickupPoint.builder()
                    .ride(ride)
                    .pickupPoint(pickupPoint)
                    .status(RidePickupPointStatus.PICKING)
                    .build()
            );
            ridePickupPointHistoryRepository.save(
                RidePickupPointHistory.builder()
                    .ridePickupPointId(ridePickupPoint.getId())
                    .rideId(ride.getId())
                    .pickupPointId(pickupPoint.getId())
                    .status(RidePickupPointStatus.PICKING)
                    .address(pickupPoint.getAddress())
                    .latitude(pickupPoint.getLatitude())
                    .longitude(pickupPoint.getLongitude())
                    .build()
            );
        });
    }

    @Override
    public void updateRide(UpdateRideInput updateRideInput) {
        // validate ride
        Ride ride = rideRepository.findById(updateRideInput.getId())
                .orElseThrow(() -> new MyException(
                    null,
                    "ride_not_found",
                    "Ride not found with id: " + updateRideInput.getId(),
                    HttpStatus.BAD_REQUEST
                ));

        // validate bus
        Bus bus = busRepository.findById(updateRideInput.getBusId())
                .orElseThrow(() -> new MyException(
                    null,
                    "bus_not_found",
                    "Bus not found with id: " + updateRideInput.getBusId(),
                    HttpStatus.BAD_REQUEST
                ));

        // update ride
        ride.setBus(bus);
        ride.setStartAt(updateRideInput.getStartAt());
        ride.setEndAt(updateRideInput.getEndAt());
        ride.setStartFrom(updateRideInput.getStartFrom());
        ride.setStatus(updateRideInput.getStatus());
        rideRepository.save(ride);
        rideHistoryRepository.save(ride.toRideHistory());
    }
}
