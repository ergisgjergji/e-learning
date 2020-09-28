package com.ergis.elearning.services;

import com.ergis.elearning.ViewModel.FileUploadResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {

    private final Path storagePath;
    private final Path attachmentsPath;
    private final Path materialsPath;
    private final Path assignmentsPath;
    private final String storageLocation;

    public FileStorageService(@Value("${file.storage.location:temp}") String storageLocation) {

        this.storageLocation = storageLocation;
        storagePath = Paths.get(storageLocation).toAbsolutePath().normalize();
        attachmentsPath = Paths.get(storagePath + "\\" + "attachments");
        materialsPath = Paths.get(storagePath + "\\" + "materials");
        assignmentsPath = Paths.get(storagePath + "\\" + "assignments");

        try {
            Files.createDirectories(storagePath);
            Files.createDirectories(attachmentsPath);
            Files.createDirectories(materialsPath);
            Files.createDirectories(assignmentsPath);
        } catch (IOException e) {
            throw new RuntimeException("Issue in creating file storage directory");
        }
    }

    public FileUploadResponse storeAttachment(MultipartFile file) {

        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Path url = Paths.get(attachmentsPath + "\\" + fileName);

        try {
            Files.copy(file.getInputStream(), url, StandardCopyOption.REPLACE_EXISTING);
            return getResource(file, attachmentsPath);
        }
        catch (IOException e) {
            throw new RuntimeException("Issue in storing the file");
        }
    }

    private FileUploadResponse getResource(MultipartFile file, Path folder) {

        String fileName = null;
        String contentType = null;
        boolean isPreviewEnabled;
        String previewUrl = null;
        String downloadUrl = null;

        fileName =  StringUtils.cleanPath(file.getOriginalFilename());
        contentType = file.getContentType();

        Path path = folder.resolve(fileName);
        Resource resource;
        try {
            resource = new UrlResource(path.toUri());
        } catch (MalformedURLException e) {
            throw new RuntimeException("Issue in reading the file", e);
        }

        if(resource.exists()) {
            isPreviewEnabled = resource.isReadable();
        }
        else
            throw new RuntimeException("File doesn't exist or is not readable");

        if(isPreviewEnabled)
            previewUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/preview/")
                    .path(fileName)
                    .toUriString();

        downloadUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/download/")
                .path(fileName)
                .toUriString();

        return new FileUploadResponse(fileName, contentType, isPreviewEnabled, previewUrl, downloadUrl);
    }
}
