import { auth_refresh } from "./Session/get-api";

async function getUserData() {
    let my_token = sessionStorage.getItem('TOKEN');
    if (my_token) {
        let newTokenSecure = await auth_refresh({ auth_token: my_token });
        let mynewToken = newTokenSecure?.refreshToken?.auth_token;
        if (mynewToken) {
            let userData = mynewToken.split(".")[1];
            userData = JSON.parse(atob(userData));
            console.log(userData);
            return userData;
        }else{
            return "NOT VALID TOKEN"
        }
    } else {
        return "NOT USER";
    }
}

export default getUserData;