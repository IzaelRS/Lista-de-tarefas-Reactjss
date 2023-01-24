import { useState } from "react";

import './home.css';

import { Link } from "react-router-dom"; // link de uma pagina direta

//firebase
import { auth } from '../../firebaseConnection'
import { signInWithEmailAndPassword } from "firebase/auth"; // verica o login/senha
import { useNavigate } from "react-router-dom";// navegacoes de forma indireta



export default function Home() {

     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');

     const navegacao = useNavigate();

     async function handleLogin(evento) {
          evento.preventDefault(); // não atualiza a pagina 


          if (email !== '' && password !== '') {

               await signInWithEmailAndPassword(auth, email, password)
                    .then(() => {
                         // navegar para admin
                         navegacao('./admin', { replace: true }) // da um replace no historio de navegacao 
                    })
                    .catch(() => {
                         alert("Usuário incorreto, verifique os campos")
                    });

          } else {
               alert("Por favor preencher todos os campos")

          }
     }
     //vericacao de senha e login


     return (
          <div className="home-Container">



               <h1 className="home-titulo">Your FAVORITE List</h1>
               <span className="text"> Gerencie sua lista de tarefas AQUI.. </span>
               <form
                    className="home-form"
                    onSubmit={handleLogin}>
                    <input
                         className="name-in"
                         type="text"
                         placeholder="Digite seu Email"
                         value={email}
                         onChange={(evento) => setEmail(evento.target.value)}
                    />

                    <input
                         className="pass-in"
                         type="password"
                         placeholder="Digite a sua Senha"
                         value={password}
                         onChange={(evento) => setPassword(evento.target.value)}
                    />

                    <button
                         className="home-bt"
                         type="submit">
                         Acessar lista
                    </button>

                    <Link
                         className="registro"
                         to="/register">
                         Cadastre-se
                    </Link>
               </form>
          </div>
     );
}