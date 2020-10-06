package com.ergis.elearning.repositories;

import com.ergis.elearning.domain.Course;
import com.ergis.elearning.domain.Material;
import com.ergis.elearning.domain.NewsAttachment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface IMaterialRepository extends CrudRepository<Material, Long> {

    Set<Material> findAll();
    Set<Material> findAllByCourse(Course course);

    Material getById(Long id);
    Material findByIdAndCourse(Long id, Course course);
    Material findByFileNameAndCourse(String fileName, Course course);
    Material findByDescriptionAndCourse(String description, Course course);
}
