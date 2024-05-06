package com.example.api.services.history;

import com.example.api.services.common_dto.BusOutput;
import com.example.api.services.common_dto.RideOutput;
import com.example.api.services.common_dto.StudentOutput;
import com.example.api.services.history.dto.AdminHistoryRideFilterParam;
import com.example.api.services.history.dto.AdminHistoryRideOutput;
import com.example.shared.db.entities.Bus;
import com.example.shared.db.entities.Ride;
import com.example.shared.db.entities.StudentPickupPointHistory;
import com.example.shared.db.repo.BusRepository;
import com.example.shared.db.repo.ParentRepository;
import com.example.shared.db.repo.PickupPointRepository;
import com.example.shared.db.repo.RideHistoryRepository;
import com.example.shared.db.repo.RidePickupPointHistoryRepository;
import com.example.shared.db.repo.RideRepository;
import com.example.shared.db.repo.StudentPickupPointHistoryRepository;
import com.example.shared.db.repo.StudentRepository;
import com.example.shared.exception.MyException;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class HistoryServiceImpl implements HistoryService {
    private final RideRepository rideRepository;
    private final BusRepository busRepository;
    private final PickupPointRepository pickupPointRepository;
    private final StudentRepository studentRepository;
    private final ParentRepository parentRepository;
    private final StudentPickupPointHistoryRepository studentPickupPointHistoryRepository;
    private final RideHistoryRepository rideHistoryRepository;
    private final RidePickupPointHistoryRepository ridePickupPointHistoryRepository;

    @Override
    public Page<AdminHistoryRideOutput> getAdminHistoryRides(
        AdminHistoryRideFilterParam filterParam, Pageable pageable) {
        Page<AdminHistoryRideOutput> result = null;
        // find ride page
        Page<Ride> ridepage = rideRepository.searchHistory(
            filterParam.getStartAt(), filterParam.getRideId(),
            filterParam.getNumberPlate(), filterParam.getStatus(), filterParam.getIsToSchool(),
            filterParam.getAddress(), filterParam.getStudentPhoneNumber(),
            filterParam.getParentPhoneNumber(),
            pageable
        );

        // map to output
        result = ridepage.map(ride -> {
            Bus bus = busRepository.findById(ride.getBus().getId())
                .orElseThrow(() -> new MyException(
                    null, "BUS_NOT_FOUND", "Bus not found", HttpStatus.NOT_FOUND
                ));
            return AdminHistoryRideOutput.builder()
                .bus(BusOutput.fromEntity(bus))
                .ride(RideOutput.fromEntity(ride))
                .rideHistories(rideHistoryRepository.findByRideId(ride.getId()))
                .ridePickupPointHistories(
                    ridePickupPointHistoryRepository.findByRideId(ride.getId())
                )
                .studentRideHistories(
                    studentPickupPointHistoryRepository.findByRideId(ride.getId()).stream()
                        .collect(Collectors.groupingBy(
                            StudentPickupPointHistory::getStudentId
                        ))
                        .keySet().stream()
                        .map(
                            studentPickupPointHistories -> AdminHistoryRideOutput.StudentRideHistory.builder()
                                .student(StudentOutput.fromEntity(
                                    studentRepository.findById(studentPickupPointHistories)
                                        .orElseThrow(() -> new MyException(
                                            null, "STUDENT_NOT_FOUND", "Student not found",
                                            HttpStatus.NOT_FOUND
                                        ))
                                ))
                                .studentPickupPointHistories(
                                    studentPickupPointHistoryRepository.findByRideIdAndStudentId(
                                        ride.getId(), studentPickupPointHistories
                                    )
                                )
                                .build()
                        )
                        .collect(Collectors.toList())
                )
                .build();
        });

        return result;
    }
}
