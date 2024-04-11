package com.example.shared.db.repo;

import com.example.shared.db.dto.GetListRidePickupPointDTO;
import com.example.shared.db.entities.PickupPoint;
import com.example.shared.db.entities.RidePickupPoint;
import com.example.shared.enumeration.RidePickupPointStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RidePickupPointRepository extends JpaRepository<RidePickupPoint, Long> {

    @Query("""
        SELECT r as ride, pp as pickupPoint, rpp as ridePickupPoint
            FROM RidePickupPoint rpp
            LEFT JOIN Ride r ON rpp.ride.id = r.id
            LEFT JOIN PickupPoint pp ON rpp.pickupPoint.id = pp.id
            WHERE
                (:rideId IS NULL OR r.id = :rideId)
                AND (:pickupPointId IS NULL OR pp.id = :pickupPointId)
                AND (:status IS NULL OR rpp.status = :status)
    """)
    Page<GetListRidePickupPointDTO> getListRidePickupPoint(
        @Param("rideId") Long rideId,
        @Param("pickupPointId") Long pickupPointId,
        @Param("status") RidePickupPointStatus status,
        Pageable pageable
    );

    void deleteAllByPickupPoint(PickupPoint pickupPoint);

    boolean existsByRideIdAndPickupPointId(Long rideId, Long pickupPointId);
}
