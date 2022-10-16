const queries = (typeQuery, usuario) => {
    switch (typeQuery) {
        case "auth":
            return (
                `{
                    getToken(nombre_usuario:"${usuario.nombre_usuario}", contrasena:"${usuario.contrasena}"){
                      auth_token
                      rol {
                        tipo_rol
                      }
                    }
                }`);
        case "refresh":
            return(
                `{
                    refreshToken(auth_token: "${usuario.auth_token}"){
                    auth_token
                    nombre_usuario
                  }
                }`
            );
        default:
            throw new Error("Operation " + typeQuery + " not supported");
    }

}

export default queries;