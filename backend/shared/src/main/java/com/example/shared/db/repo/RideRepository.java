package com.example.shared.db.repo;

import com.example.shared.db.entities.Ride;
import com.example.shared.enumeration.RideStatus;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RideRepository extends JpaRepository<Ride, Long> {
    List<Ride> findByBusIdAndStatus(Long busId, RideStatus status);
}
