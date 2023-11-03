/*
 * Author :Mohd adnan parvez
 * Date : 07-06-2023
 * Created with : intellig IDEA Communit EDITION
 */


package com.niit.bej.apigateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Bean
    public RouteLocator myRoutes(RouteLocatorBuilder routeLocatorBuilder){
        return  routeLocatorBuilder.routes()
                .route(p-> p.path("/toDo/**")
                        .uri("lb://ToDoService"))
                .route(p-> p.path("/user/**")
                        .uri("lb://UserService"))
                .route(p-> p.path("/notificationController/**")
                        .uri("lb://NotificationService"))
                .build();

    }
}
