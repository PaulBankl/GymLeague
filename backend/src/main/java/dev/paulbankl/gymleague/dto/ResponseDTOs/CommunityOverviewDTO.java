package dev.paulbankl.gymleague.dto.ResponseDTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommunityOverviewDTO{
    private Long id;
    private String name;
    private String description;
    private boolean isPrivate;
    private String createdAt;
    private String owner;
    private int memberCount;
}
