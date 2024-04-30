package com.example.api.services.student_pickup_point;

import com.example.api.services.student_pickup_point.dto.UpdateStudentPickupPointEmployeeInput;
import com.example.shared.db.entities.Account;
import com.example.shared.db.entities.Bus;
import com.example.shared.db.entities.Employee;
import com.example.shared.db.entities.PickupPoint;
import com.example.shared.db.entities.Ride;
import com.example.shared.db.entities.StudentPickupPoint;
import com.example.shared.db.repo.BusRepository;
import com.example.shared.db.repo.EmployeeRepository;
import com.example.shared.db.repo.PickupPointRepository;
import com.example.shared.db.repo.RideRepository;
import com.example.shared.db.repo.StudentPickupPointRepository;
import com.example.shared.db.repo.StudentRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class StudentPickupPointServiceImpl implements StudentPickupPointService {
    private final StudentPickupPointRepository studentPickupPointRepository;
    private final EmployeeRepository employeeRepository;
    private final PickupPointRepository pickupPointRepository;
    private final StudentRepository studentRepository;
    private final RideRepository rideRepository;
    private final BusRepository busRepository;

    @Override
    @Transactional
    public void updateStudentPickupPointEmployee(UpdateStudentPickupPointEmployeeInput input,
                                                 Account account) {
        Employee employee = employeeRepository.findByAccountId(account.getId())
                .orElseThrow(() -> new IllegalArgumentException("Employee not found"));

        // validate input
        List<StudentPickupPoint> studentPickupPoints = input.getStudentIds().stream()
                .map(studentId -> studentPickupPointRepository.findByStudentIdAndPickupPointId(
                        studentId, input.getPickupPointId())
                        .orElseThrow(() -> new IllegalArgumentException("Student pickup point not found"))
                ).toList();

        // update student pickup point
        studentPickupPoints.forEach(studentPickupPoint -> {
            studentPickupPoint.setStatus(input.getStatus());
        });

        studentPickupPointRepository.saveAll(studentPickupPoints);
    }
}
