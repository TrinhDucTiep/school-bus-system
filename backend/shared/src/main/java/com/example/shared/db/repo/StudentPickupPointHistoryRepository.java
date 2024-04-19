package com.example.shared.db.repo;

import com.example.shared.db.entities.StudentPickupPointHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentPickupPointHistoryRepository extends JpaRepository<StudentPickupPointHistory, Long>{
}
