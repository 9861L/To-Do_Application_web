/*
 * Author Name : Pratyush Kumar
 * Date: 05-06-2023
 * Created With: IntelliJ IDEA Community Edition
 */
package com.niit.bej.todoservice.service;


import com.niit.bej.todoservice.config.ToDoDTO;
import com.niit.bej.todoservice.domain.ToDo;
import com.niit.bej.todoservice.domain.User;
import com.niit.bej.todoservice.exception.ToDoAlreadyExistException;
import com.niit.bej.todoservice.exception.ToDoNotFoundException;
import com.niit.bej.todoservice.exception.UserAlreadyExistException;
import com.niit.bej.todoservice.exception.UserNotFoundException;
import com.niit.bej.todoservice.proxy.UserProxy;
import com.niit.bej.todoservice.repository.ToDoRepository;
import org.json.simple.JSONObject;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class ToDoServiceImpl implements ToDoService {

    private ToDoRepository toDoRepository;
    private UserProxy userProxy;
    private RabbitTemplate rabbitTemplate;
    @Autowired
    public ToDoServiceImpl(ToDoRepository toDoRepository, UserProxy userProxy, RabbitTemplate rabbitTemplate) {
        this.toDoRepository = toDoRepository;
        this.userProxy = userProxy;
        this.rabbitTemplate = rabbitTemplate;
    }



    @Override
    public User registerUser(User user) throws UserAlreadyExistException {
        System.out.println("user.getEmailId() = " + user.getEmailId());
        if(toDoRepository.findById(user.getEmailId()).isPresent()){
            throw new UserAlreadyExistException("User Already Present");
        }
        userProxy.saveUser(user);
        return toDoRepository.save(user);

    }

    @Override
    public User addToDo(String emailId, ToDo toDo) throws UserNotFoundException, ToDoAlreadyExistException
    {
        if (toDoRepository.findById(emailId).isPresent()) {
            User user = toDoRepository.findById(emailId).get();
            List<ToDo> toDoList = user.getToDoList();
//            if(toDoList.isEmpty()){
//                user.setToDoList(Arrays.asList(toDo));
            if (toDoList == null) {
                toDoList = Collections.singletonList(toDo);

            } else {
                if (toDoList.stream().filter(data -> data.getTitle().equalsIgnoreCase(toDo.getTitle())).findAny().isPresent()) {
                    throw new ToDoAlreadyExistException("To do Already Present");
                } else {
                    toDoList.add(toDo);
                }

            }
            user.setToDoList(toDoList);
            return toDoRepository.save(user);

        } else {
            throw new UserNotFoundException("User Not Found Exception");
        }

    }

    @Override
    public List<ToDo> getAllToDo(String emailId) throws UserNotFoundException, ToDoNotFoundException {
        if(toDoRepository.findById(emailId).isPresent()){
            User user=toDoRepository.findById(emailId).get();
            List<ToDo> toDoList = user.getToDoList();

            if(toDoList == null){
                throw new ToDoNotFoundException("To Do Not Found");
            }else{
                Comparator<ToDo> dueDateComparator = new Comparator<ToDo>() {
                    @Override
                    public int compare(ToDo o1, ToDo o2) {
                        return o1.getDueDate().compareTo(o2.getDueDate());
                    }
                };

                Collections.sort(toDoList,dueDateComparator);
                JSONObject jsonObject = new JSONObject(); //producing information
                jsonObject.put("notificationWithToDoList",toDoList);
                jsonObject.put("emailId",emailId);
                ToDoDTO toDoDTO = new ToDoDTO(); //this is exchange format
                toDoDTO.setJsonObject(jsonObject);
//                rabbitTemplate.convertAndSend("todo_exchange","todo_routingKey",toDoDTO); //message sent to the queue
                return toDoList;
            }
        }else {
            throw new UserNotFoundException("User Not Found");

        }

    }

    @Override
    public User updateToDo(String emailId, ToDo toDo) throws UserNotFoundException, ToDoNotFoundException {
        if ( toDoRepository.findById(emailId).isEmpty()){
            throw new UserNotFoundException("User Not Found Exception");
        }
        User user = toDoRepository.findById(emailId).get();
        List<ToDo> taskList = user.getToDoList();
        ToDo newToDo = taskList.stream().filter(title -> title.getTitle().equals(toDo.getTitle())).findFirst().orElse(null);
        if (newToDo == null){
            throw new ToDoNotFoundException("To Do Not Found");
        }else {
            int index = user.getToDoList().indexOf(newToDo);
            taskList.set(index,toDo);
            return toDoRepository.save(user);
        }
    }

    @Override
    public boolean deleteToDoByTitle(String emailId,String title) throws UserNotFoundException, ToDoNotFoundException {
        if ( toDoRepository.findById(emailId).isEmpty()){
            throw new UserNotFoundException("User Not Found Exception");
        }
        User user = toDoRepository.findById(emailId).get();
        List<ToDo> taskList = user.getToDoList();
        ToDo newToDo = taskList.stream().filter(todo -> todo.getTitle().equals(title)).findFirst().orElse(null);

        if (newToDo == null){
            throw new ToDoNotFoundException("To Do Not Found");
        }else {
            taskList.remove(newToDo);
            toDoRepository.save(user);
            return  true;
        }
    }

    @Override
    public ToDo getToDoByTitle(String emailId, String title) throws UserNotFoundException, ToDoNotFoundException {
        if ( toDoRepository.findById(emailId).isEmpty()){
            throw new UserNotFoundException("User Not Found Exception");
        }
        User user = toDoRepository.findById(emailId).get();
        List<ToDo> taskList = user.getToDoList();
        ToDo newToDo = taskList.stream().filter(todo -> todo.getTitle().equals(title)).findFirst().orElse(null);
        if (newToDo == null){
            throw new ToDoNotFoundException("To Do Not Found");
        }else {
            return newToDo;
        }
    }

    @Override
    public List<ToDo> getAllToDoByPriority(String emailId, String priority) throws UserNotFoundException {
        ArrayList<ToDo> newList = new ArrayList<>();
        if ( toDoRepository.findById(emailId).isEmpty()){
            throw new UserNotFoundException("User Not Found Exception");
        }
        User user = toDoRepository.findById(emailId).get();
        List<ToDo> taskList = user.getToDoList();
        for (ToDo toDo : taskList) {
            if (toDo.getPriority().equals(priority)){
                newList.add(toDo);
            }
        }
        return newList;
    }

    @Override
    public List<ToDo> getToDoListByArchivedStatus(String emailId, boolean isArchive) throws UserNotFoundException, ToDoNotFoundException {
        if(toDoRepository.findById(emailId).isPresent()){
            User user =toDoRepository.findById(emailId).get();
            List<ToDo> toDoList=user.getToDoList();
            if(toDoList.isEmpty()){
                throw new ToDoNotFoundException("To do is not present");
            }else{
                List<ToDo> archiveToDoList = toDoList.stream().filter(function -> function.isArchive() == (isArchive)).toList();
                return archiveToDoList;
            }
        }else{
            throw new UserNotFoundException("User not present");

        }

    }

    @Override
    public User updateTaskAsArchiveStatus(String emailId, ToDo toDo) throws UserNotFoundException, ToDoNotFoundException {
        if (toDoRepository.findById(emailId).isPresent()) {
            User user1 = toDoRepository.findById(emailId).get();
            if (user1.getToDoList().isEmpty()) {
                throw new ToDoNotFoundException("To Do Not Found.");
            }
            else {
                List<ToDo> getAllTask = user1.getToDoList();
                if (!getAllTask.stream().filter(function -> function.getTitle().equals(toDo.getTitle())).findAny().isPresent()){
                    throw new ToDoNotFoundException("To Do Not Found.");
                }

                else{
                    ToDo taskToBeUpdated = getAllTask.stream().filter(fun -> fun.getTitle().equals(toDo.getTitle())).findAny().get();
                    int index = getAllTask.indexOf(taskToBeUpdated);
                    System.out.println(!toDo.isArchive());
                    if (!toDo.isArchive())
                        taskToBeUpdated.setArchive(true);
                    else {
                        taskToBeUpdated.setArchive(false);
                    }
                    getAllTask.set(index, taskToBeUpdated);
                    user1.setToDoList(getAllTask);
                    return toDoRepository.save(user1);
                }
            }
        } else{
            throw new UserNotFoundException("User Not Found.");
        }
    }


    @Override
    public List<ToDo> getToDoByCompletionStatus(String emailId, Boolean isCompleted) throws ToDoNotFoundException, UserNotFoundException {
        if (toDoRepository.findById(emailId).isPresent()) {
            User user = toDoRepository.findById(emailId).get();
            if (user.getToDoList().isEmpty()) {
                throw new ToDoNotFoundException("Task Not Found.");
            } else {
                List<ToDo> toDoList = user.getToDoList();
                List<ToDo> completedTaskList = toDoList.stream().filter(todo -> todo.isCompleted() == (isCompleted)&& !todo.isArchive()).toList();
                return completedTaskList;
            }
        } else {
            throw new UserNotFoundException("User Not Found.");
        }
    }

    @Override
    public User updateToDoAsCompletedTask(String emailId, ToDo toDo) throws ToDoNotFoundException, UserNotFoundException {
        if (toDoRepository.findById(emailId).isPresent()) {
            User newUser = toDoRepository.findById(emailId).get();
            if (newUser.getToDoList().isEmpty()) {
                throw new ToDoNotFoundException("To Do Not Found.");
            } else {
                List<ToDo> getAllTask =  newUser.getToDoList();
                if (!getAllTask.stream().filter(function -> function.getTitle().equals(toDo.getTitle())).findAny().isPresent()) {
                    throw new ToDoNotFoundException("To Do Not Found.");
                } else {
                    ToDo taskToBeUpdated = getAllTask.stream().filter(fun -> fun.getTitle().equals(toDo.getTitle())).findAny().get();
                    if (!toDo.isCompleted()) {
                        taskToBeUpdated.setCompleted(true);
                    } else {
                        taskToBeUpdated.setCompleted(false);
                    }
                    int index = getAllTask.indexOf(taskToBeUpdated);
                    getAllTask.set(index, taskToBeUpdated);
                    newUser.setToDoList(getAllTask);
                    return toDoRepository.save(newUser);
                }
            }
        } else {
            throw new UserNotFoundException("User Not Found.");
        }
    }

    @Override
    public List<ToDo> getToDoByImportantStatus(String emailId, Boolean isCompleted) throws ToDoNotFoundException, UserNotFoundException {
        if (toDoRepository.findById(emailId).isPresent()) {
            User user = toDoRepository.findById(emailId).get();
            List<ToDo> toDoList = user.getToDoList();
            if (toDoList.isEmpty()) {
                throw new ToDoNotFoundException("To do is not present");
            } else {
                List<ToDo> archiveToDoList = toDoList.stream().filter(function -> function.isImportant() == (isCompleted)).toList();
                return archiveToDoList;
            }
        } else {
            throw new UserNotFoundException("User not present");
        }
    }

    @Override
    public User updateToDoAsImportantTask(String emailId, ToDo toDo) throws ToDoNotFoundException, UserNotFoundException {
        if (toDoRepository.findById(emailId).isPresent()) {
            User newUser = toDoRepository.findById(emailId).get();
            if (newUser.getToDoList().isEmpty()) {
                throw new ToDoNotFoundException("To Do Not Found.");
            } else {
                List<ToDo> getAllTask = newUser.getToDoList();
                if (!getAllTask.stream().filter(function -> function.getTitle().equals(toDo.getTitle())).findAny().isPresent()) {
                    throw new ToDoNotFoundException("To Do Not Found.");
                } else {
                    ToDo taskToBeUpdated = getAllTask.stream().filter(fun -> fun.getTitle().equals(toDo.getTitle())).findAny().get();
                    if (!toDo.isImportant()) {
                        taskToBeUpdated.setImportant(true);
                    } else {
                        taskToBeUpdated.setImportant(false);
                    }
                    int index = getAllTask.indexOf(taskToBeUpdated);
                    getAllTask.set(index, taskToBeUpdated);
                    newUser.setToDoList(getAllTask);
                    return toDoRepository.save(newUser);
                }
            }
        } else {
            throw new UserNotFoundException("User Not Found.");
        }
    }

    @Override
    public boolean deleteAllToDo(String emailId) throws UserNotFoundException, ToDoNotFoundException {
        if (toDoRepository.findById(emailId).isEmpty()) {
            throw new UserNotFoundException("User Not Present");
        } else {
            User user = toDoRepository.findById(emailId).get();
            List<ToDo> toDoList = user.getToDoList();
            if (toDoList.isEmpty()) {
                throw new ToDoNotFoundException("To Do List is not present");
            } else {
                user.getToDoList().removeAll(toDoList);
                toDoRepository.save(user);
                return true;
            }
        }
    }

    @Override
    public User getUserDetails(String emailId) throws UserNotFoundException {

            if (toDoRepository.findById(emailId).isPresent()) {
                User user = toDoRepository.findById(emailId).get();
                if (user.getEmailId() == null) {
                    throw new UserNotFoundException("User Not Found.");
                } else {
                    return  user;
                }
            } else {
                throw new UserNotFoundException("User Not Found.");
            }
        }

    @Override
    public List<ToDo> getAllToDoByDate(String emailId ) throws UserNotFoundException, ToDoNotFoundException {
        String date =  new SimpleDateFormat("yyyy-MM-dd").format(new Date());

        if(toDoRepository.findById(emailId).isPresent()){
            User user=toDoRepository.findById(emailId).get();
            List<ToDo> toDoList = user.getToDoList();
            if(toDoList == null){
                throw new ToDoNotFoundException("To Do Not Found");
            }else{
                List<ToDo> toDoListByDate = toDoList.stream().filter(function -> function.getDueDate().equals(date)).toList();
//                System.out.println( "due date - " +toDoList.get(1).getDueDate().getTimezoneOffset());
//                System.out.println(date);

                return toDoListByDate;
            }
        }else {
            throw new UserNotFoundException("User Not Found");

        }

    }


}
