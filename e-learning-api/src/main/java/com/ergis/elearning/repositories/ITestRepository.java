package com.ergis.elearning.repositories;

import com.ergis.elearning.domain.Test;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITestRepository extends CrudRepository<Test, Long> {
}
