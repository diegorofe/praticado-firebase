

import { useState, useEffect } from 'react';
import './style.css'
import firebase from './firebaseConnection';





function App() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [user, setUser] = useState(false);
  const [userLogged, setUserLogged] = useState({})

  
  const [idPost, setIdPost] = useState('');  
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [posts, setPosts] = useState([]);

  

  
useEffect(() =>{

async function loadPosts() {
  await firebase.firestore().collection('posts')
  .onSnapshot((doc) =>{
    let meusPosts = [];

    doc.forEach((item) => {
      meusPosts.push({
        id: item.id,
        titulo: item.data().titulo,
        autor: item.data().autor,
      })
    });

    setPosts(meusPosts);

  })
}

loadPosts();

}, []);


useEffect(() => {

async function checkLogin() {
  await firebase.auth().onAuthStateChanged((user) => {
    
    //se tem usuário logado
    if(user){
      setUser(true);
      setUserLogged({
        uid: user.uid,
        email: user.email
      })

      //se não tem usuário logado
    }else{
      setUser(false);
      setUserLogged({});
    }
  })
}

checkLogin();

}, []);

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

  async function editPost () {
    
    await firebase.firestore().collection('posts')
    .doc(idPost)
    .update({
      titulo: titulo,
      autor: autor
    })

    .then(() => {
      console.log('dados atualizados com sucesso!')
      setTitulo('');
      setIdPost('');
      setAutor('');
    })

    .catch((error) => {
      console.log('Erro ao atualizar: ' + error)
    })
  }

 async function deletePost(id){
    await firebase.firestore().collection('posts').doc(id)
    .delete()
    .then(() => {
      alert('O post ' + id + ' foi deletado com sucesso!')
    })


  }


 async function addNewUser(){
    
    await firebase.auth().createUserWithEmailAndPassword(email, senha)

    .then(() => {
      alert('Usuário cadastrado com sucesso')
    })
    .catch((error) => {
        if(error.code == 'auth/weak-password'){
          alert('senha fraca')
          setSenha('')
        }
    })
  }

  async function login(){

    await firebase.auth().signInWithEmailAndPassword(email, senha)
    .then((value) => {
      console.log(value)
    })
    .catch((error) => {
      alert('erro ao fazer login ' + error)
    })

  }

  async function logout() {
    await firebase.auth().signOut();
    alert('usuario off')
    setEmail('')
    setSenha('')
    
  }

  return (
    <div className="App">
        <h1> React JS + Firebase </h1> <br/>
        
        {user && (
          <div>
            <strong>Seja bem vindo! </strong>
            <span>{userLogged.uid} - { userLogged.email}</span>
          </div>
        )}

        <div className='container'>
        <h2>Cadastro de usuários</h2>
          <label>Email</label>
          <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>

          <br/>

          <label>Senha</label>
          <input type='password' value={senha} onChange={(e) => setSenha(e.target.value)}/>

          <br/>
          <button onClick={login}>Fazer login</button>
          <button onClick={addNewUser}>cadastrar novo usuário</button>
          <button onClick={logout}>Sair</button>

        </div>

        <hr/>
        <div className='container'>
        <h2>Banco de Dados</h2>

        <label>ID</label>
        <input type='text' value={idPost}  onChange={(e) => setIdPost(e.target.value)}/>

        <label>Titulo</label>
        <textarea typeof='text' value={titulo} onChange={(e) => setTitulo(e.target.value)} />

        <label>Autor</label>
        <input type='text' value={autor}  onChange={(e) => setAutor(e.target.value)}/>

        
        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={searchPost}>Busca post</button>
        <button onClick={editPost}>EditarPost</button>
        <br/>
        <ul>
          {posts.map((post) =>{
            return(
              <li key={post.id}>
                <span> ID - {post.id} </span> <br/>
                <span>Titulo: {post.titulo}</span> <br/>
                <span>Autor: {post.autor}</span> <br/>
                <button onClick={() => deletePost(post.id)} >Excluir</button> 
                <hr/>
              </li>
            )
          })}
        </ul>
        </div>
 

    </div>
  );
}

export default App;
