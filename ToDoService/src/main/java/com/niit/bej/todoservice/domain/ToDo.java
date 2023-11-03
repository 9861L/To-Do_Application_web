/*
 * Author Name : Pratyush Kumar
 * Date: 05-06-2023
 * Created With: IntelliJ IDEA Community Edition
 */
package com.niit.bej.todoservice.domain;

public class ToDo {
    private String title;
    private String description;
    private String imageUrl;
    private String dueDate;
    private String priority;
    private String createdDateTime;
    private boolean isCompleted;
    private boolean isArchive;
    private boolean isImportant;
    private String updatedTask;

    public ToDo(String title, String description, String imageUrl, String dueDate, String priority, String createdDateTime, boolean isCompleted, boolean isArchive, boolean isImportant, String updatedTask) {
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.dueDate = dueDate;
        this.priority = priority;
        this.createdDateTime = createdDateTime;
        this.isCompleted = isCompleted;
        this.isArchive = isArchive;
        this.isImportant = isImportant;
        this.updatedTask = updatedTask;
    }

    public ToDo() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getCreatedDateTime() {
        return createdDateTime;
    }

    public void setCreatedDateTime(String createdDateTime) {
        this.createdDateTime = createdDateTime;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }

    public boolean isArchive() {
        return isArchive;
    }

    public void setArchive(boolean archive) {
        isArchive = archive;
    }

    public boolean isImportant() {
        return isImportant;
    }

    public void setImportant(boolean important) {
        isImportant = important;
    }

    public String getUpdatedTask() {
        return updatedTask;
    }

    public void setUpdatedTask(String updatedTask) {
        this.updatedTask = updatedTask;
    }

    @Override
    public String toString() {
        return "ToDo{" +
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", dueDate='" + dueDate + '\'' +
                ", priority='" + priority + '\'' +
                ", createdDateTime='" + createdDateTime + '\'' +
                ", isCompleted=" + isCompleted +
                ", isArchive=" + isArchive +
                ", isImportant=" + isImportant +
                ", updatedTask='" + updatedTask + '\'' +
                '}';
    }
}
