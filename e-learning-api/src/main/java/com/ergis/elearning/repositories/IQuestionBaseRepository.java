package com.ergis.elearning.repositories;

import com.ergis.elearning.domain.QuestionBase;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IQuestionBaseRepository extends CrudRepository<QuestionBase, Long> {
}
