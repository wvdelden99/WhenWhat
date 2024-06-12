    // const { user, fetchCurrentUserData } = useAuth();
    // const [currentUserData, setCurrentUserData] = useState(null);
    // const [likedActivities, setLikedActivities] = useState({});

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const currentUserFetchRef = await fetchCurrentUserData(user.userId);
    //             setCurrentUserData(currentUserFetchRef);

    //             if (currentUserFetchRef.likedActivities) {
    //                 const initialLikedActivities = {};
    //                 currentUserFetchRef.likedActivities.forEach(id => {
    //                     initialLikedActivities[id] = true;
    //                 });
    //                 setLikedActivities(initialLikedActivities);
    //             }
    //         } catch (error) {
    //             console.log('Fetch Error: ', error);
    //         }
    //     }
    //     fetchData();
    // }, [user]);


    // const saveLike = async (id, isLiked) => {
    //     try {
    //         const userDocRef = doc(userRef, currentUserData.userId);
    //         await updateDoc(userDocRef, {
    //             likedActivities: isLiked ? arrayUnion(id) : arrayRemove(id)
    //         });
    //     } catch (error) {
    //         console.log('Store Like Error:', error);
    //     }
    // }

    // const toggleLike = (id) => {
    //     const newLikedStatus = !likedActivities[id];
    //     setLikedActivities(prevLikedActivities => ({
    //         ...prevLikedActivities,
    //         [id]: newLikedStatus
    //     }));
    //     // Perform the Firestore update asynchronously
    //     saveLike(id, newLikedStatus);
    // };