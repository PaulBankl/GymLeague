
export async function getAllCommunitiesForUser() {
    const response = await fetch(`http://localhost:8080/api/community/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    })
    if (!response.ok) {
        throw new Error("Failed to fetch communities");
    }
    return await response.json();
}


export async function createCommunity(name: string, description: string, isPrivate: boolean, exerciseIds: number[]) {
    const response = await fetch("http://localhost:8080/api/community/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
         credentials: "include",
        body: JSON.stringify({ name, description, isPrivate, exerciseIds }),
    });
    if (!response.ok) {
        throw new Error("Failed to create community");
    }
    return await response.json();
}

export async function getCommunityDetails(id: number) {
    const response = await fetch(`http://localhost:8080/api/community/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
         credentials: "include"
    });
    if (!response.ok) {
        throw new Error("Failed to fetch community details");
    }
    return await response.json();
}

export async function leaveCommunity(id: number) {
    const response = await fetch(`http://localhost:8080/api/community/leave/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
         credentials: "include"
    });
    if (!response.ok) {
        throw new Error("Failed to leave community");
    }
    return await response.json();
}


export async function getAllMembersOfCommunity(id: number) {
    
        const response = await fetch(`http://localhost:8080/api/community/members/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
             credentials: "include"
        });
        if (!response.ok) {
            throw new Error("Failed to fetch community members");
        }
        const roleOrder: { [key: string]: number } = {
            OWNER: 0,
            ADMIN: 1,
            MODERATOR: 2,
            USER: 3,
        };

        const members = await response.json();
        members.sort((a: { role: string }, b: { role: string }) => roleOrder[a.role] - roleOrder[b.role]);
        return members;
}

export async function get10RandomCommunities() {
    const response = await fetch(`http://localhost:8080/api/community/random`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
             credentials: "include"
        }
    );
    return await response.json();
}

export async function editCommunity(name: string, description: string, isPrivate: boolean,exerciseIds: number[]) {
    const response = await fetch(`http://localhost:8080/api/community/change`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
         credentials: "include",
        body: JSON.stringify({ name, description, isPrivate, exerciseIds }),
    })
    if (!response.ok) {
        throw new Error("Failed to edit community");
    }
    return await response.json();
}

export async function joinCommunity(communityId: number) {
    const response = await fetch(`http://localhost:8080/api/community/join`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
         credentials: "include",
        body: JSON.stringify({ communityId }),
    });
    if (!response.ok) {
        throw new Error("Failed to join community");
    }
    return await response.json();


}

export async function kickMember(communityId: number, ownerName: string) {
    const response = await fetch(`http://localhost:8080/api/community/kick`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
         credentials: "include",
        body: JSON.stringify({ communityId, ownerName }),
    });
    if (!response.ok) {
        throw new Error("Failed to kick member");
    }
    return await response.json();
}
export async function promoteMember(communityId: number, ownerName: string) {
    const response = await fetch(`http://localhost:8080/api/community/promote`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
         credentials: "include",
        body: JSON.stringify({ communityId, ownerName}),
    });
    if (!response.ok) {
        throw new Error("Failed to promote member");
    }
    return await response.json();
}

export async function demoteMember(communityId: number, username: string) {
    const response = await fetch(`http://localhost:8080/api/community/demote`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
         credentials: "include",
        body: JSON.stringify({ communityId,username }),
    });
    if (!response.ok) {
        throw new Error("Failed to demote member");
    }
    return await response.json();
}