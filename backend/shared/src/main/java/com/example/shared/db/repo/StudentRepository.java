package com.example.shared.db.repo;

import com.example.shared.db.entities.Student;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query("""
        select s from Student s
        where
        (:id is null or s.id = :id)
        and (:name is null or s.name is null or s.name ILIKE %:name%)
        and (:studentClass is null or s.studentClass is null or s.studentClass ILIKE %:studentClass%)
        and (:phoneNumber is null or s.phoneNumber like %:phoneNumber%)
        and (:parentId is null or s.parent.id = :parentId)
        """)
    Page<Student> searchPageStudent(
        @Param("id") Long id,
        @Param("name") String name,
        @Param("phoneNumber") String phoneNumber,
        @Param("parentId") Long parentId,
        @Param("studentClass") String studentClass,
        Pageable pageable
    );

    List<Student> findByParent_Id(Long id);

}
