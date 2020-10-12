package com.ergis.elearning.services;

import com.ergis.elearning.ViewModel.FileUploadResponse;
import com.sun.org.apache.bcel.internal.generic.FADD;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.activation.MimetypesFileTypeMap;
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
    private final Path solutionsPath;
    private final String storageLocation;

    public FileStorageService(@Value("${file.storage.location:temp}") String storageLocation) {

        this.storageLocation = storageLocation;
        storagePath = Paths.get(storageLocation).toAbsolutePath().normalize();
        attachmentsPath = Paths.get(storagePath + "\\" + "attachments");
        materialsPath = Paths.get(storagePath + "\\" + "materials");
        assignmentsPath = Paths.get(storagePath + "\\" + "assignments");
        solutionsPath = Paths.get(storagePath + "\\" + "solutions");

        try {
            Files.createDirectories(storagePath);
            Files.createDirectories(attachmentsPath);
            Files.createDirectories(materialsPath);
            Files.createDirectories(assignmentsPath);
            Files.createDirectories(solutionsPath);
        } catch (IOException e) {
            throw new RuntimeException("Issue in creating file storage directories");
        }
    }

    public FileUploadResponse storeAttachment(MultipartFile file, String fileName) {

        Path url = Paths.get(attachmentsPath + "\\" + fileName);

        try {
            Files.copy(file.getInputStream(), url, StandardCopyOption.REPLACE_EXISTING);
            FileUploadResponse response = getFileInfo(file, fileName, "attachment");

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

    public FileUploadResponse storeMaterial(MultipartFile file, String fileName) {

        Path url = Paths.get(materialsPath + "\\" + fileName);

        try {
            Files.copy(file.getInputStream(), url, StandardCopyOption.REPLACE_EXISTING);
            FileUploadResponse response = getFileInfo(file, fileName, "material");

            response = this.addFileTypeExtension(response, "material");
            return response;
        }
        catch (IOException e) {
            throw new RuntimeException("Issue in storing the material");
        }
    }
    public void removeMaterial(String fileName) {

        fileName = StringUtils.cleanPath(fileName);
        Path url = Paths.get(materialsPath + "\\" + fileName);
        try {
            Files.delete(url);
        }
        catch (IOException e) {
            throw new RuntimeException("Issue in removing the material");
        }
    }

    public FileUploadResponse storeAssignment(MultipartFile file, String fileName) {

        Path url = Paths.get(assignmentsPath + "\\" + fileName);

        try {
            Files.copy(file.getInputStream(), url, StandardCopyOption.REPLACE_EXISTING);
            FileUploadResponse response = getFileInfo(file, fileName, "assignment");

            response = this.addFileTypeExtension(response, "assignment");
            return response;
        }
        catch (IOException e) {
            throw new RuntimeException("Issue in storing the assignment");
        }
    }
    public void removeAssignment(String fileName) {

        fileName = StringUtils.cleanPath(fileName);
        Path url = Paths.get(assignmentsPath + "\\" + fileName);
        try {
            Files.delete(url);
        }
        catch (IOException e) {
            throw new RuntimeException("Issue in removing the assignment");
        }
    }

    public FileUploadResponse storeSolution(MultipartFile file, String fileName) {

        Path url = Paths.get(solutionsPath + "\\" + fileName);

        try {
            Files.copy(file.getInputStream(), url, StandardCopyOption.REPLACE_EXISTING);
            FileUploadResponse response = getFileInfo(file, fileName, "solution");

            response = this.addFileTypeExtension(response, "solution");
            return response;
        }
        catch (IOException e) {
            throw new RuntimeException("Issue in storing the solution");
        }
    }
    public void removeSolution(String fileName) {

        fileName = StringUtils.cleanPath(fileName);
        Path url = Paths.get(solutionsPath + "\\" + fileName);
        try {
            Files.delete(url);
        }
        catch (IOException e) {
            throw new RuntimeException("Issue in removing the solution");
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
    private FileUploadResponse getFileInfo(MultipartFile file, String fileName, String fileType) {

        String contentType = null;
        boolean isPreviewEnabled;
        String previewUrl = null;
        String downloadUrl = null;

        contentType = file.getContentType();

        if(contentType.equals(MediaType.APPLICATION_OCTET_STREAM_VALUE))
            isPreviewEnabled = false;
        else
            isPreviewEnabled = true;

        Resource resource = this.getFileResource(fileName, fileType);
        if(!resource.exists())
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
            case "solution":
                path = solutionsPath; break;
            default:
                path = storagePath; break;
        }
        return path.toAbsolutePath().resolve(fileName);
    }
    private FileUploadResponse addFileTypeExtension(FileUploadResponse response, String fileType) {

        if(response.getPreviewEnabled())
            response.setPreviewUrl(response.getPreviewUrl() + "?fileType=" + fileType);
        response.setDownloadUrl(response.getDownloadUrl() + "?fileType=" + fileType);

        return response;
    }
}
