package com.ergis.elearning.web;

import com.ergis.elearning.ViewModel.CreateMaterialViewModel;
import com.ergis.elearning.domain.Material;
import com.ergis.elearning.services.MaterialService;
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
@RequestMapping("/api/materials")
@CrossOrigin
public class MaterialController {

    @Autowired
    private MaterialService materialService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @GetMapping("/{course_id}/all")
    public ResponseEntity<Set<Material>> getAllByCourseId(@PathVariable String course_id) {

        Set<Material> materials = materialService.findAllByCourse(Long.parseLong(course_id));
        return new ResponseEntity<Set<Material>>(materials, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping("/{course_id}")
    public ResponseEntity<Material> create(
            @PathVariable String course_id,
            @RequestParam("description") String description,
            @RequestParam("material") MultipartFile material,
            Principal principal) throws Exception
    {
        CreateMaterialViewModel model = new CreateMaterialViewModel(description, material);
        Material material1 = materialService.create(model, Long.parseLong(course_id), principal.getName());
        return new ResponseEntity<Material>(material1, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('TEACHER')")
    @DeleteMapping("/{course_id}/{material_id}")
    public ResponseEntity<String> delete(@PathVariable String course_id,  @PathVariable String material_id, Principal principal)
    {
        materialService.delete(Long.parseLong(material_id), Long.parseLong(course_id), principal.getName());
        return new ResponseEntity<String>("Material with id '" + material_id + "' deleted successfully.", HttpStatus.OK);
    }
}
