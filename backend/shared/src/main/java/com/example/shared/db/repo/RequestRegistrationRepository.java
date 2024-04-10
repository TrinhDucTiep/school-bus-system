package com.example.shared.db.repo;

import com.example.shared.db.entities.RequestRegistration;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRegistrationRepository extends JpaRepository<RequestRegistration, Long> {
    List<RequestRegistration> findByParentId(Long parentId);
}
