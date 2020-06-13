package com.ergis.elearning.repositories;

import com.ergis.elearning.domain.Course;
import com.ergis.elearning.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface IUserRepository extends CrudRepository<User, Long> {

    User getById(Long id);
    User findByUsername(String username);
    User findByIdAndRole(Long id, String role);

    Set<User> findAll();

    Set<User> findAllByRole(String role);
    Set<User> findAllByCoursesAndRole(Course course, String role);
    Set<User> findAllByCourses_IdNotAndRole(Long course_id, String role);
}
