import { LOCALES } from './../locales';

export default {
    [LOCALES.ENGLISH]: {
        'copyright': 'Copyright',
        'login': 'Login',
        'logout': 'Logout',
        'back': 'Back',
        'save': 'Save',
        'delete': 'Delete',
        'home': 'Home',
        'welcome': 'Welcome, {name}',
        'cancel': 'Cancel',
        'close': 'Close',
        'read-more': 'Read more',
        'refresh': 'Refresh',
        'optional': 'optional',
        'minimal-required-1': 'minimaly required: 1',
        'view': 'View',
        'download-all': 'Download all',

        'landing-page-header': 'A platform that helps teachers and students all round the world.',
        'landing-page-demo': 'Use these credentials for a demo',

        'edit-profile': 'Edit profile',
        'change-password': 'Change password',

        'select-faculty': 'Select faculty',
        'FTI': 'Faculty of Information Technology',
        'FIE': 'Faculty of Electrical Engineering',
        'FIN': 'Faculty of Civil Engineering',

        'admin-panel': 'Admin panel',
        'manage-students': 'Manage students',
        'manage-teachers': 'Manage teachers',
        'edit': 'Edit',
        'reset-password': 'Reset password',
        'students': 'Students',
        'add-student': 'Add student',
        'new-student': 'New student',
        'teachers': 'Teachers',
        'add-teacher': 'Add teacher',
        'new-teacher': 'New teacher',
        'update-user': 'Update user',

        'full-name': 'Full name',
        'email': 'Username / Email',
        'faculty': 'Faculty',
        'registration-date': 'Registration date',
        'password': 'Password',
        'new-password': 'New password',

        'courses': 'Courses',
        'no-courses': 'You have no courses.',
        'add-course': 'Add Course',
        'name': 'Name',
        'description': 'Description',
        'update-course': 'Update course',
        'manage-lectures': 'Manage lectures',
        'manage-tests': 'Manage tests',
        'delete-course': 'Delete course',
        'created': 'Created',
        'updated': 'Last updated',
        'new-course': 'New course',
        'registered-students': 'Registered students',
        'non-registered-students': 'Non-registered students',
        'no-data': 'No data',
        'action': 'Actions',
        'view-results': 'View results',
        'register': 'Register',
        'test-results': 'Test Results',
        'TestResultList-empty': 'This student has no completed tests.',

        'LectureList.empty': 'This course currently has no lectures.',

        'tests': 'Tests',
        'add-test': 'Add test',
        'new-test': 'New test',
        'TestBaseList-empty': 'This course has no tests.',
        'header': 'Header',
        'questions': 'Questions',
        'add-question': 'Add question',
        'type': 'Type',
        'select-type': 'Select type',
        'yes-no': 'Yes/No',
        'single-choice': 'Single choice',
        'multi-choice': 'Multi choice',
        'save-question': 'Save question',
        'description-required': 'Description is required!',
        'alternatives-required': 'Alternatives are required!',
        'alternatives-blank': 'Alternatives cannot be blank!',
        'one-correct-answer-required': 'Question must have 1 correct answer!',
        'two-correct-answers-required': 'Question must have 2 correct answers!',
        'total': 'Total',
        'score': 'Score',
        'result': 'Result',
        'fail': 'FAIL',
        'pass': 'PASS',
        'correct': 'Correct',
        'incorrect': 'Incorrect',
        'minimal-score': 'Minimal passing score is 40%',
        'question-duration': 'Each question takes up to 3 minutes',
        'countdown-end': 'When the time is over it will be submited automatically',
        'time-remaining': 'Time remaining',

        'by': 'by',
        'contact': 'Contact',
        'view-details': 'View details',
        'course-details': 'Course details',
        'teacher-name': 'Teacher name',
        'teacher-email': 'Teacher email',
        'take': 'Take',
        'take-test': 'Take the test',
        'submit-test': 'Submit test',

        //#region News
        'news': 'News',
        'news-archive': 'News Archive',
        'add-news': 'Add news',
        'new-announcement': 'New announcement',
        'news.header': 'Title',
        'news.body': 'Message',
        'news.attachments': 'Attachment(s)',
        'news.createdTime': 'Time published',
        'files-selected': 'files selected',
        'contains-x-attachments': 'Contains {x} attachment(s)',

        'news.add-notification': '✔ News was posted successfully.',
        'news.delete-confirm': 'Are you sure you want to delete this news?',
        'news.delete-notification': 'ℹ News with id {id} was deleted successfully.',
        //#endregion

        //#region Lectures
        'add-lecture': 'Add lecture',
        'new-lecture': 'New lecture',
        'lecture.name': 'Lecture name',
        'lecture.name.example': 'example: Lecture 1',

        'lecture.add-notification': '✔ Lecture was added successfully',
        'lecture.delete-confirm': 'Are you sure you want to delete this lecture?',
        'lecture.delete-notification': 'ℹ Lecture with id {id} was deleted successfully.',
        'lecture.add-material': 'Add material',

        'material.add-notification': '✔ Material(s) were added successfully.',
        'material.delete-confirm': 'Are you sure you want to delete this material?',
        'material.delete-notification': 'ℹ Material with id {id} was deleted successfully.',
        //#endregion 

        // Files
        'attachments': 'Attachments',
        'materials': 'Materials',
        'assignments': 'Assignments',
        'fileName': 'Filename',
        'contentType': 'Content type',
        'materials.empty': 'No materials',

        // confirm-alert
        'confirm': 'Confirm',
        'yes': 'Yes',
        'no': 'No',

        // profile NOTIFICATIONS
        'change-password-toast': '✔ Password was changed successfully.',
        'update-profile-toast': '✔ Profile was updated successfully.',

        // admin NOTIFICATIONS
        'add-student-toast': '✔ Student added successfully.',
        'add-teacher-toast': '✔ Teacher added successfully.',
        'delete-user-confirm': 'Are you sure you want to delete this user?',
        'delete-student-toast': 'ℹ Student with id {id} was deleted successfully.',
        'delete-teacher-toast': 'ℹ Teacher with id {id} was deleted successfully.',
        'update-user-toast': '✔ Changes were saved successfully.',
        'reset-password-toast': '✔ Password was reset successfully.',
        
        // teacher NOTIFICATIONS
        'delete-course-confirm': 'Are you sure you want to delete this course?',
        'delete-course-toast': 'ℹ Course with id {id} was deleted successfully.',
        'add-course-toast': '✔ Course added successfully.',
        'update-course-toast': '✔ Changes were saved successfully.',
        'register-student-confirm': 'You are about to register student "{name}" in this course. Continue?',
        'register-student-toast': 'ℹ Student "{name}" was registered successfully.',
        'question-form-toast': '⚠️ Complete/Close the question form first!',
        'question-number-toast': '⚠️ Test must contain at least {number} questions!',
        'add-test-toast': '✔ Test created successfully.',
        'add-test-leaving': 'If you leave, changes will not be saved. Continue?',
        'take-test-confirm': 'You are about to start this test. Once you start, you cannot go back. Continue?',
        'blocking-route-toast': '⚠️ You cannot leave while taking the test.',
        'submit-test-confirm': 'You are about to submit the test. Continue?',
        'submit-test-toast': '✔ Test was submitted successfully.',
        
        // Roles
        'admin': 'Admin',
        'teacher': 'Teacher',
        'student': 'Student'
    }
}