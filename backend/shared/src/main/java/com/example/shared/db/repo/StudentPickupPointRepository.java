package com.example.shared.db.repo;

import com.example.shared.db.entities.StudentPickupPoint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentPickupPointRepository extends JpaRepository<StudentPickupPoint, Long> {
}
