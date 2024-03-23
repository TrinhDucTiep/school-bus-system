package com.example.shared.db.repo;

import com.example.shared.db.dto.GetListBusDTO;
import com.example.shared.db.entities.Bus;
import com.example.shared.enumeration.BusStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BusRepository extends JpaRepository<Bus, Long> {

    @Query("""
    SELECT b as bus, d as driver, dm as driverMate
        FROM Bus b, Employee d, Employee dm
        WHERE
            b.driverId = d.id
            AND b.driverMateId = dm.id
            AND (:numberPlate IS NULL OR b.numberPlate LIKE %:numberPlate%)
            AND (:seatNumber IS NULL OR b.seatNumber = :seatNumber)
            AND (:status IS NULL OR b.status = :status)
            AND (:driverName IS NULL OR d.name LIKE %:driverName%)
            AND (:driverId IS NULL OR d.id = :driverId)
            AND (:driverMateName IS NULL OR dm.name LIKE %:driverMateName%)
            AND (:driverMateId IS NULL OR dm.id = :driverMateId)
    """)
    Page<GetListBusDTO> getListBus(
        String numberPlate,
        Integer seatNumber,
        BusStatus status,
        String driverName,
        Long driverId,
        String driverMateName,
        Long driverMateId,
        Pageable pageable
    );

    Bus findByNumberPlate(String numberPlate);
}
