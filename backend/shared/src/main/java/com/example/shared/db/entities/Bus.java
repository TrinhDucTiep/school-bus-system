package com.example.shared.db.entities;

import com.example.shared.enumeration.BusStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tieptd_194185_bus")
public class Bus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "number_plate")
    private String numberPlate;

    @Column(name = "seat_number")
    private Integer seatNumber;

    @Column(name = "driver_id")
    private Long driverId;

    @Column(name = "driver_mate_id")
    private Long driverMateId;

    @Enumerated(EnumType.STRING)
    private BusStatus status;

    @CreatedDate
    @CreationTimestamp
    private Instant createdAt;
    @LastModifiedDate
    @UpdateTimestamp
    private Instant updatedAt;
}
