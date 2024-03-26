package com.example.shared.db.repo;

import com.example.shared.db.dto.GetListBusDTO;
import com.example.shared.db.entities.Bus;
import com.example.shared.enumeration.BusStatus;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BusRepository extends JpaRepository<Bus, Long> {

    @Query("""
    SELECT b as bus, d as driver, dm as driverMate
        FROM Bus b
        LEFT JOIN Employee d ON b.driverId = d.id
        LEFT JOIN Employee dm ON b.driverMateId = dm.id
        WHERE
            (:numberPlate IS NULL OR b.numberPlate LIKE %:numberPlate%)
            AND (:seatNumber IS NULL OR b.seatNumber = :seatNumber)
            AND (:statuses IS NULL OR b.status in (:statuses))
            AND (:driverName IS NULL OR d.name LIKE %:driverName%)
            AND (:driverId IS NULL OR d.id = :driverId)
            AND (:driverMateName IS NULL OR dm.name LIKE %:driverMateName%)
            AND (:driverMateId IS NULL OR dm.id = :driverMateId)
    """)
    Page<GetListBusDTO> getListBus(
        @Param("numberPlate") String numberPlate,
        @Param("seatNumber") Integer seatNumber,
        @Param("statuses") List<BusStatus> statuses,
        @Param("driverName") String driverName,
        @Param("driverId") Long driverId,
        @Param("driverMateName") String driverMateName,
        @Param("driverMateId") Long driverMateId,
        Pageable pageable
    );

    Bus findByNumberPlate(String numberPlate);

    Boolean existsByDriverId(Long driverId);
}
