package com.ergis.elearning.services;

import com.ergis.elearning.ViewModel.CreateLectureViewModel;
import com.ergis.elearning.ViewModel.FileUploadResponse;
import com.ergis.elearning.domain.*;
import com.ergis.elearning.exceptions.LectureExceptions.LectureNameException;
import com.ergis.elearning.exceptions.LectureExceptions.LecturelIdException;
import com.ergis.elearning.repositories.ILectureRepository;
import com.ergis.elearning.repositories.IMaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

@Service
public class LectureService {

    @Autowired
    private CourseService courseService;
    @Autowired
    private UserService userService;
    @Autowired
    private ILectureRepository lectureRepository;
    @Autowired
    private IMaterialRepository materialRepository;
    @Autowired
    private FileStorageService fileStorageService;

    //#region Helper methods
    private String formatFileName(Lecture lecture, MultipartFile file) {
        return StringUtils.cleanPath(lecture.getId() + "_" + file.getOriginalFilename());
    }
    private void checkForDuplicateFile(String fileName, Lecture lecture) throws Exception {

        Material material = materialRepository.findByFileNameAndLecture(fileName, lecture);
        if(material != null) throw new Exception("A material with name '" + fileName + "' already exists");
    }
    //#endregion

    public Set<Lecture> findAll() {
        return lectureRepository.findAll();
    }

    public Set<Lecture> findAllByCourse(String course_name, String username) {

        User user = userService.findByUsername(username);
        Course course = courseService.findByNameAndUser(course_name, user);
        Set<Lecture> lectures = lectureRepository.findAllByCourse(course);
        return lectures;
    }

    public Lecture create(CreateLectureViewModel model, Long course_id, String username) throws Exception {

        /*
            1. Check if user exists (principal, which is a TEACHER)
            2. Checks if course belongs to this user
            3. Check if lecture name is duplicate for the same course
            4. Format the fileNames of materials
            5. Check if the lecture has files with any of the fileNames
            6. Store the materials using FileStorageService
            7. Create Materials entities and store it in database, and attach them to the Lecture
            8. Return the lecture
         */
        User user = userService.findByUsername(username);
        Course course = courseService.findByIdAndUser(course_id, user);

        Lecture duplicateDescription = lectureRepository.findByNameAndCourse(model.getName(), course);
        if(duplicateDescription != null) throw new LectureNameException("Lecture with name '" + model.getName() + "' already exists");

        Lecture lecture = new Lecture(model.getName(), course);
        lecture = lectureRepository.save(lecture);

        if(model.getFiles() != null && model.getFiles().length > 0)
            for (MultipartFile file : model.getFiles()) {

                String formatedFileName = this.formatFileName(lecture, file);
                checkForDuplicateFile(formatedFileName, lecture);
                FileUploadResponse response = fileStorageService.storeMaterial(file, formatedFileName);

                Material material = new Material();
                material.setFileName(response.getFileName());
                material.setContentType(response.getContentType());
                material.setPreviewEnabled(response.getPreviewEnabled());
                material.setPreviewUrl(response.getPreviewUrl());
                material.setDownloadUrl(response.getDownloadUrl());
                material.setLecture(lecture);

                material = materialRepository.save(material);
                lecture.getMaterials().add(material);
            }

        return lecture;
    }

    public void delete(Long lecture_id, Long course_id, String username) {

        User user = userService.findByUsername(username);
        Course course = courseService.findByIdAndUser(course_id, user);

        Lecture lecture = lectureRepository.findByIdAndCourse(lecture_id, course);
        if(lecture == null) throw new LecturelIdException("Lecture with id '" + lecture_id + "' not found");

        Set<Material> materials = lecture.getMaterials();

        if(materials.size() > 0) {
            materials.forEach(material -> {
                fileStorageService.removeMaterial(material.getFileName());
                lecture.getMaterials().remove(material);
            });
        }

        lectureRepository.delete(lecture);
    }
}
