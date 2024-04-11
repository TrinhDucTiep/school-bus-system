package com.example.api.services.ride_pickup_point;

import com.example.api.services.ride_pickup_point.dto.AddRidePickupPointInput;
import com.example.api.services.ride_pickup_point.dto.GetListRidePickupPointOutput;
import com.example.api.services.ride_pickup_point.dto.RidePickupPointFilterParam;
import com.example.api.services.ride_pickup_point.dto.UpdateRidePickupPointInput;
import com.example.shared.db.dto.GetListRidePickupPointDTO;
import com.example.shared.db.entities.RidePickupPoint;
import com.example.shared.db.entities.RidePickupPointHistory;
import com.example.shared.db.repo.PickupPointRepository;
import com.example.shared.db.repo.RidePickupPointHistoryRepository;
import com.example.shared.db.repo.RidePickupPointRepository;
import com.example.shared.db.repo.RideRepository;
import com.example.shared.enumeration.RidePickupPointStatus;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class RidePickupPointServiceImpl implements RidePickupPointService{
    private final RidePickupPointRepository ridePickupPointRepository;
    private final RideRepository rideRepository;
    private final PickupPointRepository pickupPointRepository;
    private final RidePickupPointHistoryRepository ridePickupPointHistoryRepository;

    @Override
    public Page<GetListRidePickupPointOutput> getListRidePickupPoint(
        RidePickupPointFilterParam filterParam, Pageable pageable) {
        Page<GetListRidePickupPointDTO> pageData = ridePickupPointRepository.getListRidePickupPoint(
            filterParam.getPickupPointId(),
            filterParam.getRideId(),
            filterParam.getStatus(),
            pageable
        );
        return pageData.map(GetListRidePickupPointOutput::fromDto);
    }

    @Override
    @Transactional
    public void addRidePickupPoint(AddRidePickupPointInput addRidePickupPointInput) {
        // validate input
        for (AddRidePickupPointInput.ItemInput item : addRidePickupPointInput.getItems()) {
            // validate ride
            rideRepository.findById(item.getRideId())
                    .orElseThrow(() -> new IllegalArgumentException("Ride not found"));
            // validate pickup point
            pickupPointRepository.findById(item.getPickupPointId())
                    .orElseThrow(() -> new IllegalArgumentException("Pickup point not found"));
            // validate if ride pickup point already exists
            if (ridePickupPointRepository.existsByRideIdAndPickupPointId(item.getRideId(),
                item.getPickupPointId())) {
                throw new IllegalArgumentException("Ride pickup point already exists");
            }
        }

        // save ride pickup point
        for (AddRidePickupPointInput.ItemInput item : addRidePickupPointInput.getItems()) {
            RidePickupPoint ridePickupPoint = ridePickupPointRepository.save(
                    RidePickupPoint.builder()
                            .ride(rideRepository.getReferenceById(item.getRideId()))
                            .pickupPoint(
                                pickupPointRepository.getReferenceById(item.getPickupPointId()))
                            .status(RidePickupPointStatus.PICKING)
                            .build()
            );

            ridePickupPointHistoryRepository.save(
                RidePickupPointHistory.builder()
                    .ridePickupPointId(ridePickupPoint.getPickupPoint().getId())
                    .pickupPointId(ridePickupPoint.getPickupPoint().getId())
                    .rideId(ridePickupPoint.getRide().getId())
                    .status(RidePickupPointStatus.PICKING)
                    .address(ridePickupPoint.getPickupPoint().getAddress())
                    .longitude(ridePickupPoint.getPickupPoint().getLongitude())
                    .latitude(ridePickupPoint.getPickupPoint().getLatitude())
                    .build()
            );
        }
    }

    @Override
    @Transactional
    public void updateRidePickupPoint(UpdateRidePickupPointInput updateRidePickupPointInput) {
        // validate input
        RidePickupPoint ridePickupPoint = ridePickupPointRepository.findById(
            updateRidePickupPointInput.getId())
            .orElseThrow(() -> new IllegalArgumentException("Ride pickup point not found"));

        // update ride pickup point
        ridePickupPoint.setStatus(updateRidePickupPointInput.getStatus());
        ridePickupPointRepository.save(ridePickupPoint);

        ridePickupPointHistoryRepository.save(
            RidePickupPointHistory.builder()
                .ridePickupPointId(ridePickupPoint.getPickupPoint().getId())
                .pickupPointId(ridePickupPoint.getPickupPoint().getId())
                .rideId(ridePickupPoint.getRide().getId())
                .status(updateRidePickupPointInput.getStatus())
                .address(ridePickupPoint.getPickupPoint().getAddress())
                .longitude(ridePickupPoint.getPickupPoint().getLongitude())
                .latitude(ridePickupPoint.getPickupPoint().getLatitude())
                .build()
        );
    }

    @Override
    @Transactional
    public void deleteRidePickupPoints(List<Long> ridePickupPointIds) {
        // validate input
        for (Long ridePickupPointId : ridePickupPointIds) {
            ridePickupPointRepository.findById(ridePickupPointId)
                    .orElseThrow(() -> new IllegalArgumentException("Ride pickup point not found"));
        }

        // delete ride pickup point
        ridePickupPointRepository.deleteAllById(ridePickupPointIds);
    }
}
