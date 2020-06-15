package com.ergis.elearning.repositories;

import com.ergis.elearning.domain.Question;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IQuestionRepository extends CrudRepository<Question, Long> {
}
