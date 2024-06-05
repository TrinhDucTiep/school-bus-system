package com.example.api.controllers.admin;

import com.example.api.controllers.admin.dto.UpsertStudentAssignRequest;
import com.example.api.services.student_assign.StudentAssignService;
import com.example.shared.response.CommonResponse;
import com.example.shared.utils.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/student-assign")
@RequiredArgsConstructor
@Slf4j
public class StudentAssignController {
    private final StudentAssignService studentAssignService;
    @PostMapping()
    public ResponseEntity<CommonResponse<Object>> upsertStudentAssign(
        @RequestBody UpsertStudentAssignRequest request
    ) {
        studentAssignService.upsertStudentAssign(request.toInput());

        return ResponseUtil.toSuccessCommonResponse("StudentAssigns were upserted successfully");
    }
}
