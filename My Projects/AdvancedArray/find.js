//find and findIndex

function findUserByUsername(usersArray, usernames) {
    usersArray.find(user => {
        return user.usernames === usernames;
    })
}

function deleteUser(usersArray, usernames) {
    let foundIdx = usersArray.findIndex(user => {
        return user.usernames === usernames;
    })
        if(foundIdx === -1) return;
    return usersArray.splice(foundIdx, 1)[0];
}