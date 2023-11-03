/*
 * Author Name : Pratyush Kumar
 * Date: 05-06-2023
 * Created With: IntelliJ IDEA Community Edition
 */
package com.niit.bej.todoservice.exception;

public class ToDoNotFoundException extends Exception{
    public ToDoNotFoundException(String message) {
        super(message);
    }
}
