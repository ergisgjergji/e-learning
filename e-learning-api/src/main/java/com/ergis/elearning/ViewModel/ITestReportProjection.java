package com.ergis.elearning.ViewModel;

import com.sun.org.apache.xpath.internal.operations.Bool;

public interface ITestReportProjection {
    String getQuestion();
    Integer getType();
    String getAlternative_1();
    String getAlternative_2();
    String getAlternative_3();
    String getAlternative_4();

    Integer getChecked_1();
    Integer getChecked_2();
    Integer getChecked_3();
    Integer getChecked_4();

    Boolean getCorrect_1();
    Boolean getCorrect_2();
    Boolean getCorrect_3();
    Boolean getCorrect_4();
}
