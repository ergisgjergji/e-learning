package com.ergis.elearning.repositories;

import com.ergis.elearning.domain.Alternative;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAlternativeRepository extends CrudRepository<Alternative, Long> {

    Alternative getById(Long id);
}
