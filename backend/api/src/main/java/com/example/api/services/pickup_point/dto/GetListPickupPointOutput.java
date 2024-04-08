package com.example.api.services.pickup_point.dto;

import com.example.shared.db.dto.GetListPickupPointDTO;
import com.example.shared.db.entities.PickupPoint;
import com.example.shared.db.entities.Ride;
import com.example.shared.db.entities.Student;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetListPickupPointOutput {
    private PickupPoint pickupPoint;
    private List<Student> students;
    private List<Ride> rides;

    public static GetListPickupPointOutput fromDto(GetListPickupPointDTO dto) {
        return GetListPickupPointOutput.builder()
            .pickupPoint(dto.getPickupPoint())
            .students(dto.getStudents())
            .rides(dto.getRides())
            .build();
    }
}
