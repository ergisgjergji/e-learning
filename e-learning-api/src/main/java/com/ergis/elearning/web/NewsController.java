package com.ergis.elearning.web;

import com.ergis.elearning.ViewModel.CreateNewsViewModel;
import com.ergis.elearning.domain.News;
import com.ergis.elearning.services.NewsService;
import com.ergis.elearning.services.errors.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
import javax.validation.Valid;
import java.util.List;

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

    @PostMapping("")
    public ResponseEntity<News> create(@Valid @RequestBody CreateNewsViewModel model) {

        News news = newsService.create(model);
        return new ResponseEntity<News>(news, HttpStatus.OK);
    }
}
