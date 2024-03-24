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
    select p.id as parent_id
    , p.name as parent_name
    , p.role as parent_role
    , p.avatar as parent_avatar
    , p.date_of_birth as parent_date_of_birth
    ,
        c.id as child_id
        , c.name as child_name
        , c.avatar as child_avatar
        , c.date_of_birth as child_date_of_birth
    from tieptd_194185_parent p
    left join tieptd_194185_child c on p.id = c.parent_id
    where (:id is null or p.id = :id)
    and (:role is null or p.role = :role)
    and (:searchType is null or :name is null or 
        (CASE 
            WHEN :searchType = 'PARENT_NAME' THEN p.name like %:name%
            WHEN :searchType = 'CHILD_NAME' THEN c.name like %:name%
            ELSE FALSE 
        END))
        """, nativeQuery = true)
    Page<GetParentAndChildDTO> searchPageParent(
        @Param("id") Long id,
        @Param("name") String name,
        @Param("role") String role,
        @Param("searchType") String searchType,
        Pageable pageable
    );
}
