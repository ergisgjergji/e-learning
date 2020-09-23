package com.ergis.elearning.services;

import com.ergis.elearning.domain.User;
import com.ergis.elearning.exceptions.FileUploadExceptions.FileUploadException;
import com.ergis.elearning.repositories.IUserRepository;
import com.ergis.elearning.security.SecurityConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Array;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

import static com.ergis.elearning.security.SecurityConstants.PHOTOS_DIR;
import static com.ergis.elearning.security.SecurityConstants.UPLOADS_DIR;

@Service
public class FileUploadService {

    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private UserService userService;

    private static final String[] PHOTO_EXTENSIONS = {"jpg", "jpeg", "png"};

    private void validatePhoto(MultipartFile file) {

        if (file.isEmpty()) throw new FileUploadException("File cannot be empty");

        String fileName = file.getOriginalFilename();
        int index = fileName.lastIndexOf('.');
        String extension = fileName.substring(index + 1);

        boolean isValidExtension = false;
        for(String ext : PHOTO_EXTENSIONS) {
            if(extension.equals(ext)) isValidExtension = true;
        }
        if(!isValidExtension) throw new FileUploadException("Invalid file format. Format must be:  " + PHOTO_EXTENSIONS.toString());
    }

    public String uploadPhoto(MultipartFile file, Long id, String username) {

        // 1. Check if photo is valid
        // 2. Check if user with 'id' exists
        // 3. If principal is not admin, make sure 'id' belongs to him
        // 4. Check if user currently has a photo and remove it
        // 5. Return photo path as result

        validatePhoto(file);

        User user = userService.findById(id, username);

        String fileName = user.getId().toString() + "_" + file.getOriginalFilename();
        Path destination = Paths.get(PHOTOS_DIR, fileName);

        try {
            if(!user.getPhoto().isEmpty()) {
                Path oldDestination = Paths.get(PHOTOS_DIR, user.getPhoto());
                Files.delete(oldDestination);
            }

            Files.write(destination, file.getBytes());
            user.setPhoto(destination.toString());
            userRepository.save(user);

            return destination.toString();
        }
        catch(Exception ex) {
            throw new FileUploadException("An error occurred. Photo could not be uploaded.");
        }
    }
}
