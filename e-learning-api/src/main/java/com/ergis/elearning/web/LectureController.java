package com.ergis.elearning.web;

import com.ergis.elearning.ViewModel.CreateLectureViewModel;
import com.ergis.elearning.domain.Lecture;
import com.ergis.elearning.domain.Material;
import com.ergis.elearning.services.LectureService;
import com.ergis.elearning.services.errors.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.Set;

@RestController
@RequestMapping("/api/lectures")
@CrossOrigin
public class LectureController {

    @Autowired
    private LectureService lectureService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @GetMapping("/{course_name}/all")
    public ResponseEntity<Set<Lecture>> getAllByCourse(@PathVariable String course_name, Principal principal) {

        Set<Lecture> lectures = lectureService.findAllByCourse(course_name, principal.getName());
        return new ResponseEntity<Set<Lecture>>(lectures, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping("/{course_name}")
    public ResponseEntity<Lecture> create(
            @PathVariable String course_name,
            @RequestParam("name") String name,
            @RequestParam("materials") MultipartFile[] materials,
            Principal principal) throws Exception
    {
        CreateLectureViewModel model = new CreateLectureViewModel(name, materials);
        Lecture lecture = lectureService.create(model, course_name, principal.getName());
        return new ResponseEntity<Lecture>(lecture, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('TEACHER')")
    @DeleteMapping("/{course_name}/{lecture_id}")
    public ResponseEntity<String> delete(@PathVariable String course_name,  @PathVariable String lecture_id, Principal principal)
    {
        lectureService.delete(Long.parseLong(lecture_id), course_name, principal.getName());
        return new ResponseEntity<String>("Lecture with id '" + lecture_id + "' deleted successfully.", HttpStatus.OK);
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping("/{course_name}/{lecture_id}")
    public ResponseEntity<Lecture> addMaterial(
            @PathVariable String course_name,
            @PathVariable String lecture_id,
            @RequestParam("materials") MultipartFile[] materials,
            Principal principal) throws Exception
    {
        Lecture lecture = lectureService.addMaterial(Long.parseLong(lecture_id), course_name, materials, principal.getName());
        return new ResponseEntity<Lecture>(lecture, HttpStatus.OK);
    }
}
