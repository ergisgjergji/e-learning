package com.ergis.elearning.services;

import com.ergis.elearning.ViewModel.CreateNewsViewModel;
import com.ergis.elearning.ViewModel.FileUploadResponse;
import com.ergis.elearning.domain.News;
import com.ergis.elearning.domain.NewsAttachment;
import com.ergis.elearning.exceptions.NewsExceptions.NewsHeaderException;
import com.ergis.elearning.exceptions.NewsExceptions.NewsIdException;
import com.ergis.elearning.repositories.INewsAttachmentRepository;
import com.ergis.elearning.repositories.INewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class NewsService {

    @Autowired
    private INewsRepository newsRepository;
    @Autowired
    private INewsAttachmentRepository newsAttachmentRepository;
    @Autowired
    private FileStorageService fileStorageService;

    public int getCount() {
        return newsRepository.getCount();
    }

    public List<News> getAll(int page, int size) {

        Pageable pagination = PageRequest.of(page, size, Sort.by("createdTime").descending());
        Page<News> news = newsRepository.findAll(pagination);
        news.forEach(n -> {
            n.getAttachments();
        });
        return news.toList();
    }

    public News create(CreateNewsViewModel model) throws Exception {

        News duplicateHeader = newsRepository.findByHeader(model.getHeader());
        if(duplicateHeader != null) throw new NewsHeaderException("News with this header already exists");

        News news = new News();
        news.setHeader(model.getHeader());
        news.setBody(model.getBody());
        news = newsRepository.save(news);

        if(model.getAttachments() != null && model.getAttachments().length > 0)
            for (MultipartFile file : model.getAttachments()) {

                String formatedFileName = this.formatFileName(news, file);
                checkForDuplicateFile(formatedFileName);
                FileUploadResponse response = fileStorageService.storeAttachment(file, formatedFileName);

                NewsAttachment attachment = new NewsAttachment();
                attachment.setFileName(response.getFileName());
                attachment.setContentType(response.getContentType());
                attachment.setPreviewEnabled(response.getPreviewEnabled());
                attachment.setPreviewUrl(response.getPreviewUrl());
                attachment.setDownloadUrl(response.getDownloadUrl());
                attachment.setNews(news);

                attachment = newsAttachmentRepository.save(attachment);
                news.getAttachments().add(attachment);
            }
        return news;
    }

    public News update(News updatedNews) throws Exception {

        // The news can only be updated within 1 day of its creation time
        News news = newsRepository.getById(updatedNews.getId());

        checkIfIsWithinUpdateLimit(news.getCreatedTime());

        news.setHeader(updatedNews.getHeader());
        news.setBody(updatedNews.getBody());

        return newsRepository.save(news);
    }

    public void delete(Long id) {

        News news = newsRepository.getById(id);
        if(news == null) throw new NewsIdException("News with id '" + id + "' not found");

        newsRepository.delete(news);
    }

    // Helpers
    private void checkIfIsWithinUpdateLimit(Date createdTime) throws Exception {
        Date now = new Date();
        Date due_date;

        Calendar cal = Calendar.getInstance();
        cal.setTime(createdTime);
        cal.add(Calendar.DATE, 1); //minus number would decrement the days
        due_date = cal.getTime();

        if(now.compareTo(due_date) > 0)
            throw new Exception("The news can only be updated within 1 day of its creation time");
    }
    private String formatFileName(News news, MultipartFile file) {
        return StringUtils.cleanPath(news.getId() + "_" + file.getOriginalFilename());
    }
    private void checkForDuplicateFile(String fileName) throws Exception {

        NewsAttachment attachment = newsAttachmentRepository.findByFileName(fileName);
        if(attachment != null) throw new Exception("An attachment with name '" + fileName + "' already exists");
    }

    //#region ------------------------------------------ NEWS-ATTACHMENT -----------------------------------------------

    public News addAttachments(Long id, MultipartFile[] files) throws Exception {

        News news = newsRepository.getById(id);
        if(news == null) throw new NewsIdException("News with id '" + id + "' not found");

        checkIfIsWithinUpdateLimit(news.getCreatedTime());

        for (MultipartFile file : files) {

            String formatedFileName = this.formatFileName(news, file);
            checkForDuplicateFile(formatedFileName);
            FileUploadResponse response = fileStorageService.storeAttachment(file, formatedFileName);

            NewsAttachment attachment = new NewsAttachment();
            attachment.setFileName(response.getFileName());
            attachment.setContentType(response.getContentType());
            attachment.setPreviewEnabled(response.getPreviewEnabled());
            attachment.setPreviewUrl(response.getPreviewUrl());
            attachment.setDownloadUrl(response.getDownloadUrl());
            attachment.setNews(news);

            attachment = newsAttachmentRepository.save(attachment);
            news.getAttachments().add(attachment);
        }

        return news;
    }

    public News removeAttachment(Long news_id, Long attachment_id) throws Exception {

        News news = newsRepository.getById(news_id);
        if(news == null) throw new NewsIdException("News with id '" + news_id + "' not found");

        checkIfIsWithinUpdateLimit(news.getCreatedTime());

        NewsAttachment attachment = newsAttachmentRepository.getById(attachment_id);
        news.getAttachments().remove(attachment);

        fileStorageService.removeAttachment(attachment.getFileName());
        newsAttachmentRepository.delete(attachment);

        return news;
    }

    public News removeAttachments(Long news_id, HashSet<Long> attachment_ids) throws Exception {

        News news = newsRepository.getById(news_id);
        if(news == null) throw new NewsIdException("News with id '" + news_id + "' not found");

        checkIfIsWithinUpdateLimit(news.getCreatedTime());

        attachment_ids.forEach(id -> {

            NewsAttachment attachment = newsAttachmentRepository.getById(id);
            news.getAttachments().remove(attachment);

            fileStorageService.removeAttachment(attachment.getFileName());
            newsAttachmentRepository.delete(attachment);
        });
        return news;
    }

    //endregion
}
