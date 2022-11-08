import React, { useEffect } from "react";
import { getMateriasByPrograma } from "../../Middleware";

export default function MateriasNew() {
    useEffect(() => {
        const getMaterias = async () => {
            const data = await getMateriasByPrograma(["5", "6","1"])   
            const materia = data.asignaturasInscribibles         
            console.log(materia)
        }
        getMaterias()
    }, [])

  return <div>MateriasNew</div>;
}
