package com.ergis.elearning.web;

import com.ergis.elearning.ViewModel.CreateNewsViewModel;
import com.ergis.elearning.domain.News;
import com.ergis.elearning.services.NewsService;
import com.ergis.elearning.services.errors.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.security.PermitAll;
import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/news")
@CrossOrigin
public class NewsController {

    @Autowired
    private NewsService newsService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @GetMapping("/count")
    @PermitAll
    public ResponseEntity<Integer> getCount() {

        int count = newsService.getCount();
        return new ResponseEntity<Integer>(count, HttpStatus.OK);
    }

    @GetMapping("/all")
    @PermitAll
    public ResponseEntity<List<News>> getAll(@RequestParam("page") String page, @RequestParam("size") String size) {

        List<News> news = newsService.getAll(Integer.parseInt(page), Integer.parseInt(size));
        return new ResponseEntity<List<News>>(news, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<News> getById(@PathVariable String id) {

        News news = newsService.getById(Long.parseLong(id));
        return new ResponseEntity<News>(news, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("")
    public ResponseEntity<News> create(
            @RequestParam("header") String header,
            @RequestParam("body") String body,
            @RequestParam("attachments") MultipartFile[] attachments) throws Exception
    {
        CreateNewsViewModel model = new CreateNewsViewModel(header, body, attachments);
        News news = newsService.create(model);
        return new ResponseEntity<News>(news, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("")
    public ResponseEntity<News> update(@Valid @RequestBody News updatedNews) throws Exception {

        News news = newsService.update(updatedNews);
        return new ResponseEntity<News>(news, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {

        newsService.delete(Long.parseLong(id));
        return new ResponseEntity<String>("News with id '" + id + "' deleted successfully", HttpStatus.OK);
    }

    //#region ------------------------------------------ NEWS-ATTACHMENT -----------------------------------------------

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{id}")
    public ResponseEntity<News> addAttachments(@PathVariable String id, @RequestParam("files") MultipartFile[] files) throws Exception {

        News news = newsService.addAttachments(Long.parseLong(id), files);
        return new ResponseEntity<News>(news, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{news_id}/attachment/{attachment_id}")
    public ResponseEntity<News> removeAttachment(@PathVariable String news_id, @PathVariable String attachment_id) throws Exception {

        News news = newsService.removeAttachment(Long.parseLong(news_id), Long.parseLong(attachment_id));
        return new ResponseEntity<News>(news, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}/attachment")
    public ResponseEntity<News> removeAttachments(@PathVariable String id, @RequestBody String[] ids) throws Exception {

        HashSet<Long> attachment_ids = new HashSet<Long>();

        for(String attachment_id: ids)
            attachment_ids.add(Long.parseLong(attachment_id));

        News news = newsService.removeAttachments(Long.parseLong(id), attachment_ids);
        return new ResponseEntity<News>(news, HttpStatus.OK);
    }

    //endregion
}
