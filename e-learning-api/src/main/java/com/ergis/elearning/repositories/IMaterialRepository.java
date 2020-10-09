package com.ergis.elearning.repositories;

import com.ergis.elearning.domain.Lecture;
import com.ergis.elearning.domain.Material;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface IMaterialRepository extends CrudRepository<Material, Long> {

    Material findByFileNameAndLecture(String fileName, Lecture lecture);
    Material findByIdAndLecture(Long id, Lecture lecture);
}
