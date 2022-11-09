function getUserData(){
    let my_token = sessionStorage.getItem('TOKEN');
    let userData = my_token.split(".")[1];
    userData = JSON.parse(atob(userData));
    return userData;
}

export default getUserData;