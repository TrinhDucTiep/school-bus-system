package com.example.api.services.request_registration;

import com.example.api.controllers.client.dto.StudentAddress;
import com.example.api.services.common_dto.ParentOutput;
import com.example.api.services.common_dto.RequestRegistrationOutput;
import com.example.api.services.common_dto.StudentOutput;
import com.example.api.services.request_registration.dto.CreateRequestInput;
import com.example.api.services.request_registration.dto.GetListRequestRegistrationOutput;
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
        if (input.getStudentIds() == null || input.getStudentIds().isEmpty()
            || input.getAddress() == null || input.getAddress().isBlank()
            || input.getLongitude() == null || input.getLatitude() == null) {
            throw new MyException(
                null,
                "INVALID_INPUT",
                "Invalid input",
                HttpStatus.BAD_REQUEST
            );
        }

        Parent parent = parentRepository.findByAccountId(account.getId()).orElseThrow(
            () -> new MyException(
                null,
                "PARENT_NOT_FOUND",
                "Parent not found",
                HttpStatus.NOT_FOUND
            )
        );

        // validate student is children of parent
        List<Long> studentIds = studentRepository.findStudentIdsByParentId(parent.getId());
        for (Long studentId : input.getStudentIds()) {
            if (!studentIds.contains(studentId)) {
                throw new MyException(
                    null,
                    "STUDENT_NOT_CHILDREN_OF_PARENT",
                    "Student not children of parent",
                    HttpStatus.NOT_FOUND
                );
            }
        }

        // validate if exist request registration for those students => delete them to add new one
        List<RequestRegistration> requestRegistrations = requestRegistrationRepository
            .findByParentIdAndStudentIdInAndStatus(parent.getId(), studentIds, RequestRegistrationStatus.PENDING);
        if (!requestRegistrations.isEmpty()) {
            requestRegistrationRepository.deleteAll(requestRegistrations);
        }

        for (Long studentId : input.getStudentIds()) {
            Student student = studentRepository.findById(studentId).orElseThrow(
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
                .address(input.getAddress())
                .longitude(input.getLongitude())
                .latitude(input.getLatitude())
                .build();
            requestRegistrationRepository.save(requestRegistration);
        }

    }

    @Override
    public List<GetListRequestRegistrationOutput> getListRequestRegistration(Account account) {
        Parent parent = parentRepository.findByAccountId(account.getId()).orElseThrow(
            () -> new MyException(
                null,
                "PARENT_NOT_FOUND",
                "Parent not found",
                HttpStatus.NOT_FOUND
            )
        );

        List<RequestRegistration> requestRegistrations = requestRegistrationRepository.findByParentId(parent.getId());

        return requestRegistrations.stream().map(requestRegistration -> {
            Student student = requestRegistration.getStudent();
            return GetListRequestRegistrationOutput.builder()
                .parent(ParentOutput.fromEntity(parent))
                .student(StudentOutput.fromEntity(student))
                .requestRegistration(RequestRegistrationOutput.fromEntity(requestRegistration))
                .build();
        }).toList();
    }
}
