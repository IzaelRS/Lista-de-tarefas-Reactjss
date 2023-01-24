import { useState } from "react";

import { Link } from "react-router-dom";

import './register.css';

//firebase
import { auth } from '../../firebaseConnection';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from 'firebase/auth'; //cria login/senha



export default function Register() {

     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [passver, setPassver] = useState('');

     const navegacao = useNavigate();

     async function handleRegister(evento) {
          evento.preventDefault();


          if (email !== '' && password !== '' && password === passver) {
               await createUserWithEmailAndPassword(auth, email, password, passver)
                    .then(() => {
                         alert("Cadastro concluido 😊 ")
                         navegacao("/admin", { replace: true })
                    })
                    .catch(() => {
                         alert("Erro ao fazer o cadastro")
                    })

          } else {
               alert("Algo deu errado, verifique o campos")

          }


          // apagar os dado dos campos
          setEmail = (" ")
          setPassword = (" ")
          setPassver = (" ")

     }




     return (
          <div className="rg-Container">



               <h1 className="dr-titulo">Cadastre-se</h1>
               <span className="dr-text"> Para criar a sua conta é super simples, basta nos informar um email e criar uma senha  </span>
               <form
                    className="home-form"
                    onSubmit={handleRegister}>
                    <input
                         className="name-inrg"
                         type="text"
                         placeholder="Digite o seu melhor Email"
                         value={email}
                         onChange={(evento) => setEmail(evento.target.value)}
                    />

                    <input
                         className="pass-verrg"
                         type="password"
                         placeholder="Digite a sua Senha"
                         value={password}
                         onChange={(evento) => setPassword(evento.target.value)}
                    />

                    <input
                         className="pass-inrg"
                         type="password"
                         placeholder="Digite a sua Senha novamente"
                         value={passver}
                         onChange={(evento) => setPassver(evento.target.value)}
                    />

                    <button
                         className="rg-bt"
                         type="submit">
                         Cadastrar
                    </button>

                    <Link
                         className="login" // colocar home
                         to="/">
                         Voltar ao Login...
                    </Link>
               </form>
          </div>
     );
}