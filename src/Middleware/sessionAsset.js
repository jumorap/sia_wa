function getUserData() {
    let my_token = sessionStorage.getItem('TOKEN');
    if (my_token) {
        let userData = my_token.split(".")[1];
        userData = JSON.parse(atob(userData));
        return userData;
    }else{
        return "NOT USER";
    }
}

export default getUserData;