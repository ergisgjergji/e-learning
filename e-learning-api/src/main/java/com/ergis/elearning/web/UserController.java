package com.ergis.elearning.web;

import com.ergis.elearning.domain.User;
import com.ergis.elearning.services.errors.MapValidationErrorService;
import com.ergis.elearning.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    // ADMIN
    // Tested [YES]
    @PostMapping("")
    public ResponseEntity<?> createUser(@Valid @RequestBody User user, BindingResult result) {

        ResponseEntity<?> errors = mapValidationErrorService.MapValidationError(result);
        if(errors != null) return errors;

        User user1 = userService.create(user);
        return new ResponseEntity<User>(user1, HttpStatus.CREATED);
    }

//    @PutMapping("")
//    // Tested [NO] (waiting for JWT)
//    public ResponseEntity<?> updateUser(@Valid @RequestBody User user, BindingResult result, Principal principal) {
//
//        ResponseEntity<?> errors = mapValidationErrorService.MapValidationError(result);
//        if(errors != null) return errors;
//
//        User updatedUser = userService.update(user, principal.getName());
//        return new ResponseEntity<User>(updatedUser, HttpStatus.OK);
//    }

    @PutMapping("")
    // Tested [YES] (waiting for JWT)
    public ResponseEntity<?> updateUser(@Valid @RequestBody User user, BindingResult result) {

        ResponseEntity<?> errors = mapValidationErrorService.MapValidationError(result);
        if(errors != null) return errors;

        User updatedUser = userService.update(user, "student1@test.com");
        return new ResponseEntity<User>(updatedUser, HttpStatus.OK);
    }

    // ADMIN
    // Tested [YES]
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id) {

        User user = userService.findById(Long.parseLong(id));
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    // ADMIN
    // Tested [YES]
    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {

        return new ResponseEntity<Set<User>>(userService.findAll(), HttpStatus.OK);
    }

    // ADMIN
    // Tested [YES]
    @GetMapping("/students")
    public ResponseEntity<?> getAllStudents() {

        return new ResponseEntity<Set<User>>(userService.findByRole("STUDENT"), HttpStatus.OK);
    }

    // ADMIN
    // Tested [YES]
    @GetMapping("/teachers")
    public ResponseEntity<?> getAllTeachers() {

        return new ResponseEntity<Set<User>>(userService.findByRole("TEACHER"), HttpStatus.OK);
    }

    // ADMIN
    @DeleteMapping("/{id}")
    // Tested [YES]
    public ResponseEntity<?> deleteUser(@PathVariable String id) {

        userService.delete(Long.parseLong(id));
        return new ResponseEntity<String>("User with id '" + id + "' was successfully deleted", HttpStatus.OK);
    }
}
