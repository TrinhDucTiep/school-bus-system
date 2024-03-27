package com.example.api.services.account;

import com.example.api.services.account.dto.ParentAddInput;
import com.example.api.services.account.dto.ParentSearchInput;
import com.example.api.services.account.dto.ParentSearchOutput;
import com.example.api.services.account.dto.ParentUpdateInput;
import com.example.api.services.account.dto.StudentAddInput;
import com.example.api.services.account.dto.StudentSearchInput;
import com.example.api.services.account.dto.StudentSearchOutput;
import com.example.api.services.account.dto.StudentUpdateInput;
import com.example.shared.db.entities.Parent;
import com.example.shared.db.entities.Student;
import com.example.shared.db.repo.ParentRepository;
import com.example.shared.db.repo.StudentRepository;
import com.example.shared.exception.MyException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AccountServiceImpl implements AccountService {
    private final ParentRepository parentRepository;
    private final StudentRepository studentRepository;


    @Override
    public Page<ParentSearchOutput> searchParents(ParentSearchInput input) {
        var res = parentRepository.searchPageParent(
            input.getId(),
            input.getName(),
            input.getRole(),
            input.getSearchBy().getValue(),
            input.getPageable()
        );
        return res.map(ParentSearchOutput::from);
    }

    @Override
    public Page<StudentSearchOutput> searchStudents(StudentSearchInput input) {
        var res = studentRepository.searchPageStudent(
            input.getId(),
            input.getName(),
            input.getStudentClass(),
            input.getPageable()
        );
        return res.map(StudentSearchOutput::from);
    }

    @Override
    public void addStudent(StudentAddInput input) {
        Parent parent = parentRepository.findById(input.getParentId())
            .orElseThrow(() -> new MyException(null, "PARENT_NOT_FOUND", "Parent not found",
                HttpStatus.NOT_FOUND));
        Student student = Student.builder()
            .name(input.getName())
            .studentClass(input.getStudentClass())
            .parent(parent)
            .phoneNumber(input.getPhoneNumber())
            .dob(input.getDob())
            .avatar(input.getAvatar())
            .build();
        studentRepository.save(student);
    }

    @Override
    public void updateStudent(StudentUpdateInput input) {
        Student student = studentRepository.findById(input.getId())
            .orElseThrow(() -> new MyException(null, "STUDENT_NOT_FOUND", "Student not found",
                HttpStatus.NOT_FOUND));
        Parent parent = parentRepository.findById(input.getParentId())
            .orElseThrow(() -> new MyException(null, "PARENT_NOT_FOUND", "Parent not found",
                HttpStatus.NOT_FOUND));

        student.setName(input.getName());
        student.setStudentClass(input.getStudentClass());
        student.setParent(parent);
        student.setDob(input.getDob());
        student.setAvatar(input.getAvatar());
        student.setPhoneNumber(input.getPhoneNumber());
        studentRepository.save(student);
    }

    @Override
    public void deleteStudent(Long id) {
        Student student = studentRepository.findById(id)
            .orElseThrow(() -> new MyException(null, "STUDENT_NOT_FOUND", "Student not found",
                HttpStatus.NOT_FOUND));
        studentRepository.delete(student);
    }

    @Override
    public void addParent(ParentAddInput input) {
        List<Long> studentIds = input.getStudentIds();
        Parent parent;
        if (studentIds == null) {
            parent = Parent.builder()
                .name(input.getName())
                .dob(input.getDob())
                .avatar(input.getAvatar())
                .build();
        } else {
            parent = Parent.builder()
                .name(input.getName())
                .dob(input.getDob())
                .avatar(input.getAvatar())
                .students(studentRepository.findAllById(input.getStudentIds()))
                .build();
        }

        parentRepository.save(parent);
    }

    @Override
    public void updateParent(ParentUpdateInput input) {
        Parent parent = parentRepository.findById(input.getId())
            .orElseThrow(() -> new MyException(null, "PARENT_NOT_FOUND", "Parent not found",
                HttpStatus.NOT_FOUND));
        parent.setName(input.getName());
        parent.setDob(input.getDob());
        parent.setAvatar(input.getAvatar());
        parent.setStudents(studentRepository.findAllById(input.getStudentIds()));
        parent.setPhoneNumber(input.getPhoneNumber());
        parentRepository.save(parent);
    }

    @Override
    public void deleteParent(Long id) {
        Parent parent = parentRepository.findById(id)
            .orElseThrow(() -> new MyException(null, "PARENT_NOT_FOUND", "Parent not found",
                HttpStatus.NOT_FOUND));
        parentRepository.delete(parent);
    }

}
