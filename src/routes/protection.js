// essa rota é desstinada a fazer a brindagem doss componetes do admin, possibilitando que user precise essta logando para poder acessar 

import { useState, useEffect } from 'react';

import { auth } from "../firebaseConnection";
import { onAuthStateChanged } from 'firebase/auth'; // verifica em tempo real se o usuario essta logado

import { Navigate } from 'react-router-dom';

export default function Protection({ children }) {

     const [loading, setLoading] = useState(true); // verifica se tem usuario
     const [signed, setSigned] = useState(false); // verifica se esta logado


     useEffect(() => {
          async function verificarLogin() {
               const userOn = onAuthStateChanged(auth, (user) => {
                    //se tem user logado
                    if (user) {
                         const userData = {
                              uid: user.uid,
                              email: user.email,
                         }

                         //salvar no localstorage, porem nao e obrigatorio
                         localStorage.setItem("@detalhesUsuario",
                              JSON.stringify(userData))


                         //obrigatorio 
                         setLoading(false);
                         setSigned(true);
                    } else {
                         // não possui usuario logado
                         setLoading(false);
                         setSigned(false);
                    }
               })
          }

          verificarLogin();
     }, [])


     //verificacoes 


     //esta logado
     if (loading) {
          return (
               <div></div>
          )
     }

     //nao estiver logado
     if (!signed) {
          return <Navigate to="/" />
     }

     return children;
}