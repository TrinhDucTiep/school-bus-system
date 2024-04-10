package com.example.api.services.ride;

import com.example.api.services.ride.dto.AddRideInput;
import com.example.api.services.ride.dto.UpdateRideInput;
import com.example.shared.db.entities.Bus;
import com.example.shared.db.entities.PickupPoint;
import com.example.shared.db.entities.Ride;
import com.example.shared.db.entities.RidePickupPoint;
import com.example.shared.db.repo.BusRepository;
import com.example.shared.db.repo.PickupPointRepository;
import com.example.shared.db.repo.RidePickupPointRepository;
import com.example.shared.db.repo.RideRepository;
import com.example.shared.db.repo.StudentPickupPointRepository;
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

    @Override
    @Transactional
    public void addRide(AddRideInput addRideInput) {
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
                .build();
        rideRepository.save(ride);

        // save ride pickup points
        pickupPoints.forEach(pickupPoint -> {
            ridePickupPointRepository.save(
                RidePickupPoint.builder()
                    .ride(ride)
                    .pickupPoint(pickupPoint)
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
    }
}
