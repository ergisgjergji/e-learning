package com.ergis.elearning.repositories;

import com.ergis.elearning.domain.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface INewsRepository extends PagingAndSortingRepository<News, Long> {

    News getById(Long id);

    @Query(value = "SELECT count(1) FROM news", nativeQuery = true)
    int getCount();

    Page<News> findAll(Pageable pageable);

}
