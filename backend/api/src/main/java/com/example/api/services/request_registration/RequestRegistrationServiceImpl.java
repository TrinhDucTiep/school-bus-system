package com.example.api.services.request_registration;

import com.example.api.services.request_registration.dto.CreateRequestInput;
import com.example.shared.db.entities.Parent;
import com.example.shared.db.entities.RequestRegistration;
import com.example.shared.db.entities.Student;
import com.example.shared.db.repo.ParentRepository;
import com.example.shared.db.repo.RequestRegistrationRepository;
import com.example.shared.db.repo.StudentRepository;
import com.example.shared.enumeration.RequestRegistrationStatus;
import com.example.shared.exception.MyException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class RequestRegistrationServiceImpl implements RequestRegistrationService{
    private final RequestRegistrationRepository requestRegistrationRepository;
    private final ParentRepository parentRepository;
    private final StudentRepository studentRepository;

    @Override
    public void createRequest(CreateRequestInput input) {
        // validate input
        if (input.getStudentId() == null && input.getParentId() == null) {
            throw new MyException(null,
                "CREATE_REQUEST_ERROR",
                "Invalid input",
                HttpStatus.BAD_REQUEST);
        }

        Student student = null;
        Parent parent = null;
        if (input.getStudentId() != null) {
            student = studentRepository.findById(input.getStudentId())
                    .orElseThrow(() -> new MyException(null,
                        "CREATE_REQUEST_ERROR",
                        "Student not found",
                        HttpStatus.NOT_FOUND));
        }
        if (input.getParentId() != null) {
            parent = parentRepository.findById(input.getParentId())
                    .orElseThrow(() -> new MyException(null,
                        "CREATE_REQUEST_ERROR",
                        "Parent not found",
                        HttpStatus.NOT_FOUND));
        }

        // create request
        RequestRegistration requestRegistration = RequestRegistration.builder()
                .student(student)
                .parent(parent)
                .address(input.getAddress())
                .longitude(input.getLongitude())
                .latitude(input.getLatitude())
                .status(RequestRegistrationStatus.PENDING)
                .build();
    }
}
