import React, {useState} from 'react';
import { PlayerInventory, PlayerStats } from './GameComponents/playerUI';
import { PresentOptions, StoryRender } from './GameComponents/storyAndOptions';
import { BrowserRouter, useNavigate } from "react-router-dom";
import logo from './GameComponents/styles/logo.svg';
import styles from './GameComponents/styles/GameStyles.module.css';
import logstyles from './GameComponents/styles/login.module.css';
import signstyles from './GameComponents/styles/signup.module.css';
import { parse } from 'ipaddr.js';

export function UiRender(){
    const [view, setView] = useState('')
    return(
        <div>
            <UiButton url='' handleClick={() => setView((v) => v === 'inventory' ? '' : 'inventory')}/>
            <UiButton url='' handleClick={() => setView((v) => v === 'stats' ? '' : 'stats')}/>
            {view === 'inventory' && <PlayerInventory />}
            {view === 'stats' && <PlayerStats />}
        </div>
    )
}

function checkPasswordStrength(password) {
    if (password.length < 8) return 0;
    const regexes = [
        /[a-z]/,
        /[A-Z]/,
        /[0-9]/,
        /[~!@#$%^&*)(+=._-]/
    ]
    console.log(regexes
        .map(re => re.test(password))
        )
    return regexes
    .map(re => re.test(password))  // return true ou false
    .reduce((score, t) => t ? score + 1 : score, 0) //vê se é true, se sim, adiciona1 ao score. O score começa a 0
}

function validateEmail(email) {
    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return EMAIL_REGEX.test(email)
}

function UiButton({url, handleClick}) {
    return (
        <div>
            <button onClick={() => handleClick()}><img src={url} alt='UI button'></img></button>
        </div>
    )
}

export function GameRender() {
    return (
        <div>
            <UiRender />
            <StoryRender />
            <PresentOptions options={story[0].options} />
        </div>
    )
}

export function UserCreation() {

    function HandleErr(values) {
        setErr( e => {
            let erros = {}
            if (!validateEmail(values.email)) {
                erros.errMessageMail = 'O email inserido não é válido.'
                console.log('erro em mail')
            }

            if(checkPasswordStrength(values.pass) < 3) {
                erros.errMessagePass = 'A password inserida não é válida.'
                console.log('erro em pass')
            }

            if (pass !== values.confirm) {
                erros.errMessageConfirm = 'As passwords não coincidem.'
                console.log('erro em confirm')
            }

            return erros;

        })
        
    }

    function HandleUserInfo(values, InfoId) {
        HandleErr(values)
        if (InfoId === 'email') return setEmail(values.email)
        if (InfoId === 'password') return setPass(values.pass)
        if (InfoId === 'confirm') return setConfirm(values.confirm)

        if (validateEmail && checkPasswordStrength >= 3) {
            setUser()
        }
    }

    const [err, setErr] = useState({})
    const [email, setEmail] = useState('')
    
    const [pass, setPass] = useState('')
    const [confirm , setConfirm] = useState('')
    let navigate = useNavigate();
    const [user, setUser] = useState({email: email, pass:pass})
    console.log(email, pass, confirm, user)

    return (
        <div className={signstyles.App}>
          <header className={signstyles.Appheader}>
            
                  <img src={logo} className={signstyles.logo} alt="Little Red Reading Hood"  />
           
            <form className={signstyles.central} onSubmit={async e =>  {
            e.preventDefault();

            console.log(user)

            localStorage.setItem('user', 'user')
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password: pass, passwordConfirmation: confirm })
            })
            if(res.status===400){
                const json = await res.json()
               // console.log(json())
            }
            if (res.status === 200) {
                navigate("/game")
                //console.log('YES BABY')
            } 
        }}> {/* era uma div */}
  
                <p className={signstyles.titulo}>CRIAR CONTA</p>
  
                    <div className={signstyles.email}>
                      <p className={signstyles.SEmail}>EMAIL</p>
                      <input type="email" className={signstyles.iEmail} onChange={(e) => HandleUserInfo({email:e.target.value, pass:pass, confirm:confirm}, 'email')}/>
                      {err.errMessageMail ? <p className={signstyles.PassInvalida}>EMAIL INVALIDO</p> : <p></p>}
                    </div>
  
                  <div className={signstyles.password}>
                      <p className={signstyles.SPass}>PASSWORD</p>
                      <input type="password" className={signstyles.iPass} onChange={(e) => HandleUserInfo({email:email, pass: e.target.value, confirm: confirm}, 'password')}/>
                      {err.errMessagePass ? <p className={signstyles.PassInvalida}>PASSWORD INVALIDA</p> : <p></p>}
                  </div>
  
                  <div className={signstyles.password}>
                      <p className={signstyles.SPass}>CONFIRMAÇÃO DE PASSWORD</p>
                      <input type="password" className={signstyles.iPass} onChange={(e) => HandleUserInfo({email: email, pass: pass, confirm: e.target.value}, 'confirm')}/>
                      {err.errMessageConfirm ? <p className={signstyles.PassInvalida}>PASSWORD INVALIDA</p> : <p></p>}
                  </div>
              
                <button className={signstyles.letsPlay}>VAMOS JOGAR!!</button>
            </form>  {/* era uma div */}
    
    
            <div className={signstyles.PTEN}>
                <button className={signstyles.PT}>PT</button>
                <button className={signstyles.EN}>EN </button>
            </div>
            
          </header>
        </div>
      );
    
}

export function TitleScreen() {
    //const [title, setTitle] = useState(false)
    let navigate = useNavigate()
    // logo / imagem
    // nome
    //if (!title) {
       return (    
          <div className={styles.Appheader}>
            <div className={styles.logoinicial}>
            <div>
            <img src={logo} className={styles.Applogo} alt="Little Red Reading Hood"  />
            <h1 className={styles.titulo}>
            LITTLE RED READING HOOD
            </h1>
            </div>
             <button className={styles.bLogin} onClick={() => navigate('/api/login')}>
              LOGIN
            </button>
            <button className={styles.bSignup} onClick={() => navigate('/api/signup')  }>
              CRIAR CONTA
            </button>
            </div>
    
            <div className={styles.PTEN}>
            <button className={styles.PT}>
              PT
            </button>
    
            <button className={styles.EN}>
              EN
            </button>
    
            </div>
    
    
    
          </div>
      ); 
}

export function UserLogin(values, InfoId) {
    const [err, setErr] = useState({})
    const [email, setEmail] = useState('')
    // const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    let navigate = useNavigate();

    function HandleErr(values) {
        setErr( e => {
            let erros = {}
            if (!validateEmail(values.email)) {
                erros.errMessageMail = 'O email inserido não é válido.'
                console.log('erro em mail')
            }

            if(checkPasswordStrength(values.pass) < 3) {
                erros.errMessagePass = 'A password inserida não é válida.'
                console.log('erro em pass')
            }

            if (pass !== values.confirm) {
                erros.errMessageConfirm = 'As passwords não coincidem.'
                console.log('erro em confirm')
            }

            return erros;

        })
        
    }

    function HandleUserInfo(values, InfoId) {
        HandleErr(values)
        if (InfoId === 'email') return setEmail(values.email)
        if (InfoId === 'password') return setPass(values.pass)
    }


    // if (InfoId === 'email') return setEmail(values.email)
    // if (InfoId === 'password') return setPass(values.pass)
          
    return (
          <div className={logstyles.App}>
            <header className={logstyles.Appheader}>
              
                    <img src={logo} className={logstyles.logo} alt="Little Red Reading Hood"  />
             
              <form className={logstyles.central} onSubmit={async e =>{
                  e.preventDefault();
                  //console.log('trying to log in')
                  const res = await fetch('/api/login', {
                      method: 'POST',
                      headers:{
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({ email, password:pass})
                  })
                  //console.log('got answer')
                  if(res.status===400){
                      const json = await res.json()
                     // console.log('fds again')
                  }
                  if(res.status===200){
                      console.log('YES BABYYY')
                      // const json = await res.json() 
                      // localstorage.setitem('token', json.token)
                      navigate('/game')
                  }
              }}> 

                    <p className={logstyles.titulo}>LOGIN</p>
                      <div className={logstyles.email}>
                        <p className={logstyles.SEmail}>EMAIL</p>
                        <input type="email" className={logstyles.iEmail} onChange={(e) => HandleUserInfo({email:e.target.value, pass: pass}, 'email')}/>
                        {/* <p className={logstyles.Invalida}>EMAIL INVÁLIDO</p> */}
                      </div>
    
                    <div className={logstyles.password}>
                        <p className={logstyles.SPass}>PASSWORD</p>
                        <input type="password" className={logstyles.iPass} onChange={(e) => HandleUserInfo({email:email, pass: e.target.value}, 'password')}/>
                        <p className={logstyles.forgot}><a href="ERROR 404, PAG NOT FOUND">ESQUECI-ME DA PASSWORD</a></p>
                        {(err.errMessageMail || err.errMessagePass) ? <p className={logstyles.Invalida}>EMAIL E/OU PASSWORD INVÁLIDA</p> : <p></p>}
                    </div>
    
                  <button className={logstyles.letsPlay}>VAMOS JOGAR!!</button>
                  <p className={logstyles.create}>NÃO TENS CONTA? <a href="ALGUMA CENA">CRIA UMA!</a></p>
                    
                    
                </form>
                    
      
              <div className={logstyles.PTEN}>
                  <button className={logstyles.PT}>PT</button>
                  <button className={logstyles.EN}>EN </button>
              </div>
              
            </header>
          </div>
        );
      
}


const story = [
    {
        id: 1,
        text: 'parte 1'
    },
    {
        id: 2,
        text: 'parte 2' 
    },
    {
        id: 3,
        text: 'parte 3'
    }

]