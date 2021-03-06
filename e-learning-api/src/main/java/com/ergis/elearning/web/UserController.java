package com.ergis.elearning.web;

import com.ergis.elearning.ViewModel.ChangePasswordViewModel;
import com.ergis.elearning.ViewModel.ResetPasswordViewModel;
import com.ergis.elearning.domain.User;
import com.ergis.elearning.services.errors.MapValidationErrorService;
import com.ergis.elearning.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.Set;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("")
    public ResponseEntity<?> createUser(@Valid @RequestBody User user, BindingResult result) {

        ResponseEntity<?> errors = mapValidationErrorService.MapValidationError(result);
        if(errors != null) return errors;

        User user1 = userService.create(user);
        return new ResponseEntity<User>(user1, HttpStatus.CREATED);
    }

    @PutMapping("")
    public ResponseEntity<?> updateUser(@Valid @RequestBody User user, BindingResult result, Principal principal) {

        ResponseEntity<?> errors = mapValidationErrorService.MapValidationError(result);
        if(errors != null) return errors;

        User updatedUser = userService.update(user, principal.getName());
        return new ResponseEntity<User>(updatedUser, HttpStatus.OK);
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordViewModel changePasswordViewModel, BindingResult result, Principal principal) {

        ResponseEntity<?> errors = mapValidationErrorService.MapValidationError(result);
        if(errors != null) return errors;

        userService.changePassword(changePasswordViewModel.getId(), changePasswordViewModel, principal.getName());
        return new ResponseEntity<String>("Password was changed successfully", HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordViewModel resetPasswordViewModel, BindingResult result, Principal principal) {

        ResponseEntity<?> errors = mapValidationErrorService.MapValidationError(result);
        if(errors != null) return errors;

        userService.resetPassword(resetPasswordViewModel, principal.getName());
        return new ResponseEntity<String>("Password was changed successfully", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id, Principal principal) {

        User user = userService.findById(Long.parseLong(id), principal.getName());
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {

        return new ResponseEntity<Set<User>>(userService.findAll(), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/students")
    public ResponseEntity<?> getAllStudents() {

        return new ResponseEntity<Set<User>>(userService.findByRole("STUDENT"), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/teachers")
    public ResponseEntity<?> getAllTeachers() {

        return new ResponseEntity<Set<User>>(userService.findByRole("TEACHER"), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {

        userService.delete(Long.parseLong(id));
        return new ResponseEntity<String>("User with id '" + id + "' was successfully deleted", HttpStatus.OK);
    }
}
