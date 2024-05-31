    // Updated fetchFriendGroups function
    const fetchFriendGroups = async (userGroupIds) => {
        try {
            const friendGroupDocRef = await getDocs(groupRef);
            
            let friendGroupsData = [];
            friendGroupDocRef.forEach((doc) => {
                const groupData = doc.data();
                if (userGroupIds.includes(groupData.groupId)) {
                    friendGroupsData.push({ ...groupData });
                }
            });

            return friendGroupsData;
        } catch(error) {
            console.log('Friend Group Fetch Error:', error);
            return [];
        }
    };