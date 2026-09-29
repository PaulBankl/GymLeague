package dev.paulbankl.gymleague.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@Getter
@NoArgsConstructor 
@Table(name = "community_activities")
public class CommunityActivity {
    @Id @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false)
    private String username;


    @ManyToOne
    @JoinColumn(name = "community_id", nullable = false)
    private Community community;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ActivityTone tone;


    @Column (nullable = false)
    private String message;

    private LocalDateTime createdAt;

    public CommunityActivity(String username, ActivityTone tone, String message, Community community) {
        this.username = username;
        this.tone = tone;
        this.message = message;
        this.community = community;
        createdAt = LocalDateTime.now();
    }


}
