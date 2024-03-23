package com.example.shared.db.repo;

import com.example.shared.db.entities.PickupPoint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PickupPointRepository extends JpaRepository<PickupPoint, Long> {
}
