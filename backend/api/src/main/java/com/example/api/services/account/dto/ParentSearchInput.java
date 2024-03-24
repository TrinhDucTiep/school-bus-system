package com.example.api.services.account.dto;


import java.time.Instant;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Pageable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParentSearchInput {
    private Long id;

    private String name;

    private String role;

    private SearchBy searchBy;

    private Pageable pageable;

    @Getter
    public enum SearchBy {
        PARENT_NAME("PARENT_NAME"),
        CHILD_NAME("CHILD_NAME"),
        ;
        private final String value;

        SearchBy(String value) {
            this.value = value;
        }
    }
}
