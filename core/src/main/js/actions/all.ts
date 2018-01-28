export const selectUser = (user) => {
    console.log("You clicked on user: ", user.first);
    return {
        payload: user,
        type: "USER_SELECTED"
    };
};
