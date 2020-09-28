package com.ergis.elearning.services;

import com.ergis.elearning.ViewModel.CreateNewsViewModel;
import com.ergis.elearning.ViewModel.FileUploadResponse;
import com.ergis.elearning.domain.News;
import com.ergis.elearning.domain.NewsAttachment;
import com.ergis.elearning.repositories.INewsAttachmentRepository;
import com.ergis.elearning.repositories.INewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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

    public News create(CreateNewsViewModel model) {

        News news = new News();
        news.setHeader(model.getHeader());
        news.setBody(model.getBody());
        news = newsRepository.save(news);

        if(!model.getAttachments().isEmpty())
            for (MultipartFile file : model.getAttachments()) {

                FileUploadResponse response = fileStorageService.storeAttachment(file);

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
}
