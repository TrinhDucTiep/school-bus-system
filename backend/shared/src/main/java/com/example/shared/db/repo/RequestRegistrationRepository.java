package com.example.shared.db.repo;

import com.example.shared.db.entities.RequestRegistration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRegistrationRepository extends JpaRepository<RequestRegistration, Long> {
}
