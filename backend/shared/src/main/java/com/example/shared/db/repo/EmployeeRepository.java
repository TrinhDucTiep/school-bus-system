package com.example.shared.db.repo;

import com.example.shared.db.dto.GetListEmployeeDTO;
import com.example.shared.db.entities.Employee;
import com.example.shared.enumeration.EmployeeRole;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query("""
    SELECT e as employee, b as bus
        FROM Employee e
        LEFT JOIN Bus b ON e.busId = b.id
        WHERE
            (:id IS NULL OR e.id = :id)
            AND (:name IS NULL OR e.name LIKE %:name%)
            AND (:phoneNumber IS NULL OR e.phoneNumber LIKE %:phoneNumber%)
            AND (:dob IS NULL OR e.dob = :dob)
            AND (:busId IS NULL OR e.busId = :busId)
            AND (:busNumberPlate IS NULL OR b.numberPlate LIKE %:busNumberPlate%)
            AND (:role IS NULL OR e.role = :role)
    """)
    Page<GetListEmployeeDTO> getListEmployee(
        @Param("id") Long id,
        @Param("name") String name,
        @Param("phoneNumber") String phoneNumber,
        @Param("dob") Instant dob,
        @Param("busId") Long busId,
        @Param("busNumberPlate") String busNumberPlate,
        @Param("role") EmployeeRole role,
        Pageable pageable
        );

    Optional<Employee> findByAccountId(Long accountId);

    Optional<Employee> findByPhoneNumber(String phoneNumber);

    Optional<List<Employee>> findByBusId(Long busId);
}
