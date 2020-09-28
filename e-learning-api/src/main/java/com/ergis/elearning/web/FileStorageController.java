package com.ergis.elearning.web;

import com.ergis.elearning.services.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@RestController
@CrossOrigin
public class FileStorageController {

    @Autowired
    private FileStorageService fileStorageService;

    @GetMapping("/preview/{fileName}")
    public ResponseEntity<Resource> previewFile(@RequestParam("fileType") String fileType,
                                                @PathVariable String fileName,
                                                HttpServletRequest request) {

        Resource resource = fileStorageService.getFileResource(fileName, fileType);
        String mimeType;
        try {
            mimeType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException e) {
            mimeType = MediaType.APPLICATION_OCTET_STREAM_VALUE; // a fallback value
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(mimeType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; fileName="+resource.getFilename())
                .body(resource);
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<Resource> downloadFile(@RequestParam("fileType") String fileType,
                                                 @PathVariable String fileName,
                                                 HttpServletRequest request) {

        Resource resource = fileStorageService.getFileResource(fileName, fileType);
        String mimeType;
        try {
            mimeType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException e) {
            mimeType = MediaType.APPLICATION_OCTET_STREAM_VALUE; // a fallback value
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(mimeType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; fileName="+resource.getFilename())
                .body(resource);
    }

    // Multiple download
    @GetMapping("/zipDownload")
    public void zipDownload(@RequestParam("fileType") String fileType,
                            @RequestParam("fileNames") String[] files,
                            HttpServletResponse response) throws Exception {

        try(ZipOutputStream zos = new ZipOutputStream(response.getOutputStream()))
        {
            Arrays.asList(files)
                    .stream()
                    .forEach(fileName -> {

                        Resource resource = fileStorageService.getFileResource(fileName, fileType);
                        ZipEntry zipEntry = new ZipEntry(resource.getFilename());

                        try {
                            zipEntry.setSize(resource.contentLength());
                            zos.putNextEntry(zipEntry);
                            StreamUtils.copy(resource.getInputStream(), zos);
                            zos.closeEntry();

                        } catch (IOException e) {
                            throw new RuntimeException( "Some error occurred while zipping");
                        }
                    });
            zos.finish();
        }

        response.setStatus(200);
        response.addHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment;fileName=zipfile");
    }
}