package com.ergis.elearning.web;

import com.ergis.elearning.services.FileUploadService;
import com.ergis.elearning.services.errors.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

@RestController
@RequestMapping("/api/uploads")
@CrossOrigin
public class FileUploadController {

    @Autowired
    private FileUploadService fileUploadService;

    @PostMapping("/photo/{id}")
    public ResponseEntity<?> uploadImage(@PathVariable String id, @RequestParam("file")MultipartFile file, Principal principal) {

        String path = fileUploadService.uploadPhoto(file, Long.parseLong(id), principal.getName());
        return new ResponseEntity<String>(path, HttpStatus.OK);
    }
}
