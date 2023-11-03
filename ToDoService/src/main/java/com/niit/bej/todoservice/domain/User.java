/*
 * Author Name : Pratyush Kumar
 * Date: 05-06-2023
 * Created With: IntelliJ IDEA Community Edition
 */
package com.niit.bej.todoservice.domain;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;
@Document
public class User {
    private String firstName;
    private String lastName;
    @MongoId
    private String emailId;
    private String password;
    private String phoneNumber;
    private String profileImg;

    private List<ToDo> toDoList;

    public User(String firstName, String lastName, String emailId, String password, String phoneNumber, String profileImg, List<ToDo> toDoList) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.profileImg = profileImg;
        this.toDoList = toDoList;
    }

    public User() {
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public List<ToDo> getToDoList() {
        return toDoList;
    }

    public void setToDoList(List<ToDo> toDoList) {
        this.toDoList = toDoList;
    }

    public String getProfileImg() {
        return profileImg;
    }

    public void setProfileImg(String profileImg) {
        this.profileImg = profileImg;
    }

    @Override
    public String toString() {
        return "User{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", emailId='" + emailId + '\'' +
                ", password='" + password + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", profileImg='" + profileImg + '\'' +
                ", toDoList=" + toDoList +
                '}';
    }
}
