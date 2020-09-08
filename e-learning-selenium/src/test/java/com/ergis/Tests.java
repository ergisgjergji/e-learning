package com.ergis;
import org.junit.Assert;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;
import org.openqa.selenium.*;

import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.support.ui.Select;

import java.util.List;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class Tests {

    private WebDriver obj;

    public Tests() {
        System.setProperty("webdriver.edge.driver", "C:\\msedgedriver.exe");
        this.obj = new EdgeDriver();
    }

    @Test
    public void test1_TeacherLogin() throws InterruptedException {
        Login("teacher1@test.com", "111111");

        String url = obj.getCurrentUrl();
        Assert.assertEquals(url, "http://localhost:3000/teacherPanel");

        Logout();
        obj.quit();
    }

    @Test
    public void test2_CreateTest() throws InterruptedException {
        Login("teacher1@test.com", "111111");

        WebElement courseCard = obj.findElement(By.cssSelector(".card:nth-of-type(1)"));
        WebElement manageTestsBtn = courseCard.findElement(By.cssSelector("a[href$='tests']"));
        manageTestsBtn.click();
        Thread.sleep(500);

        WebElement addTestBtn = obj.findElement(By.cssSelector("a[href$='addTest']"));
        addTestBtn.click();
        Thread.sleep(500);

        WebElement header = obj.findElement(By.id("header"));
        header.sendKeys("Title by Selenium");
        Thread.sleep(500);

        AddQuestion("1");
        AddQuestion("1");
        AddQuestion("2");
        AddQuestion("3");

        WebElement submitBtn = obj.findElement(By.cssSelector("button[type='submit']"));
        submitBtn.click();
        Thread.sleep(1000);

        String url = obj.getCurrentUrl();
        Assert.assertTrue(url.endsWith("/tests"));

        Thread.sleep(2000);
        Logout();
        obj.quit();
    }

    @Test
    public void test3_Logout() throws InterruptedException {
        Login("teacher1@test.com", "111111");

        Logout();
        obj.quit();
    }

    @Test
    public void test4_StudentLogin() throws InterruptedException {
        Login("student1@test.com", "111111");

        String url = obj.getCurrentUrl();
        Assert.assertEquals(url, "http://localhost:3000/studentPanel");

        Logout();
        obj.quit();
    }

    @Test
    public void test5_TakeTest() throws InterruptedException {
        Login("student1@test.com", "111111");

        WebElement courseCard = obj.findElement(By.cssSelector(".card:nth-of-type(1)"));
        WebElement manageTestsBtn = courseCard.findElement(By.id("manageTestsBtn"));
        manageTestsBtn.click();
        Thread.sleep(500);

        List<WebElement> testList = courseCard.findElements(By.cssSelector("li[id*=\"tooltip\"]"));
        for(WebElement test : testList)
        {
            WebElement badge = test.findElement(By.cssSelector("span"));
            if(badge.getAttribute("class").contains("badge-secondary")) {
                test.click();
                break;
            }
        }
        Thread.sleep(500);

        WebElement yesBtn = obj.findElement(By.xpath("//button[@class='confirm-yes']"));
        WebElement noBtn = obj.findElement(By.xpath("//button[@class='confirm-no']"));
        yesBtn.click();
        Thread.sleep(500);

        List<WebElement> questions = obj.findElements(By.xpath("//div[@role='question']"));
        WebElement alternative1;
        WebElement alternative2;

        for(WebElement question : questions)
        {
            alternative1 = (question.findElement(By.id("alternative-1"))).findElement(By.cssSelector("input"));
            alternative2 = (question.findElement(By.id("alternative-2"))).findElement(By.cssSelector("input"));
            if(!question.getAttribute("question-type").equals("3"))
                alternative1.click();
            else {
                alternative1.click(); alternative2.click();
            }
            Thread.sleep(500);
        }

        WebElement submitBtn = obj.findElement(By.id("submitTestBtn"));
        submitBtn.click();
        Thread.sleep(500);

        yesBtn = obj.findElement(By.xpath("//button[@class='confirm-yes']"));
        yesBtn.click();
        Thread.sleep(800);

        String url = obj.getCurrentUrl();
        Assert.assertEquals(url, "http://localhost:3000/studentPanel");

        Thread.sleep(1000);
        Logout();
        obj.quit();
    }

    @Test
    public void test6_TestResult() throws InterruptedException {
        Login("student1@test.com", "111111");

        WebElement courseCard = obj.findElement(By.cssSelector(".card:nth-of-type(1)"));
        WebElement manageTestsBtn = courseCard.findElement(By.id("manageTestsBtn"));
        manageTestsBtn.click();
        Thread.sleep(500);

        List<WebElement> testList = courseCard.findElements(By.cssSelector("li[id*=\"tooltip\"]"));
        for(WebElement test : testList)
        {
            WebElement badge = test.findElement(By.cssSelector("span"));
            if(!badge.getAttribute("class").contains("badge-secondary")) {
                test.click();
                break;
            }
        }
        Thread.sleep(800);

        String url = obj.getCurrentUrl();
        Assert.assertTrue(url.endsWith("/details"));

        Thread.sleep(1000);
        Logout();
        obj.quit();
    }

    private void Login(String email, String password) throws InterruptedException {
        Thread.sleep(800);

        obj.get("http://localhost:3000/login");
        WebElement username = obj.findElement(By.id("username"));
        username.sendKeys(email);
        Thread.sleep(500);

        WebElement pw = obj.findElement(By.id("password"));
        pw.sendKeys(password);
        Thread.sleep(500);

        WebElement loginBtn = obj.findElement(By.cssSelector("button[type='submit']"));
        loginBtn.click();
        Thread.sleep(1000);
    }
    private void Logout() throws InterruptedException {
        Thread.sleep(500);
        WebElement logoutBtn = obj.findElement(By.linkText("Logout"));
        logoutBtn.click();
        Thread.sleep(500);
    }
    private void AddQuestion(String type) throws InterruptedException {

        WebElement plus = obj.findElement(By.xpath("//*[text()='+']"));
        plus.click();
        Thread.sleep(500);

        WebElement questionForm = obj.findElement(By.id("questionForm"));

        WebElement description = questionForm.findElement(By.id("description"));
        description.sendKeys("Sample question");
        Thread.sleep(500);

        Select questionType = new Select(questionForm.findElement(By.id("type")));

        if (type.equals("1")) {
            questionType.selectByValue("1");
            Thread.sleep(500);

            WebElement alternative = questionForm.findElement(By.cssSelector("input[type='radio'][id='0']"));
            alternative.click();
            Thread.sleep(500);
        }
        else if (type.equals("2"))
        {
            questionType.selectByValue("2");
            Thread.sleep(500);

            WebElement alternatives = questionForm.findElement(By.id("alternatives"));

            List<WebElement> alternativesDescriptions = alternatives.findElements(By.id("description"));
            for (WebElement alt : alternativesDescriptions) {
                alt.sendKeys("test");
                Thread.sleep(500);
            }

            WebElement correctAlt = alternatives.findElement(By.cssSelector("input[type='checkbox'][id='0']"));
            correctAlt.click();
            Thread.sleep(500);
        }
        else if (type.equals("3"))
        {
            questionType.selectByValue("3");
            Thread.sleep(500);

            WebElement alternatives_ = questionForm.findElement(By.id("alternatives"));

            List<WebElement> alternativesDescriptions_ = alternatives_.findElements(By.id("description"));
            for (WebElement alt : alternativesDescriptions_) {
                alt.sendKeys("test");
                Thread.sleep(500);
            }

            WebElement correctAlt1 = alternatives_.findElement(By.cssSelector("input[type='checkbox'][id='0']"));
            correctAlt1.click();
            Thread.sleep(500);

            WebElement correctAlt2 = alternatives_.findElement(By.cssSelector("input[type='checkbox'][id='1']"));
            correctAlt2.click();
            Thread.sleep(500);
        }

        WebElement addQuestionBtn = questionForm.findElement(By.cssSelector("button[type='button']"));
        addQuestionBtn.click();
        Thread.sleep(500);
    }
}

