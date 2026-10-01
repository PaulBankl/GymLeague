package dev.paulbankl.gymleague.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.http.HttpMethod;


@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .cors(cors -> {})
            .csrf(csrf -> csrf.spa())
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable())
            .authorizeHttpRequests(auth -> auth.requestMatchers(HttpMethod.POST, "/api/users/register").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/users/login").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/users/csrf").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/users/health").permitAll()
                .anyRequest().authenticated())
                .logout(logout -> logout
        .logoutUrl("/api/users/logout")
        .invalidateHttpSession(true)
        .deleteCookies("JSESSIONID")
        .clearAuthentication(true)
        .logoutSuccessHandler((request, response, authentication) -> {
            response.setStatus(200);
        })
        .permitAll()
)
                .build();
    }
    @Bean
public AuthenticationManager authenticationManager(
        AuthenticationConfiguration configuration
) throws Exception {
    return configuration.getAuthenticationManager();
}
}
