package com.example.shared.db.repo;

import com.example.shared.db.entities.PickupPoint;
import com.example.shared.db.entities.RidePickupPoint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RidePickupPointRepository extends JpaRepository<RidePickupPoint, Long> {
    void deleteAllByPickupPoint(PickupPoint pickupPoint);
}
