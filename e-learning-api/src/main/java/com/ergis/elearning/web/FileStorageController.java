package com.ergis.elearning.web;

import com.ergis.elearning.security.JwtTokenProvider;
import com.ergis.elearning.services.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@RestController
@CrossOrigin
public class FileStorageController {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private FileStorageService fileStorageService;

    @GetMapping("/preview/{fileName}")
    public ResponseEntity<Resource> previewFile(@RequestParam("fileType") String fileType,
                                                @RequestParam("token") String token,
                                                @PathVariable String fileName,
                                                HttpServletRequest request, HttpServletResponse response) throws Exception {

        String jwt = token.substring(7, token.length());
        if(jwtTokenProvider.validateToken(jwt))
        {
            Resource resource = fileStorageService.getFileResource(fileName, fileType);
            String mimeType;
            try {
                mimeType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
            } catch (IOException e) {
                mimeType = MediaType.APPLICATION_OCTET_STREAM_VALUE; // a fallback value
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(mimeType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; fileName=" + resource.getFilename())
                    .body(resource);
        }
        else throw new Exception("Invalid token");
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<Resource> downloadFile(@RequestParam("fileType") String fileType,
                                                 @RequestParam("token") String token,
                                                 @PathVariable String fileName,
                                                 HttpServletRequest request) throws Exception {

        String jwt = token.substring(7, token.length());
        if(jwtTokenProvider.validateToken(jwt))
        {
            Resource resource = fileStorageService.getFileResource(fileName, fileType);
            String mimeType;
            try {
                mimeType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
            } catch (IOException e) {
                mimeType = MediaType.APPLICATION_OCTET_STREAM_VALUE; // a fallback value
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(mimeType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; fileName=" + resource.getFilename())
                    .body(resource);
        }
        else throw new Exception("Invalid token");
    }

    // Multiple download
    @GetMapping("/zipDownload")
    public void zipDownload(@RequestParam("fileType") String fileType,
                            @RequestParam("fileNames") String[] files,
                            @RequestParam("token") String token,
                            HttpServletResponse response) throws Exception {

        String jwt = token.substring(7, token.length());
        if(jwtTokenProvider.validateToken(jwt))
        {
            response.setStatus(200);
            response.setContentType("application/octet-stream");
            response.setHeader("Content-Disposition", "attachment;filename=attachments.zip");

            try (ZipOutputStream zos = new ZipOutputStream(response.getOutputStream())) {
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
                                throw new RuntimeException("Some error occurred while zipping");
                            }
                        });
                zos.finish();
            }
        }
        else throw new Exception("Invalid token");
    }
}