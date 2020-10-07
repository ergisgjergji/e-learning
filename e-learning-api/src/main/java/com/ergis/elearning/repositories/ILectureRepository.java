package com.ergis.elearning.repositories;

import com.ergis.elearning.domain.Course;
import com.ergis.elearning.domain.Lecture;
import com.ergis.elearning.domain.Material;
import com.ergis.elearning.domain.NewsAttachment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ILectureRepository extends CrudRepository<Lecture, Long> {

    Set<Lecture> findAll();
    Set<Lecture> findAllByCourse(Course course);

    Lecture getById(Long id);
    Lecture findByIdAndCourse(Long id, Course course);
    Lecture findByNameAndCourse(String fileName, Course course);
}
