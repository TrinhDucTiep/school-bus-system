package com.example.shared.db.repo;

import com.example.shared.db.entities.RideHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RideHistoryRepository extends JpaRepository<RideHistory, Long> {
}
