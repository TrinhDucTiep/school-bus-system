package com.example.api;

import com.example.shared.db.entities.Example;
import com.example.shared.db.entities.TestShared;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@ComponentScan("com.example.*")
@ComponentScan("com.example.shared.*")
@EnableJpaRepositories("com.example.shared.*")
@EntityScan("com.example.shared.db.entities")
@EnableTransactionManagement(proxyTargetClass = true)
@EnableAsync
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true)
public class ApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiApplication.class, args);
        Example example = new Example();
    }

}
