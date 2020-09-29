package com.ergis.elearning.repositories;

import com.ergis.elearning.domain.News;
import com.ergis.elearning.domain.NewsAttachment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface INewsAttachmentRepository extends CrudRepository<NewsAttachment, Long> {

    Set<NewsAttachment> findAllByNews(News news);

    NewsAttachment getById(Long id);

    NewsAttachment findByFileName(String fileName);
}
