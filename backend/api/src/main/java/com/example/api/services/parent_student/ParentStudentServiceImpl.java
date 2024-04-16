package com.example.api.services.parent_student;

import com.example.api.services.parent_student.dto.GetStudentRideOutput;
import com.example.shared.db.entities.Account;
import com.example.shared.db.entities.Parent;
import com.example.shared.db.repo.BusRepository;
import com.example.shared.db.repo.ParentRepository;
import com.example.shared.db.repo.PickupPointRepository;
import com.example.shared.db.repo.RidePickupPointRepository;
import com.example.shared.db.repo.RideRepository;
import com.example.shared.db.repo.StudentPickupPointRepository;
import com.example.shared.db.repo.StudentRepository;
import com.example.shared.exception.MyException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ParentStudentServiceImpl implements ParentStudentService{
    private final ParentRepository parentRepository;
    private final StudentRepository studentRepository;
    private final StudentPickupPointRepository studentPickupPointRepository;
    private final PickupPointRepository pickupPointRepository;
    private final RidePickupPointRepository ridePickupPointRepository;
    private final RideRepository rideRepository;
    private final BusRepository busRepository;

    @Override
    public List<GetStudentRideOutput> getStudentRides(Account account) {
        Parent parent = parentRepository.findByAccountId(account.getId()).orElseThrow(
            () -> new MyException(
                null,
                "parent_not_found",
                "Parent not found for account id: " + account.getId(),
                HttpStatus.BAD_REQUEST
            )
        );

        List<Long> studentIds = studentRepository.findStudentIdsByParentId(parent.getId());

        return getStudentRides(studentIds);
    }

    @Override
    public List<GetStudentRideOutput> getStudentRides(List<Long> studentIds) {
        List<GetStudentRideOutput> result = new ArrayList<>();

        for (Long studentId : studentIds) {

        }

        return null;
    }
}
