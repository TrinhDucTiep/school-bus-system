package com.example.api.services.account;

import com.example.api.services.account.dto.ParentAddInput;
import com.example.api.services.account.dto.ParentDetailOutput;
import com.example.api.services.account.dto.ParentSearchInput;
import com.example.api.services.account.dto.ParentSearchOutput;
import com.example.api.services.account.dto.ParentUpdateInput;
import com.example.api.services.account.dto.StudentAddInput;
import com.example.api.services.account.dto.StudentSearchInput;
import com.example.api.services.account.dto.StudentSearchOutput;
import com.example.api.services.account.dto.StudentUpdateInput;
import org.springframework.data.domain.Page;

public interface AccountService {
    Page<ParentSearchOutput> searchParents(ParentSearchInput input);

    Page<StudentSearchOutput> searchStudents(StudentSearchInput input);
    ParentDetailOutput getParentDetail(Long id);
    void addStudent(StudentAddInput input);

    void updateStudent(StudentUpdateInput input);

    void deleteStudent(Long id);

    void addParent(ParentAddInput input);

    void updateParent(ParentUpdateInput input);

    void deleteParent(Long id);
}
