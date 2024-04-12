package com.example.api.services.request_registration;

import com.example.api.controllers.client.dto.StudentAddress;
import com.example.api.services.request_registration.dto.CreateRequestInput;
import com.example.shared.db.entities.Account;
import com.example.shared.db.entities.Parent;
import com.example.shared.db.entities.RequestRegistration;
import com.example.shared.db.entities.Student;
import com.example.shared.db.repo.ParentRepository;
import com.example.shared.db.repo.RequestRegistrationRepository;
import com.example.shared.db.repo.StudentRepository;
import com.example.shared.enumeration.RequestRegistrationStatus;
import com.example.shared.exception.MyException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class RequestRegistrationServiceImpl implements RequestRegistrationService{
    private final RequestRegistrationRepository requestRegistrationRepository;
    private final ParentRepository parentRepository;
    private final StudentRepository studentRepository;

    @Override
    @Transactional
    public void upsertRegistration(CreateRequestInput input, Account account) {

        Parent parent = parentRepository.findByAccountId(account.getId()).orElseThrow(
            () -> new MyException(
                null,
                "PARENT_NOT_FOUND",
                "Parent not found",
                HttpStatus.NOT_FOUND
            )
        );
        List<RequestRegistration> requestRegistrations = requestRegistrationRepository.findByParentId(input.getParentId());
        if (!requestRegistrations.isEmpty()) {
            requestRegistrationRepository.deleteAll(requestRegistrations);
        }
        for (StudentAddress studentAddress : input.getStudentAddress()) {
            Student student = studentRepository.findById(studentAddress.getStudentId()).orElseThrow(
                () -> new MyException(
                    null,
                    "STUDENT_NOT_FOUND",
                    "Student not found",
                    HttpStatus.NOT_FOUND
                )
            );
            RequestRegistration requestRegistration = RequestRegistration.builder()
                .parent(parent)
                .student(student)
                .status(RequestRegistrationStatus.PENDING)
                .build();
            requestRegistrationRepository.save(requestRegistration);
        }

    }
}
