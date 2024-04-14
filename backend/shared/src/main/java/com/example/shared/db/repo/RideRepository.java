package com.example.shared.db.repo;

import com.example.shared.db.entities.Ride;
import com.example.shared.enumeration.RideStatus;
import java.time.Instant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RideRepository extends JpaRepository<Ride, Long> {
    List<Ride> findByBusIdAndStatus(Long busId, RideStatus status);

    @Query("""
        SELECT r
        FROM Ride r
        WHERE r.bus.id = :busId
        AND r.status = :status
        AND r.isToSchool = :isToSchool
        AND DATE(r.startAt) = DATE(:date)
    """)
    List<Ride> findByManipulateRide(
        @Param("busId") Long busId,
        @Param("status") RideStatus status,
        @Param("isToSchool") Boolean isToSchool,
        @Param("date") Instant date);
}
