package com.example.api.services.pickup_point.dto;

import com.example.shared.db.dto.GetListPickupPointDTO;
import com.example.shared.db.dto.GetStudentPickupPointDTO;
import com.example.shared.db.entities.Parent;
import com.example.shared.db.entities.PickupPoint;
import com.example.shared.db.entities.Ride;
import com.example.shared.db.entities.Student;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetStudentPickupPointOutput {
    private PickupPoint pickupPoint;
    private Student student;
    private Parent parent;
    public static GetStudentPickupPointOutput fromDto(GetStudentPickupPointDTO dto) {
        return GetStudentPickupPointOutput.builder()
            .pickupPoint(dto.getPickupPoint())
            .student(dto.getStudent())
            .parent(dto.getStudent().getParent())
            .build();
    }
}
