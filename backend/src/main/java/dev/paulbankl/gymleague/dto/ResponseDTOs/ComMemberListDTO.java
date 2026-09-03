package dev.paulbankl.gymleague.dto.ResponseDTOs;

import dev.paulbankl.gymleague.model.CommunityRole;

public record ComMemberListDTO(
    String username,
    CommunityRole role,
    String joinedAt
) {
    
}
