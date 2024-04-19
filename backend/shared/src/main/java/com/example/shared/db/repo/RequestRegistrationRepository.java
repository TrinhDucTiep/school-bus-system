package com.example.shared.db.repo;

import com.example.shared.db.dto.GetListRequestRegistrationDTO;
import com.example.shared.db.entities.RequestRegistration;
import com.example.shared.enumeration.RequestRegistrationStatus;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RequestRegistrationRepository extends JpaRepository<RequestRegistration, Long> {
    List<RequestRegistration> findByParentId(Long parentId);

    List<RequestRegistration> findByParentIdAndStudentIdInAndStatus(
        Long parentId,
        List<Long> studentIds,
        RequestRegistrationStatus status
    );

    @Query("""
        SELECT r.student as student, r.parent as parent, r as requestRegistration
        FROM RequestRegistration r
        WHERE (:studentId IS NULL OR r.student.id = :studentId)
        AND (:parentId IS NULL OR r.parent.id = :parentId)
        AND (:statuses IS NULL OR r.status IN :statuses)
        AND (:address IS NULL OR r.address LIKE %:address%)
    """)
    Page<GetListRequestRegistrationDTO> getPageRequestRegistration(
        @Param("studentId") Long studentId,
        @Param("parentId") Long parentId,
        @Param("statuses") List<RequestRegistrationStatus> statuses,
        @Param("address") String address,
        Pageable pageable
    );
}
