/*
 * Author Name : Pratyush Kumar
 * Date: 05-06-2023
 * Created With: IntelliJ IDEA Community Edition
 */
package com.niit.bej.todoservice.exception;

public class ToDoAlreadyExistException extends Exception{
    public ToDoAlreadyExistException(String message) {
        super(message);
    }
}
