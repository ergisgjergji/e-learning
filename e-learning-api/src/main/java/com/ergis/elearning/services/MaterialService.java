package com.ergis.elearning.services;

import com.ergis.elearning.ViewModel.CreateMaterialViewModel;
import com.ergis.elearning.ViewModel.FileUploadResponse;
import com.ergis.elearning.domain.*;
import com.ergis.elearning.exceptions.MaterialExceptions.MaterialDescriptionException;
import com.ergis.elearning.exceptions.MaterialExceptions.MaterialIdException;
import com.ergis.elearning.repositories.ICourseRepository;
import com.ergis.elearning.repositories.IMaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

@Service
public class MaterialService {

    @Autowired
    private CourseService courseService;
    @Autowired
    private UserService userService;
    @Autowired
    private IMaterialRepository materialRepository;
    @Autowired
    private FileStorageService fileStorageService;

    //#region Helper methods
    private String formatFileName(Course course, MultipartFile file) {
        return StringUtils.cleanPath(course.getId() + "_" + file.getOriginalFilename());
    }
    private void checkForDuplicateFile(String fileName, Course course) throws Exception {

        Material material = materialRepository.findByFileNameAndCourse(fileName, course);
        if(material != null) throw new Exception("A material with name '" + fileName + "' already exists");
    }
    //#endregion

    public Set<Material> findAll() {
        return materialRepository.findAll();
    }

    public Set<Material> findAllByCourse(Long course_id) {

        Course course = courseService.findById(course_id);
        Set<Material> materials = materialRepository.findAllByCourse(course);
        return materials;
    }

    public Material create(CreateMaterialViewModel model, Long course_id, String username) throws Exception {

        /*
            1. Check if user exists (principal, which is a TEACHER)
            2. Checks if course belongs to this user
            3. Check if description is duplicate for the same course
            4. Format the fileName
            5. Check if a file with that fileName already exists for the course
            6. Store the material using FileStorageService
            7. Create Material entity and store it in database
         */
        User user = userService.findByUsername(username);
        Course course = courseService.findByIdAndUser(course_id, user);

        Material duplicateDescription = materialRepository.findByDescriptionAndCourse(model.getDescription(), course);
        if(duplicateDescription != null) throw new MaterialDescriptionException("Material with description '" + model.getDescription() + "' already exists");

        String formatedFileName = this.formatFileName(course, model.getFile());
        this.checkForDuplicateFile(formatedFileName, course);
        FileUploadResponse response = fileStorageService.storeMaterial(model.getFile(), formatedFileName);

        Material material = new Material(model.getDescription(), response, course);
        material = materialRepository.save(material);
        course.getMaterials().add(material);

        return material;
    }

    public void delete(Long material_id, Long course_id, String username) {

        User user = userService.findByUsername(username);
        Course course = courseService.findByIdAndUser(course_id, user);

        Material material = materialRepository.findByIdAndCourse(material_id, course);
        if(material == null) throw new MaterialIdException("Material with id '" + material_id + "' not found");

        fileStorageService.removeMaterial(material.getFileName());
        course.getMaterials().remove(material);
        materialRepository.delete(material);
    }
}
