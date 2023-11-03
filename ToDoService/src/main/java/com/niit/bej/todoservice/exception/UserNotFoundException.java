/*
 * Author Name : Pratyush Kumar
 * Date: 05-06-2023
 * Created With: IntelliJ IDEA Community Edition
 */
package com.niit.bej.todoservice.exception;

public class UserNotFoundException extends Exception{
    public UserNotFoundException(String message) {
        super(message);
    }
}
