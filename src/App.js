

import { useState } from 'react';
import './style.css'
import firebase from './firebaseConnection';





function App() {


  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [posts, setPosts] = useState([]);

  async function handleAdd() {
  
    await firebase.firestore().collection('posts')
    
    //criando id automático
    .add({
      titulo: titulo,
      autor: autor
    })

    .then(() => {
      console.log("cadastrado com sucesso!");
      setTitulo('');
      setAutor('');
    })

    .catch((error) => {
      console.log("Erro: " + error)
    })


    //inserindo em post  com id especifico
    /*
        .doc('123')
    .set({
      
      titulo: titulo,
      autor: autor,  
     
    })
    */

  
    .then(() => {
      console.log("dados cadastrados com sucesso")
    })
  
    .catch((error) => {
      console.log("Algo deu errado: " + error)
    })
  }

  //buscar dados no banco a partir do id conhecido
  async  function   searchPost() {

    await firebase.firestore().collection('posts')
    .get()

    .then((sdnapshot) => {
      let lista = [];

      sdnapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor
        })
      })

      setPosts(lista);
    })

    .catch((error) => {
      console.log('error: '+ error)
    })
    // await firebase.firestore().collection('posts')
    // .doc('123')
    // .get()
    // .then((snapshot) => {
    //   setTitulo(snapshot.data().titulo);
    //   setAutor(snapshot.data().autor);
    // })

    // .catch((error) => {
    //   console.log('error' + error)
    // })
  }

  return (
    <div className="App">
        <h1> React JS + Firebase </h1> <br/>
        <div className='container'>

        <label>Titulo</label>
        <textarea typeof='text' value={titulo} onChange={(e) => setTitulo(e.target.value)} />

        <label>Autor</label>
        <input type='text' value={autor}  onChange={(e) => setAutor(e.target.value)}/>

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={searchPost}>Busca post</button>
        <br/>
        <ul>
          {posts.map((post) =>{
            return(
              <li key={post.id}>
                <span>Titulo: {post.titulo}</span> <br/>
                <span>Autor: {post.autor}</span> <br/> <br/>
              </li>
            )
          })}
        </ul>
        </div>
 

    </div>
  );
}

export default App;
