import React, {useState} from 'react';
import { PlayerInventory, PlayerStats } from './GameComponents/playerUI';
import { PresentOptions, StoryRender } from './GameComponents/storyAndOptions';
import { BrowserRouter, useNavigate } from "react-router-dom";
import logo from './GameComponents/styles/logo.svg';
import styles from './GameComponents/styles/GameStyles.module.css';
import logstyles from './GameComponents/styles/login.module.css';
import signstyles from './GameComponents/styles/signup.module.css';

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
    .map(re => re.test(password))
    .reduce((score, t) => t ? score + 1 : score, 0)
    
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

    function HandleErr(values, InfoId) {
        setErr( e => {
            let erros = {}
            if (!validateEmail(values.email) && InfoId === 'email') {
                erros.errMessageMail = 'O email inserido não é válido.'
                console.log('erro em mail')
            }

            if((checkPasswordStrength(values.pass) < 3) && InfoId === 'password') {
                erros.errMessagePass = 'A password inserida não é válida.'
                console.log('erro em pass')
            }

            if ((pass !== values.confirm && InfoId === 'password')) {
                erros.errMessageConfirm = 'As passwords não coincidem.'
                console.log('erro em confirm')
            }

            return erros;

        })
        
    }

    function HandleUserInfo(values, InfoId) {
        HandleErr(values, InfoId)
        if (InfoId === 'email') return setEmail(values.email)
        if (InfoId === 'password') return setPass(values.pass)
        if (InfoId === 'confirm') return setConfirm(values.confirm)
    }

    const [err, setErr] = useState({})
    const [email, setEmail] = useState('')
    // const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [confirm , setConfirm] = useState('')
    let navigate = useNavigate();
    console.log(email,pass,confirm)
    console.log(err)

    // return (
    //     <form onSubmit={async e =>  {
    //         e.preventDefault();
    //         const res = await fetch('/api/signup', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ email, password: pass, passwordConfirmation: confirm })
    //         })
    //         if (res.status === 200) {
    //             navigate("/signup/username")
    //         } 
    //     }}>
    //         <input type='text' placeholder='Insira o seu email' onChange={(e) => HandleUserInfo({email:e.target.value, pass:pass, confirm:confirm}, 'email')}></input>
    //         {err.errMessageMail ? <p>{err.errMessageMail}</p> : <span></span>}

    //         <input type='password' placeholder='Insira a Password' onChange={(e) => HandleUserInfo({email:email, pass: e.target.value, confirm: confirm}, 'password')}></input>
    //         {err.errMessagePass ? <p>{err.errMessagePass}</p> : <span></span>}

    //         <input type='password' placeholder='Confira a Password' onChange={(e) => HandleUserInfo({email: email,pass:pass,confirm:e.target.value}, 'confirm')}></input>
    //         {err.errMessageConfirm ? <p>{err.errMessageConfirm}</p> : <span></span>}

    //         <input type='submit' ></input>
    //     </form>  
    // )

    return (
        <div className={signstyles.App}>
          <header className={signstyles.Appheader}>
            
                  <img src={logo} className={signstyles.logo} alt="Little Red Reading Hood"  />
           
            <form className={signstyles.central} onSubmit={async e =>  {
            e.preventDefault();
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password: pass, passwordConfirmation: confirm })
            })
            if (res.status === 200) {
                navigate("/signup/username")
            } 
        }}> {/* era uma div */}
  
                <p className={signstyles.titulo}>SIGN UP</p>
  
                    <div className={signstyles.email}>
                      <p className={signstyles.SEmail}>EMAIL</p>
                      <input type="email" className={signstyles.iEmail} onChange={(e) => HandleUserInfo({email:e.target.value, pass:pass, confirm:confirm}, 'email')}/>
                      {err.errMessageMail ? <p className={signstyles.PassInvalida}>EMAIL INVALIDO</p> : <p></p>}
                    </div>
  
                  <div className={signstyles.password}>
                      <p className={signstyles.SPass}>PASSWORD</p>
                      <input type="password" className={signstyles.iPass} onChange={(e) => HandleUserInfo({email:email, pass: e.target.value, confirm: confirm}, 'password')}/>
                      {err.errMessagePass ? <p className={signstyles.PassInvalida}>PASS INVALIDA</p> : <p></p>}
                  </div>
  
                  <div className={signstyles.password}>
                      <p className={signstyles.SPass}>CONFIRM PASSWORD</p>
                      <input type="password" className={signstyles.iPass} onChange={(e) => HandleUserInfo({email: email, pass: pass, confirm: e.target.value}, 'confirm')}/>
                      {err.errMessageConfirm ? <p className={signstyles.PassInvalida}>PASS INVALIDA</p> : <p></p>}
                  </div>
              
                <button className={signstyles.letsPlay}>LET'S PLAY!!</button>
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
             <button className={styles.bLogin} onClick={() => navigate('api/login')}>
              LOGIN
            </button>
            <button className={styles.bSignup} onClick={() => navigate('api/signup')  }>
              SIGN UP
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

export function UserLogin() {
        return (
          <div className={logstyles.App}>
            <header className={logstyles.Appheader}>
              
                    <img src={logo} className={logstyles.logo} alt="Little Red Reading Hood"  />
             
              <div className={logstyles.central}> 
                <p className={logstyles.titulo}>LOGIN</p>
                      <div className={logstyles.email}>
                        <p className={logstyles.SEmail}>EMAIL</p>
                        <input type="email" className={logstyles.iEmail}/>
                        <p className={logstyles.Invalida}>EMAIL INVALIDO</p>
                      </div>
    
                    <div className={logstyles.password}>
                        <p className={logstyles.SPass}>PASSWORD</p>
                        <input type="password" className={logstyles.iPass}/>
                        <p className={logstyles.Invalida}>PASS INVALIDA</p>
                        <p className={logstyles.forgot}><a href="ALGUMA CENA">FORGOT MY PASSWORD</a></p>
                    </div>
    
                  <button className={logstyles.letsPlay}>LET'S PLAY!!</button>
                  <p className={logstyles.create}>NO ACCOUNT? <a href="ALGUMA CENA">CREATE ONE</a></p>
                    
                </div>
                    
    
              
      
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
        text: 'parte 1',
        options: [{id: 3, text: '1'}, {id: 2, text: '2'},] 
    }
]
