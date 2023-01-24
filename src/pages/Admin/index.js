import './admin.css'

import { useState, useEffect } from "react";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";

import { ImExit } from "react-icons/im";


import { auth, db } from "../../firebaseConnection"
import { signOut } from "firebase/auth";
import {
     addDoc,
     collection,
     onSnapshot,
     query,
     orderBy,
     where,
     doc,
     deleteDoc,
     updateDoc
} from "firebase/firestore";
import { async } from '@firebase/util';




export default function Admin() {


     const [tarefaInput, setTarefaInput] = useState("");
     const [editataf, setEditaTaf] = useState({});
     const [user, setUser] = useState({});

     const [tarefas, setTarefas] = useState([]);

     useEffect(() => {
          async function loadTarefas() {
               //pegando daddos do localStorage
               const userDetail = localStorage.getItem("@detalhesUsuario")
               setUser(JSON.parse(userDetail)) // tranformando em uma string


               //pegando tarefa de user

               if (userDetail) {
                    const data = JSON.parse(userDetail);

                    const tarefaRef = collection(db, "minhas_tarefas")

                    const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))


                    // tranformando os dados em lista
                    const unsub = onSnapshot(q, (snapshot) => {
                         let lista = [];

                         snapshot.forEach((doc) => {
                              lista.push({
                                   id: doc.id,
                                   tarefa: doc.data().tarefa,
                                   userUid: doc.data().userUid,
                              })
                         })
                         setTarefas(lista); // onde amazena as tareafas
                    })
               }
          }

          loadTarefas();

     }, [])


     // criacao de tarefas
     async function handleRegiter(event) {
          event.preventDefault(); // nao atualiza a pagina

          if (tarefaInput === "") {
               alert("Campo Vazio, digite a sua tarefa ou anotações")
               return;
          }


          // caso o hendleEdit estiver vazio
          if (editataf?.id) {
               handleUpdateTarefa();
               return;
          }

          await addDoc(collection(db, "minhas_tarefas"), {
               tarefa: tarefaInput,
               created: new Date(),
               userUid: user?.uid
          })
               .then(() => {
                    alert("Tarefa registrada")
                    setTarefaInput("")
               })
               .catch((error) => {
                    alert("Algo aconteceu de errado..." + error)
               })
     }

     // funcao de Logout
     async function handleLogout() {
          // metodo para deslogar user 
          await signOut(auth);
     }

     // deletar lista
     async function excluirTarefa(id) {
          const docRef = doc(db, "minhas_tarefas", id)
          await deleteDoc(docRef)
     }

     // editar tarefas
     function editarTarefa(item) {
          setTarefaInput(item.tarefa) // preencendo o campo com a tarefa antiga
          setEditaTaf(item);
     }

     async function handleUpdateTarefa() {
          const docRef = doc(db, "minhas_tarefas", editataf?.id)
          await updateDoc(docRef, {
               tarefa: tarefaInput
          })
               .then(() => {
                    alert("tarefa Atualizada")
                    setTarefaInput("")
                    setEditaTaf({})
               })
               .catch((error) => {
                    alert.apply("Erro ao atulizar" + error)
                    setTarefaInput("")
                    setEditaTaf({})
               })
     }

     return (

          <div className="container-adm">


               <div className='container_form'>
                    <h1 className="h1-adm"> Minhas tarefas</h1>

                    <form
                         onSubmit={handleRegiter} // recebe o submit
                         className="form-adm">
                         <textarea
                              className='area-admin'
                              placeholder="Digite a tarefa..."
                              value={tarefaInput}
                              onChange={(event) => setTarefaInput(event.target.value)}
                         />

                         {Object.keys(editataf).length > 0 ? (
                              <button className='bt-adm' style={{
                                   backgroundColor: '#fbc6c2'
                              }} type="submit"> Atualizar Tarefa </button>
                         ) : (
                              <button className='bt-adm' type="submit"> Anexar Tarefa </button>
                         )}
                    </form>
               </div>

               <div className='container_list'>
                    <div className='sub_list'>
                         {tarefas.map((item) => (
                              <article key={item.id} className='list' id="list">
                                   <p> {item.tarefa}</p>


                                   <div>
                                        <button
                                             onClick={() => editarTarefa(item)}
                                             className='btn-edt'> <AiFillEdit /> </button>

                                        <button
                                             onClick={() => excluirTarefa(item.id)}
                                             className='btn-excluir'> <AiFillDelete /> </button>


                                   </div>

                              </article>
                         ))}
                    </div>
               </div>

               <button className='btn-sair'
                    onClick={handleLogout}> < ImExit /> </button>



          </div>
     )
}