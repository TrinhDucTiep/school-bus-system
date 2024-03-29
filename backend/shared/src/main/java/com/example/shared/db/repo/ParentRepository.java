package com.example.shared.db.repo;

import com.example.shared.db.dto.GetParentAndChildDTO;
import com.example.shared.db.entities.Parent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ParentRepository extends JpaRepository<Parent, Long> {
    @Query(value = """
    select p
    from Parent p
    left join Account a on a.id = p.account.id
    inner join Student s on s.parent.id = p.id
    where (:id is null or p.id = :id)
    and (:role is null or a.role = :role)
    and :searchType is null or :name is null or 
        (CASE 
            WHEN :searchType = 'PARENT_NAME' THEN lower(p.name) like lower(concat('%', :name, '%'))
            WHEN :searchType = 'CHILD_NAME' THEN lower(s.name) like lower(concat('%', :name, '%'))
            ELSE FALSE 
        END)
    and (:phoneNumber is null or p.phoneNumber like concat(:phoneNumber,'%'))
        """)
    Page<Parent> searchPageParent(
        @Param("id") Long id,
        @Param("name") String name,
        @Param("role") String role,
        @Param("searchType") String searchType,
        @Param("phoneNumber") String phoneNumber,
        Pageable pageable
    );
}
