const tokenAsset = (tokenEffect, auth_refresh,setLoading , setUser) => tokenEffect(() => {
    auth_refresh({ auth_token: sessionStorage.getItem('TOKEN') })
        .then((new_token) => {
            setLoading(false);
            console.log(new_token);
            if (new_token?.refreshToken?.auth_token) {
                sessionStorage.setItem('USER', new_token.refreshToken.nombre_usuario);
                sessionStorage.setItem('TOKEN', new_token.refreshToken.auth_token);
                setUser(true);
            }else{
                setUser(false);
            }
        });
}, [setUser]);

export default tokenAsset;