import type { Ranking } from "../types/Ranking";
import { apiFetch } from "./api";

export async function getAllCommunitiesForUser() {
    const response = await apiFetch(`/api/community/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? response.statusText ?? "Request failed");
    }
    return await response.json();
}


export async function createCommunity(name: string, description: string, isPrivate: boolean, exerciseIds: number[], joinCode: string) {
    const response = await apiFetch(`/api/community/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, isPrivate, exerciseIds, joinCode }),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? response.statusText ?? "Request failed");
    }
    return response.ok;
}

export async function getCommunityDetails(id: number) {
    const response = await apiFetch(`/api/community/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? response.statusText ?? "Request failed");
    }
    return await response.json();
}

export async function leaveCommunity(id: number) {
    const response = await apiFetch(`/api/community/leave/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? response.statusText ?? "Request failed");
    }

    if (response.status === 204) {
        return true;
    }
}


export async function getAllMembersOfCommunity(id: number) {

    const response = await apiFetch(`/api/community/members/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? response.statusText ?? "Request failed");
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
    const response = await apiFetch(`/api/community/random`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? response.statusText ?? "Request failed");
    }
    return await response.json();
}

export async function editCommunity(name: string, description: string, isPrivate: boolean, exerciseIds: number[], joinCode: string) {
    const response = await apiFetch(`/api/community/change`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, isPrivate, exerciseIds, joinCode }),
    })
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? response.statusText ?? "Request failed");
    }
    if (response.status === 204) {
        return true;
    }
}

export async function joinCommunity(communityId: number) {
    const response = await apiFetch(`/api/community/join`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ communityId }),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? response.statusText ?? "Request failed");
    }
    return true;

}





export async function kickMember(communityId: number, kickUsername: string) {
    const response = await apiFetch(`/api/community/kick`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ communityId, kickUsername }),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? response.statusText ?? "Request failed");
    }
    if (response.status === 204) {
        return true;
    }
}
export async function promoteMember(communityId: number, targetUsername: string) {
    const response = await apiFetch(`/api/community/promote`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ communityId, targetUsername }),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? response.statusText ?? "Request failed");
    }
    if (response.status === 204) {
        return true;
    }
}

export async function demoteMember(communityId: number, targetUsername: string) {
    const response = await apiFetch(`/api/community/demote`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ communityId, targetUsername }),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? response.statusText ?? "Request failed");
    }
    if (response.status === 204) {
        return true;
    }

}
export async function getCommunityRanking(communityId: number): Promise<Ranking> {
    const response = await apiFetch(`/api/community/ranking/${communityId}`, {
        method: "GET",
    })
    if (!response.ok) {
        let message = response.statusText || "Request failed";
        try {
            const error = await response.json();
            message = error.message ?? message;
        } catch {
        }

        throw new Error(message);
    }
    return await response.json();
}

export async function joinCommunityWithCode(joinCode: string, communityName: string) {
    const response = await apiFetch(`/api/community/codejoin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ joinCode, communityName }),
    });
    if (!response.ok) {
        let message = response.statusText || "Request failed";
        try {
            const error = await response.json();
            message = error.message ?? message;
        } catch {
            // response body was empty or not JSON
        }

        throw new Error(message);
    }
    return true;
}

export async function getCommunityActivities(communityId: number) {
    const response = await apiFetch(`/api/community/activity/${communityId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? response.statusText ?? "Request failed");
    }
    return await response.json();
}