package com.ergis.elearning.repositories;

import com.ergis.elearning.domain.AlternativeBase;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAlternativeBaseRepository extends CrudRepository<AlternativeBase, Long> {
}
