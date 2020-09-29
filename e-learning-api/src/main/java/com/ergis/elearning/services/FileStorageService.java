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
            FileUploadResponse response = getFileInfo(file, "attachment");

            response = this.addFileTypeExtension(response, "attachment");
            return response;
        }
        catch (IOException e) {
            throw new RuntimeException("Issue in storing the attachment");
        }
    }
    
    public void removeAttachment(String fileName) {

        fileName = StringUtils.cleanPath(fileName);
        Path url = Paths.get(attachmentsPath + "\\" + fileName);
        try {
            Files.delete(url);
        }
        catch (IOException e) {
            throw new RuntimeException("Issue in removing the attachment");
        }
    }

    public Resource getFileResource(String fileName, String fileType) {

        Path path = this.getFilePath(fileName, fileType);
        Resource resource;
        try {
            resource = new UrlResource(path.toUri());
        } catch (MalformedURLException e) {
            throw new RuntimeException("Issue in reading the file", e);
        }

        if(resource.exists())
            return resource;
        else
            throw new RuntimeException("File doesn't exist or is not readable");
    }

    // Helpers
    private FileUploadResponse getFileInfo(MultipartFile file, String fileType) {

        String fileName = null;
        String contentType = null;
        boolean isPreviewEnabled;
        String previewUrl = null;
        String downloadUrl = null;

        fileName =  StringUtils.cleanPath(file.getOriginalFilename());
        contentType = file.getContentType();

        Resource resource = this.getFileResource(fileName, fileType);

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
    private Path getFilePath(String fileName, String fileType) {

        Path path;
        switch(fileType) {
            case "attachment":
                path =attachmentsPath; break;
            case "material":
                path = materialsPath; break;
            case "assignment":
                path = assignmentsPath; break;
            default:
                path = storagePath; break;
        }
        return Paths.get(path + "\\" + fileName);
    }
    private FileUploadResponse addFileTypeExtension(FileUploadResponse response, String fileType) {

        if(response.getPreviewEnabled())
            response.setPreviewUrl(response.getPreviewUrl() + "?fileType=" + fileType);
        response.setDownloadUrl(response.getDownloadUrl() + "?fileType=" + fileType);

        return response;
    }
}
