package dev.paulbankl.gymleague.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterDTO(
    @NotBlank(message = "Username cannot be blank")
    @Size(min = 3, max = 30, message = "Username must be between 3 and 30 characters")
    String username,

    @NotBlank(message = "Password cannot be blank")
    @Size(min = 5, max = 100, message = "Password must be between 5 and 100 characters")
    String password,

    @Email 
    @NotBlank (message = "Email cannot be blank")
    String email
) {
}
    

