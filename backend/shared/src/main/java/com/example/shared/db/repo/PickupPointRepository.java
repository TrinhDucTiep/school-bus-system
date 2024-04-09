package com.example.shared.db.repo;

import com.example.shared.db.dto.GetListPickupPointDTO;
import com.example.shared.db.entities.PickupPoint;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PickupPointRepository extends JpaRepository<PickupPoint, Long> {

    @Query("""
    SELECT p AS pickupPoint, 
           s AS students, 
           r AS rides 
    FROM PickupPoint p 
    LEFT JOIN FETCH StudentPickupPoint sp ON p.id = sp.pickupPoint.id 
    LEFT JOIN FETCH Student s ON s.id = sp.student.id 
    LEFT JOIN FETCH RidePickupPoint rp ON p.id = rp.pickupPoint.id 
    LEFT JOIN FETCH Ride r ON r.id = rp.ride.id 
    WHERE (:address is NULL or p.address ILIKE %:address%)
    """)
    Page<GetListPickupPointDTO> getListPickupPoint(
        @Param("address") String address,
        Pageable pageable
    );

    boolean existsByAddress(String address);
}
