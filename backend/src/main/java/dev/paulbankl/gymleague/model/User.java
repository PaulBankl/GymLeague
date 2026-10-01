
package dev.paulbankl.gymleague.model;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "users")
public class User {
    public User(String username,String email, String passwordHash) {
        this.username = username;
        this.displayName = username;
        this.email = email;
        this.passwordHash = passwordHash;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column(nullable = false, unique = true)
    private String username;

    @Setter
    @Column(nullable = false)
    private String displayName;

    @Column(nullable = false, unique = true)
    @Setter
    private String email;

    @Setter
    @Column(nullable = false)
    private String passwordHash;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }

    @Override 
    public int hashCode() {
         return getClass().hashCode();
    }
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null || getClass() != obj.getClass())
            return false;
        User other = (User) obj;

        return id != null && id.equals(other.id);
    }
    
}
