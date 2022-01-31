import React, {useState, useEffect} from 'react';
import { PlayerInventory, PlayerStats } from './GameComponents/playerUI';
import { PresentOptions, StoryRender } from './GameComponents/storyAndOptions';
import { BrowserRouter, useNavigate } from "react-router-dom";
import logo from './GameComponents/styles/SVG/logo.svg';
import UserLogoGrad from "./GameComponents/styles/SVG/UserLogoGrad.svg";
import maca from "./GameComponents/styles/SVG/maca.svg";
import spray from "./GameComponents/styles/SVG/spray.svg";
import flor from "./GameComponents/styles/SVG/flor.svg";
import machado from "./GameComponents/styles/SVG/machado.svg";
import Ouro from "./GameComponents/styles/SVG/Ouro.svg";
import Prata from "./GameComponents/styles/SVG/Prata.svg";
import Bronze from "./GameComponents/styles/SVG/Bronze.svg";
import styles from './GameComponents/styles/GameStyles.module.css';
import logstyles from './GameComponents/styles/login.module.css';
import signstyles from './GameComponents/styles/signup.module.css';
import gamestyles from './GameComponents/styles/game.module.css';
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

export function GameRender1() {
    const [renderdStory, setRenderdStory] = useState()
    const [renderdOptions, setRenderdOptions] = useState([])
    let navigate = useNavigate();
    function StoryRender(){
            return(
            <div className={gamestyles.readingarea}>
                    <p className={gamestyles.texto}> 
                        {renderdStory}       
                    </p>
                    
                </div> 
            )        
    }
 
    function PresentOptions(renderdOptions){
        return <div>
            {
                renderdOptions.map((e) => (
                <p>{e}</p>
                ))
            }   
            
        </div>
    }

    

    function ShowInv(){
        return (
            <div >
                <p className={gamestyles.Sinv}>INVENTÁRIO</p>            
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${maca})` }}></div> 
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${spray})` }}></div>
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${flor})` }}></div>
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${machado})` }}></div>
            </div>
        )
    }

    useEffect(() => {   // story
        fetch('/api/game').then(res => {
            if (res.ok){
                console.log()
                return res.json()
            }
        }).then(jsonRes => setRenderdStory(jsonRes[0].text))
    })

    useEffect(() => {   // options
        fetch('/api/game').then(res => {
            if (res.ok){
                console.log()
                return res.json()
            }
        }).then(jsonRes => setRenderdOptions(jsonRes[0].options))
    })

    

    return (
        <div className={gamestyles.App}>
          <header className={gamestyles.Appheader}>
    
            <div className={gamestyles.esquerda}>
                <div className={gamestyles.user}>
                    <img src={UserLogoGrad} className={gamestyles.userPic} alt="Id do Utilizador"/>
                    <p className={gamestyles.username}>USERNAME</p>
                </div>

                <div className={gamestyles.barra}>
                    <span className={gamestyles.pontuacao} style={{width: 100}}></span>
                </div>

                <div className={gamestyles.mostraRedo}>
                    2  {/* isto não está a aparecer como deve de ser */}
                </div>

                <div className={gamestyles.botanitosfuncoes}>
                    <a>
                        <button  className={gamestyles.inventario} alt="Inventário" ></button>
                        <button  className={gamestyles.inventario2} onClick={() => {
                            <ShowInv />
                            console.log('clicado')
                        }} alt="Inventário"></button>
                    </a>

                    <a>
                        <button className={gamestyles.score} alt="Pontuações"></button>
                        <button className={gamestyles.score2} alt="Pontuações"></button>
                    </a>

                    <a>
                        <button className={gamestyles.redo} alt="Voltar a trás"></button>
                        <button className={gamestyles.redo2} alt="Voltar a trás"></button>
    
                    </a>
                </div>
                <div className={gamestyles.mostraCesta}>
                    <p className={gamestyles.Sinv}>INVENTÁRIO</p>
                
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${maca})` }}></div> 
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${spray})` }}></div>
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${flor})` }}></div>
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${machado})` }}></div>
                </div> 
                <div className={gamestyles.mostraScore}>
                    <p className={gamestyles.Sconq}>CONQUISTAS</p>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Bronze})` }}></div>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Ouro})` }}></div>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Prata})` }}></div>
                </div>
                {/* <div className={gamestyles.mostraRedo}>
                    <p className={gamestyles.hipo}>2</p>
                    <p>HIPÓTESES PARA VOLTAR ATRÁS!</p>
                </div> */}
    
            </div>
    
            <div className={gamestyles.direita}>
                {/* <StoryRender/> */}
                <div className={gamestyles.readingarea}>
                    <p className={gamestyles.texto}> 
                    Era uma vez uma menina, que vivia numa pequena vila perto de uma floresta mágica. Era adorada por todos, mas principalmente pela sua avó. Certo dia, a avó ofereceu-lhe um capucho vermelho por ser tão doce e bondosa. A menina gostou tanto do presente que nunca mais o tirou e passou a ser chamada de Capuchinho Vermelho.<br></br>
                    Um belo dia, Capuchinho Vermelho acordou com uma sms da sua mãe, que lhe pedia que levasse a cesta que tinha preparado para casa de sua avó, que estava muito doente.<br></br>
                    Capuchinho Vermelho respondeu:       
                    </p>
                    <p className={gamestyles.texto}>- 1 .Bom dia mãe, como está a avozinha? Há mais alguma coisa para levar?</p>
                    <p className={gamestyles.texto}>- 2. Bom dia mãe, não vou levar isso, é muito longe, a velha que venha buscar.</p>
                    <p className={gamestyles.texto}>- 3. Viu a mensagem mas nem sequer se levantou.</p>
                    
                </div> 

                <div className={gamestyles.Opcoes}>
                    <button className={gamestyles.BotaoOpcoes} onClick={() => navigate('/api/game11')}>1</button>
                    <button className={gamestyles.BotaoOpcoes} onClick={() => navigate('/api/game12')}>2</button>
                    <button className={gamestyles.BotaoOpcoes} onClick={() => navigate('/api/game13')}>3</button>
                </div>
    
    
            </div>
    
          </header>
        </div>
      );

    // return (
    //     <div>
    //         <UiRender />
    //         <StoryRender />
    //         <PresentOptions options={story[0].options} />
    //     </div>
    //)
}

export function GameRender11() {
    const [renderdStory, setRenderdStory] = useState()
    const [renderdOptions, setRenderdOptions] = useState([])
    let navigate = useNavigate();
    function StoryRender(){
            return(
            <div className={gamestyles.readingarea}>
                    <p className={gamestyles.texto}> 
                        {renderdStory}       
                    </p>
                    
                </div> 
            )        
    }
 
    function PresentOptions(renderdOptions){
        return <div>
            {
                renderdOptions.map((e) => (
                <p>{e}</p>
                ))
            }   
            
        </div>
    }

    

    function ShowInv(){
        return (
            <div >
                <p className={gamestyles.Sinv}>INVENTÁRIO</p>            
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${maca})` }}></div> 
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${spray})` }}></div>
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${flor})` }}></div>
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${machado})` }}></div>
            </div>
        )
    }

    useEffect(() => {   // story
        fetch('/api/game').then(res => {
            if (res.ok){
                console.log()
                return res.json()
            }
        }).then(jsonRes => setRenderdStory(jsonRes[0].text))
    })

    useEffect(() => {   // options
        fetch('/api/game').then(res => {
            if (res.ok){
                console.log()
                return res.json()
            }
        }).then(jsonRes => setRenderdOptions(jsonRes[0].options))
    })

    

    return (
        <div className={gamestyles.App}>
          <header className={gamestyles.Appheader}>
    
            <div className={gamestyles.esquerda}>
                <div className={gamestyles.user}>
                    <img src={UserLogoGrad} className={gamestyles.userPic} alt="Id do Utilizador"/>
                    <p className={gamestyles.username}>USERNAME</p>
                </div>

                <div className={gamestyles.barra}>
                    <span className={gamestyles.pontuacao} style={{width: 100}}></span>
                </div>

                <div className={gamestyles.mostraRedo}>
                    2  {/* isto não está a aparecer como deve de ser */}
                </div>

                <div className={gamestyles.botanitosfuncoes}>
                    <a>
                        <button  className={gamestyles.inventario} alt="Inventário" ></button>
                        <button  className={gamestyles.inventario2} onClick={() => {
                            <ShowInv />
                            console.log('clicado')
                        }} alt="Inventário"></button>
                    </a>

                    <a>
                        <button className={gamestyles.score} alt="Pontuações"></button>
                        <button className={gamestyles.score2} alt="Pontuações"></button>
                    </a>

                    <a>
                        <button className={gamestyles.redo} alt="Voltar a trás"></button>
                        <button className={gamestyles.redo2} alt="Voltar a trás"></button>
    
                    </a>
                </div>
                <div className={gamestyles.mostraCesta}>
                    <p className={gamestyles.Sinv}>INVENTÁRIO</p>
                
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${maca})` }}></div> 
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${spray})` }}></div>
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${flor})` }}></div>
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${machado})` }}></div>
                </div> 
                <div className={gamestyles.mostraScore}>
                    <p className={gamestyles.Sconq}>CONQUISTAS</p>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Bronze})` }}></div>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Ouro})` }}></div>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Prata})` }}></div>
                </div>
                {/* <div className={gamestyles.mostraRedo}>
                    <p className={gamestyles.hipo}>2</p>
                    <p>HIPÓTESES PARA VOLTAR ATRÁS!</p>
                </div> */}
    
            </div>
    
            <div className={gamestyles.direita}>
                {/* <StoryRender/> */}
                <div className={gamestyles.readingarea}>
                    <p className={gamestyles.texto}> 
                        {/* {renderdStory} */}
                        A sua mãe disse-lhe:<b></b>
                        Ela está bem, só não está em condições de ir buscar a cesta, pois está de cama e seria ótimo ires lá cuidar dela.<br></br>
                        Capuchinho levantou-se, calçou os seus sapatinhos e chamou um Uber para a casa da sua avózinha. Quando o motorista chegou ela ficou muito surpreendida por este ser um lobo, de olhos grandes e de focinho vermelho. O lobo dirigiu-se ao Capuchinho e perguntou-lhe:<br></br>

                        -Bom dia minha senhora, Vai para onde?<br></br>

                        -Vou para o fim da vila. - Respondeu Capuchinho.<br></br>

                        Começaram a sua viagem e Capuchinho Vermelho logo pensou que aquele Uber não era grande coisa, nem lhe ofereceram uma garrafita de água. Mesmo assim, tudo corria bem e ela apreciava a paisagem enquanto ouvia Cardi B. De repente, ouviu-se um grande estrondo, o carro passou por buraco e o pneu furou, deixando os dois a pé, numa estrada vazia e sem rede. Enquanto esperaram que alguém passasse e os ajudasse o lobo começou a ficar com fome e perguntou:<br></br>

                        -Olhe, estamos aqui presos e a senhora está com uma cesta de comida na mão, não me quer dar alguma coisinha dessa cesta não?<br></br>

                        Capuchinho respondeu:<br></br>

                        - Mas é claro que não, isto é para a minha avozinha que está doente!!<br></br>

                        O lobo cheio de fome, vai na direção de Capuchinho e diz:<br></br>

                        -Tens que me dar algo para comer se não vou ter que ser agressivo.<br></br>

                        Capuchinho então....<br></br>
                    </p> 
                    <p className={gamestyles.texto}>- 1.Dá um soco na boca do lobo e corre em direção à floresta</p>                
                    <p className={gamestyles.texto}>- 2.se defende e bate no lobo</p>                
                    <p className={gamestyles.texto}>- 3.Simplesmente corre em direção à floresta.</p>                
                </div> 

                <div className={gamestyles.Opcoes}>
                    <button className={gamestyles.BotaoOpcoes} onClick={() => navigate('/api/game111')}>1</button>
                    <button className={gamestyles.BotaoOpcoes} onClick={() => navigate('/api/game112')}>2</button>
                    <button className={gamestyles.BotaoOpcoes} onClick={() => navigate('/api/game113')}>3</button>
                </div>
    
    
            </div>
    
          </header>
        </div>
      );

    // return (
    //     <div>
    //         <UiRender />
    //         <StoryRender />
    //         <PresentOptions options={story[0].options} />
    //     </div>
    //)
}
export function GameRender12() {
    const [renderdStory, setRenderdStory] = useState()
    const [renderdOptions, setRenderdOptions] = useState([])
    let navigate = useNavigate();
    function StoryRender(){
            return(
            <div className={gamestyles.readingarea}>
                    <p className={gamestyles.texto}> 
                        {renderdStory}       
                    </p>
                    
                </div> 
            )        
    }
 
    function PresentOptions(renderdOptions){
        return <div>
            {
                renderdOptions.map((e) => (
                <p>{e}</p>
                ))
            }   
            
        </div>
    }

    

    function ShowInv(){
        return (
            <div >
                <p className={gamestyles.Sinv}>INVENTÁRIO</p>            
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${maca})` }}></div> 
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${spray})` }}></div>
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${flor})` }}></div>
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${machado})` }}></div>
            </div>
        )
    }

    useEffect(() => {   // story
        fetch('/api/game').then(res => {
            if (res.ok){
                console.log()
                return res.json()
            }
        }).then(jsonRes => setRenderdStory(jsonRes[0].text))
    })

    useEffect(() => {   // options
        fetch('/api/game').then(res => {
            if (res.ok){
                console.log()
                return res.json()
            }
        }).then(jsonRes => setRenderdOptions(jsonRes[0].options))
    })

    

    return (
        <div className={gamestyles.App}>
          <header className={gamestyles.Appheader}>
    
            <div className={gamestyles.esquerda}>
                <div className={gamestyles.user}>
                    <img src={UserLogoGrad} className={gamestyles.userPic} alt="Id do Utilizador"/>
                    <p className={gamestyles.username}>USERNAME</p>
                </div>

                <div className={gamestyles.barra}>
                    <span className={gamestyles.pontuacao} style={{width: 100}}></span>
                </div>

                <div className={gamestyles.mostraRedo}>
                    2  {/* isto não está a aparecer como deve de ser */}
                </div>

                <div className={gamestyles.botanitosfuncoes}>
                    <a>
                        <button  className={gamestyles.inventario} alt="Inventário" ></button>
                        <button  className={gamestyles.inventario2} onClick={() => {
                            <ShowInv />
                            console.log('clicado')
                        }} alt="Inventário"></button>
                    </a>

                    <a>
                        <button className={gamestyles.score} alt="Pontuações"></button>
                        <button className={gamestyles.score2} alt="Pontuações"></button>
                    </a>

                    <a>
                        <button className={gamestyles.redo} alt="Voltar a trás"></button>
                        <button className={gamestyles.redo2} alt="Voltar a trás"></button>
    
                    </a>
                </div>
                <div className={gamestyles.mostraCesta}>
                    <p className={gamestyles.Sinv}>INVENTÁRIO</p>
                
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${maca})` }}></div> 
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${spray})` }}></div>
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${flor})` }}></div>
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${machado})` }}></div>
                </div> 
                <div className={gamestyles.mostraScore}>
                    <p className={gamestyles.Sconq}>CONQUISTAS</p>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Bronze})` }}></div>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Ouro})` }}></div>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Prata})` }}></div>
                </div>
                {/* <div className={gamestyles.mostraRedo}>
                    <p className={gamestyles.hipo}>2</p>
                    <p>HIPÓTESES PARA VOLTAR ATRÁS!</p>
                </div> */}
    
            </div>
    
            <div className={gamestyles.direita}>
                {/* <StoryRender/> */}
                <div className={gamestyles.readingarea}>
                    <p className={gamestyles.texto}> 
                        {/* {renderdStory} */}
                        - Estás maluca só pode!? Eu sou tua mãe, levanta esse rabo e põe-te a andar antes que vá aí dar-te na cabeça.<br></br>
                        Capuchinho levantou-se, calçou os seus sapatinhos e chamou um Uber para a casa da sua avózinha.<br></br>
                        Quando o motorista chegou ela ficou muito surpreendida por este ser um lobo, de olhos grandes e de focinho vermelho.
                        O lobo dirigiu-se ao Capuchinho e perguntou-lhe:<br></br>
                        -Bom dia minha senhora, Vai para onde?<br></br>
                        -Vou para o fim da vila. - Respondeu Capuchinho.<br></br>
                        Começaram a sua viagem e tudo corria bem, ela ia apreciando a paisagem enquanto ouvia Cardi B.<br></br>
                        De repente, ouviu-se um grande estrondo, o carro passou por buraco e o pneu furou, deixando os dois a pé, numa estrada vazia e sem rede. <br></br>
                        Enquanto esperaram que alguém passasse e os ajudasse o lobo começou a ficar com fome e perguntou:<br></br>
                        -Olhe, estamos aqui presos e a senhora está com uma cesta de comida na mão, não me quer dar alguma coisinha dessa cesta não?<br></br>
                        Capuchinho respondeu:<br></br>
                        - Mas é claro que não, isto é para a minha avozinha que está doente!!<br></br>
                        O lobo cheio de fome, vai na direção de Capuchinho e diz:<br></br>
                        -Tens que me dar algo para comer se não vou ter que ser agressivo.<br></br>
                        Capuchinho então:<br></br>
                    </p> 
                    <p className={gamestyles.texto}>- 1.Dá um soco na boca do lobo e corre em direção à floresta</p>                
                    <p className={gamestyles.texto}>- 2.se defende e bate no lobo</p>                
                    <p className={gamestyles.texto}>- 3.Simplesmente corre em direção à floresta.</p>                
                </div> 

                <div className={gamestyles.Opcoes}>
                    <button className={gamestyles.BotaoOpcoes} onClick={() => navigate('/api/game121')}>1</button>
                    <button className={gamestyles.BotaoOpcoes} onClick={() => navigate('/api/game122')}>2</button>
                    <button className={gamestyles.BotaoOpcoes} onClick={() => navigate('/api/game123')}>3</button>
                </div>
    
    
            </div>
    
          </header>
        </div>
      );

    // return (
    //     <div>
    //         <UiRender />
    //         <StoryRender />
    //         <PresentOptions options={story[0].options} />
    //     </div>
    //)
}
export function GameRender13() {
    const [renderdStory, setRenderdStory] = useState()
    const [renderdOptions, setRenderdOptions] = useState([])
    let navigate = useNavigate();
    function StoryRender(){
            return(
            <div className={gamestyles.readingarea}>
                    <p className={gamestyles.texto}> 
                        {renderdStory}       
                    </p>
                    
                </div> 
            )        
    }
 
    function PresentOptions(renderdOptions){
        return <div>
            {
                renderdOptions.map((e) => (
                <p>{e}</p>
                ))
            }   
            
        </div>
    }

    

    function ShowInv(){
        return (
            <div >
                <p className={gamestyles.Sinv}>INVENTÁRIO</p>            
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${maca})` }}></div> 
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${spray})` }}></div>
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${flor})` }}></div>
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${machado})` }}></div>
            </div>
        )
    }

    useEffect(() => {   // story
        fetch('/api/game').then(res => {
            if (res.ok){
                console.log()
                return res.json()
            }
        }).then(jsonRes => setRenderdStory(jsonRes[0].text))
    })

    useEffect(() => {   // options
        fetch('/api/game').then(res => {
            if (res.ok){
                console.log()
                return res.json()
            }
        }).then(jsonRes => setRenderdOptions(jsonRes[0].options))
    })

    

    return (
        <div className={gamestyles.App}>
          <header className={gamestyles.Appheader}>
    
            <div className={gamestyles.esquerda}>
                <div className={gamestyles.user}>
                    <img src={UserLogoGrad} className={gamestyles.userPic} alt="Id do Utilizador"/>
                    <p className={gamestyles.username}>USERNAME</p>
                </div>

                <div className={gamestyles.barra}>
                    <span className={gamestyles.pontuacao} style={{width: 100}}></span>
                </div>

                <div className={gamestyles.mostraRedo}>
                    2  {/* isto não está a aparecer como deve de ser */}
                </div>

                <div className={gamestyles.botanitosfuncoes}>
                    <a>
                        <button  className={gamestyles.inventario} alt="Inventário" ></button>
                        <button  className={gamestyles.inventario2} onClick={() => {
                            <ShowInv />
                            console.log('clicado')
                        }} alt="Inventário"></button>
                    </a>

                    <a>
                        <button className={gamestyles.score} alt="Pontuações"></button>
                        <button className={gamestyles.score2} alt="Pontuações"></button>
                    </a>

                    <a>
                        <button className={gamestyles.redo} alt="Voltar a trás"></button>
                        <button className={gamestyles.redo2} alt="Voltar a trás"></button>
    
                    </a>
                </div>
                <div className={gamestyles.mostraCesta}>
                    <p className={gamestyles.Sinv}>INVENTÁRIO</p>
                
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${maca})` }}></div> 
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${spray})` }}></div>
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${flor})` }}></div>
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${machado})` }}></div>
                </div> 
                <div className={gamestyles.mostraScore}>
                    <p className={gamestyles.Sconq}>CONQUISTAS</p>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Bronze})` }}></div>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Ouro})` }}></div>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Prata})` }}></div>
                </div>
                {/* <div className={gamestyles.mostraRedo}>
                    <p className={gamestyles.hipo}>2</p>
                    <p>HIPÓTESES PARA VOLTAR ATRÁS!</p>
                </div> */}
    
            </div>
    
            <div className={gamestyles.direita}>
                {/* <StoryRender/> */}
                <div className={gamestyles.readingarea}>
                    <p className={gamestyles.texto}> 
                        {/* {renderdStory} */}
                        - Olha sua preguiçosa já há mais de 2 horas que te mandei ir cuidar da tua avó. Se não te pões a andar vais apanhar uma porrada que vais ficar sem andar praí uns 4 dias. ́<br></br>
                        Capuchinho levantou-se, calçou os seus sapatinhos e chamou um Uber para a casa da sua avózinha.<br></br>
                        Quando o motorista chegou ela ficou muito surpreendida por este ser um lobo, de olhos grandes e de focinho vermelho.<br></br>
                        O lobo dirigiu-se ao Capuchinho e perguntou-lhe:<br></br>
                        -Bom dia minha senhora, Vai para onde?<br></br>
                        -Vou para o fim da vila. - Respondeu Capuchinho.<br></br>
                        Começaram a sua viagem e tudo corria bem, ela ia apreciando a paisagem enquanto ouvia Cardi B.<br></br>
                        De repente, ouviu-se um grande estrondo, o carro passou por buraco e o pneu furou, deixando os dois a pé, 
                        numa estrada vazia e sem rede. <br></br>
                        Enquanto esperaram que alguém passasse e os ajudasse o lobo começou a ficar com fome e perguntou:<br></br>
                        -Olhe, estamos aqui presos e a senhora está com uma cesta de comida na mão, não me quer dar alguma coisinha dessa cesta não?<br></br>
                        Capuchinho respondeu:<br></br>
                        - Mas é claro que não, isto é para a minha avozinha que está doente!!<br></br>
                        O lobo cheio de fome, vai na direção de Capuchinho e diz:<br></br>
                        -Tens que me dar algo para comer se não vou ter que ser agressivo.<br></br>
                        Capuchinho então:
                    </p> 
                    <p className={gamestyles.texto}>- 1.Dá um soco na boca do lobo e corre em direção à floresta</p>                
                    <p className={gamestyles.texto}>- 2.se defende e bate no lobo</p>                
                    <p className={gamestyles.texto}>- 3.Simplesmente corre em direção à floresta.</p>                
                </div> 

                <div className={gamestyles.Opcoes}>
                    <button className={gamestyles.BotaoOpcoes} onClick={() => navigate('/api/game131')}>1</button>
                    <button className={gamestyles.BotaoOpcoes} onClick={() => navigate('/api/game132')}>2</button>
                    <button className={gamestyles.BotaoOpcoes} onClick={() => navigate('/api/game133')}>3</button>
                </div>
    
    
            </div>
    
          </header>
        </div>
      );

    // return (
    //     <div>
    //         <UiRender />
    //         <StoryRender />
    //         <PresentOptions options={story[0].options} />
    //     </div>
    //)
}
export function GameRenderxx31() {
    const [renderdStory, setRenderdStory] = useState()
    const [renderdOptions, setRenderdOptions] = useState([])
    let navigate = useNavigate();
    function StoryRender(){
            return(
            <div className={gamestyles.readingarea}>
                    <p className={gamestyles.texto}> 
                        {renderdStory}       
                    </p>
                    
                </div> 
            )        
    }
 
    function PresentOptions(renderdOptions){
        return <div>
            {
                renderdOptions.map((e) => (
                <p>{e}</p>
                ))
            }   
            
        </div>
    }

    

    function ShowInv(){
        return (
            <div >
                <p className={gamestyles.Sinv}>INVENTÁRIO</p>            
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${maca})` }}></div> 
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${spray})` }}></div>
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${flor})` }}></div>
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${machado})` }}></div>
            </div>
        )
    }

    useEffect(() => {   // story
        fetch('/api/game').then(res => {
            if (res.ok){
                console.log()
                return res.json()
            }
        }).then(jsonRes => setRenderdStory(jsonRes[0].text))
    })

    useEffect(() => {   // options
        fetch('/api/game').then(res => {
            if (res.ok){
                console.log()
                return res.json()
            }
        }).then(jsonRes => setRenderdOptions(jsonRes[0].options))
    })

    

    return (
        <div className={gamestyles.App}>
          <header className={gamestyles.Appheader}>
    
            <div className={gamestyles.esquerda}>
                <div className={gamestyles.user}>
                    <img src={UserLogoGrad} className={gamestyles.userPic} alt="Id do Utilizador"/>
                    <p className={gamestyles.username}>USERNAME</p>
                </div>

                <div className={gamestyles.barra}>
                    <span className={gamestyles.pontuacao} style={{width: 100}}></span>
                </div>

                <div className={gamestyles.mostraRedo}>
                    2  {/* isto não está a aparecer como deve de ser */}
                </div>

                <div className={gamestyles.botanitosfuncoes}>
                    <a>
                        <button  className={gamestyles.inventario} alt="Inventário" ></button>
                        <button  className={gamestyles.inventario2} onClick={() => {
                            <ShowInv />
                            console.log('clicado')
                        }} alt="Inventário"></button>
                    </a>

                    <a>
                        <button className={gamestyles.score} alt="Pontuações"></button>
                        <button className={gamestyles.score2} alt="Pontuações"></button>
                    </a>

                    <a>
                        <button className={gamestyles.redo} alt="Voltar a trás"></button>
                        <button className={gamestyles.redo2} alt="Voltar a trás"></button>
    
                    </a>
                </div>
                <div className={gamestyles.mostraCesta}>
                    <p className={gamestyles.Sinv}>INVENTÁRIO</p>
                
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${maca})` }}></div> 
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${spray})` }}></div>
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${flor})` }}></div>
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${machado})` }}></div>
                </div> 
                <div className={gamestyles.mostraScore}>
                    <p className={gamestyles.Sconq}>CONQUISTAS</p>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Bronze})` }}></div>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Ouro})` }}></div>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Prata})` }}></div>
                </div>
                {/* <div className={gamestyles.mostraRedo}>
                    <p className={gamestyles.hipo}>2</p>
                    <p>HIPÓTESES PARA VOLTAR ATRÁS!</p>
                </div> */}
    
            </div>
    
            <div className={gamestyles.direita}>
                {/* <StoryRender/> */}
                <div className={gamestyles.readingarea}>
                    <p className={gamestyles.texto}> 
                        {/* {renderdStory} */}
                        Ao procurar por mais prendas, Capuchinho vai entrando cada vez mais dentro da floresta, até que encontra uma pequena vila de gnomos, com casas pequeninas e muito coloridas. Ela percebe que deve estar já muito longe do seu caminho, e decide perguntar por direções.<b></b>

                        -Olá, alguém me sabe dizer onde fica a estrada para o fim da vila principal? Eu estava a andar na floresta e acabei por me perder.<br></br>
                
                        De dentro de um café surge um gnomo barrigudo, com um nariz grande e com chapéu pontiagudo quase maior que ele, que lhe diz:<br></br>
                
                        -olá viajante, a estrada principal fica por ali (apontando para o outro lado da floresta)... mas pode ficar por aqui mais um pouco, vejo que está cansada e faminta.<br></br>
                
                        Capuchinho então:<br></br>
                    </p> 
                    <p className={gamestyles.texto}>-muito obrigado, mas tenho que continuar o meu caminho (voltando a história principal, e ganhando um item no inventário: presente de um gnomo)</p>                
                    <p className={gamestyles.texto}>-Pode ser, já estou com fome e já se bebia uma cervejinha fresquinha .</p>                 
                </div> 

                <div className={gamestyles.Opcoes}>
                    <button className={gamestyles.BotaoOpcoes} onClick={() => navigate('/api/game1311')}>1</button>
                    <button className={gamestyles.BotaoOpcoes} onClick={() => navigate('/api/game1312')}>2</button>
                </div>
    
    
            </div>
    
          </header>
        </div>
      );

    // return (
    //     <div>
    //         <UiRender />
    //         <StoryRender />
    //         <PresentOptions options={story[0].options} />
    //     </div>
    //)
}
export function GameRenderEndPre() {
    const [renderdStory, setRenderdStory] = useState()
    const [renderdOptions, setRenderdOptions] = useState([])
    let navigate = useNavigate();
    function StoryRender(){
            return(
            <div className={gamestyles.readingarea}>
                    <p className={gamestyles.texto}> 
                        {renderdStory}       
                    </p>
                    
                </div> 
            )        
    }
 
    function PresentOptions(renderdOptions){
        return <div>
            {
                renderdOptions.map((e) => (
                <p>{e}</p>
                ))
            }   
            
        </div>
    }

    

    function ShowInv(){
        return (
            <div >
                <p className={gamestyles.Sinv}>INVENTÁRIO</p>            
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${maca})` }}></div> 
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${spray})` }}></div>
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${flor})` }}></div>
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${machado})` }}></div>
            </div>
        )
    }

    useEffect(() => {   // story
        fetch('/api/game').then(res => {
            if (res.ok){
                console.log()
                return res.json()
            }
        }).then(jsonRes => setRenderdStory(jsonRes[0].text))
    })

    useEffect(() => {   // options
        fetch('/api/game').then(res => {
            if (res.ok){
                console.log()
                return res.json()
            }
        }).then(jsonRes => setRenderdOptions(jsonRes[0].options))
    })

    

    return (
        <div className={gamestyles.App}>
          <header className={gamestyles.Appheader}>
    
            <div className={gamestyles.esquerda}>
                <div className={gamestyles.user}>
                    <img src={UserLogoGrad} className={gamestyles.userPic} alt="Id do Utilizador"/>
                    <p className={gamestyles.username}>USERNAME</p>
                </div>

                <div className={gamestyles.barra}>
                    <span className={gamestyles.pontuacao} style={{width: 100}}></span>
                </div>

                <div className={gamestyles.mostraRedo}>
                    2  {/* isto não está a aparecer como deve de ser */}
                </div>

                <div className={gamestyles.botanitosfuncoes}>
                    <a>
                        <button  className={gamestyles.inventario} alt="Inventário" ></button>
                        <button  className={gamestyles.inventario2} onClick={() => {
                            <ShowInv />
                            console.log('clicado')
                        }} alt="Inventário"></button>
                    </a>

                    <a>
                        <button className={gamestyles.score} alt="Pontuações"></button>
                        <button className={gamestyles.score2} alt="Pontuações"></button>
                    </a>

                    <a>
                        <button className={gamestyles.redo} alt="Voltar a trás"></button>
                        <button className={gamestyles.redo2} alt="Voltar a trás"></button>
    
                    </a>
                </div>
                <div className={gamestyles.mostraCesta}>
                    <p className={gamestyles.Sinv}>INVENTÁRIO</p>
                
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${maca})` }}></div> 
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${spray})` }}></div>
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${flor})` }}></div>
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${machado})` }}></div>
                </div> 
                <div className={gamestyles.mostraScore}>
                    <p className={gamestyles.Sconq}>CONQUISTAS</p>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Bronze})` }}></div>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Ouro})` }}></div>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Prata})` }}></div>
                </div>
                {/* <div className={gamestyles.mostraRedo}>
                    <p className={gamestyles.hipo}>2</p>
                    <p>HIPÓTESES PARA VOLTAR ATRÁS!</p>
                </div> */}
    
            </div>
    
            <div className={gamestyles.direita}>
                {/* <StoryRender/> */}
                <div className={gamestyles.readingarea}>
                    <p className={gamestyles.texto}> 
                        {/* {renderdStory} */}
                        Ao chegar a casa da avó com a cesta vazia, Capuchinho depara-se com a inegavel decepção da avó.<bv></bv>
                        Podes-te considerar exilada da familia! Nem comida me consegue trazer... - disse a avó
                    </p> 
                              
                </div> 

                <div className={gamestyles.Opcoes}>
                    <button className={gamestyles.BotaoOpcoes} onClick={() => navigate('/api/game1')}>Fim do Jogo. Replay?</button>
                </div>
    
    
            </div>
    
          </header>
        </div>
      );

    // return (
    //     <div>
    //         <UiRender />
    //         <StoryRender />
    //         <PresentOptions options={story[0].options} />
    //     </div>
    //)
}
export function GameRenderEnd() {
    const [renderdStory, setRenderdStory] = useState()
    const [renderdOptions, setRenderdOptions] = useState([])
    let navigate = useNavigate();
    function StoryRender(){
            return(
            <div className={gamestyles.readingarea}>
                    <p className={gamestyles.texto}> 
                        {renderdStory}       
                    </p>
                    
                </div> 
            )        
    }
 
    function PresentOptions(renderdOptions){
        return <div>
            {
                renderdOptions.map((e) => (
                <p>{e}</p>
                ))
            }   
            
        </div>
    }

    

    function ShowInv(){
        return (
            <div >
                <p className={gamestyles.Sinv}>INVENTÁRIO</p>            
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${maca})` }}></div> 
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${spray})` }}></div>
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${flor})` }}></div>
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${machado})` }}></div>
            </div>
        )
    }

    useEffect(() => {   // story
        fetch('/api/game').then(res => {
            if (res.ok){
                console.log()
                return res.json()
            }
        }).then(jsonRes => setRenderdStory(jsonRes[0].text))
    })

    useEffect(() => {   // options
        fetch('/api/game').then(res => {
            if (res.ok){
                console.log()
                return res.json()
            }
        }).then(jsonRes => setRenderdOptions(jsonRes[0].options))
    })

    

    return (
        <div className={gamestyles.App}>
          <header className={gamestyles.Appheader}>
    
            <div className={gamestyles.esquerda}>
                <div className={gamestyles.user}>
                    <img src={UserLogoGrad} className={gamestyles.userPic} alt="Id do Utilizador"/>
                    <p className={gamestyles.username}>USERNAME</p>
                </div>

                <div className={gamestyles.barra}>
                    <span className={gamestyles.pontuacao} style={{width: 100}}></span>
                </div>

                <div className={gamestyles.mostraRedo}>
                    2  {/* isto não está a aparecer como deve de ser */}
                </div>

                <div className={gamestyles.botanitosfuncoes}>
                    <a>
                        <button  className={gamestyles.inventario} alt="Inventário" ></button>
                        <button  className={gamestyles.inventario2} onClick={() => {
                            <ShowInv />
                            console.log('clicado')
                        }} alt="Inventário"></button>
                    </a>

                    <a>
                        <button className={gamestyles.score} alt="Pontuações"></button>
                        <button className={gamestyles.score2} alt="Pontuações"></button>
                    </a>

                    <a>
                        <button className={gamestyles.redo} alt="Voltar a trás"></button>
                        <button className={gamestyles.redo2} alt="Voltar a trás"></button>
    
                    </a>
                </div>
                <div className={gamestyles.mostraCesta}>
                    <p className={gamestyles.Sinv}>INVENTÁRIO</p>
                
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${maca})` }}></div> 
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${spray})` }}></div>
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${flor})` }}></div>
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${machado})` }}></div>
                </div> 
                <div className={gamestyles.mostraScore}>
                    <p className={gamestyles.Sconq}>CONQUISTAS</p>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Bronze})` }}></div>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Ouro})` }}></div>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Prata})` }}></div>
                </div>
                {/* <div className={gamestyles.mostraRedo}>
                    <p className={gamestyles.hipo}>2</p>
                    <p>HIPÓTESES PARA VOLTAR ATRÁS!</p>
                </div> */}
    
            </div>
    
            <div className={gamestyles.direita}>
                {/* <StoryRender/> */}
                <div className={gamestyles.readingarea}>
                    <p className={gamestyles.texto}> 
                        {/* {renderdStory} */}
                        Capuchinho segue as indicações do gnomo e rapidamente chega à estrada principal, após caminhar algum tempo Capuchinho Vermelho começa a ver ao longe a casa da sua avó. Quando chega à porta vê que esta está aberta, entra e vai em direção ao quarto. <br></br>
                        Normalmente ela sentia-se muito feliz na casa de sua avózinha, mas naquele dia havia algo de estranho.<br></br>
                        – Avózinha, tens umas orelhas tão grandes! – exclamou Capuchinho Vermelho.<br></br>
                        – É para te ouvir melhor,minha netinha! – respondeu o lobo, disfarçando a voz.<br></br>
                        – Avózinha, tens uns olhos tão grandes!<br></br>             
                        – É para te ver melhor!<br></br>              
                        – Avozinha e que mãos  tão grandes!<br></br>              
                        – É para te abraçar melhor! – disse o lobo.<br></br>              
                        – Uau, avózinha, que boca tão grande! – exclamou a Capuchinho Vermelho.<br></br>
                        – É para te comer melhor!- gritou o lobo ao saltar da cama para fora e começou a perseguir o Capuchinho Vermelho pela floresta!<br></br>               
                        Ali perto andava o caçador que tinha ajudado Capuchinho, ele começou a ouvir uns gritos que lhe pareciam familiares, agarrou na sua arma e machado e foi ver o que estava a acontecer. Ao ver a menina a fugir do lobo, decidiu montar uma armadilha e gritou ao Capuchinho que corresse em direção a ele. O lobo percebe-se de tudo e esconde-se na floresta. De repente ataca o caçador, mas este consegue desviar-se e o lobo acaba por cair na armadilha.<br></br>                
                        Capuchinho disse:<br></br>
                        – Obrigada, muito obrigada por me ajudar a livrar deste lobo louco! Agora precisamos de descobrir onde está a minha avózinha!<br></br>
                        
                        O caçador prendeu o lobo numa jaula, obrigou-o a contar onde tinha escondido a senhora e ligou para a polícia da vila.<br></br>
                        
                        Capuchinho e o caçador encontraram a avozinha, que nem tinha dado conta de nada. Os três foram então comer o bolo e as frutas que a Capuchinho tinha levado para a avózinha, felizes em saber que o lobo não voltaria a ser um perigo.<br></br>
                        
                        Depois desse dia a Capuchinho decidiu nunca mais sair do seu caminho, ouvir com mais atenção o que a sua mãe tem a dizer e instalar o Cabify! <br></br>
                    </p> 
                              
                </div> 

                <div className={gamestyles.Opcoes}>
                    <button className={gamestyles.BotaoOpcoes} onClick={() => navigate('/api/game1')}>Fim do Jogo. Replay?</button>
                </div>
    
    
            </div>
    
          </header>
        </div>
      );

    // return (
    //     <div>
    //         <UiRender />
    //         <StoryRender />
    //         <PresentOptions options={story[0].options} />
    //     </div>
    //)
}
export function GameRenderxx3() {
    const [renderdStory, setRenderdStory] = useState()
    const [renderdOptions, setRenderdOptions] = useState([])
    let navigate = useNavigate();
    function StoryRender(){
            return(
            <div className={gamestyles.readingarea}>
                    <p className={gamestyles.texto}> 
                        {renderdStory}       
                    </p>
                    
                </div> 
            )        
    }
 
    function PresentOptions(renderdOptions){
        return <div>
            {
                renderdOptions.map((e) => (
                <p>{e}</p>
                ))
            }   
            
        </div>
    }

    

    function ShowInv(){
        return (
            <div >
                <p className={gamestyles.Sinv}>INVENTÁRIO</p>            
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${maca})` }}></div> 
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${spray})` }}></div>
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${flor})` }}></div>
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${machado})` }}></div>
            </div>
        )
    }

    useEffect(() => {   // story
        fetch('/api/game').then(res => {
            if (res.ok){
                console.log()
                return res.json()
            }
        }).then(jsonRes => setRenderdStory(jsonRes[0].text))
    })

    useEffect(() => {   // options
        fetch('/api/game').then(res => {
            if (res.ok){
                console.log()
                return res.json()
            }
        }).then(jsonRes => setRenderdOptions(jsonRes[0].options))
    })

    

    return (
        <div className={gamestyles.App}>
          <header className={gamestyles.Appheader}>
    
            <div className={gamestyles.esquerda}>
                <div className={gamestyles.user}>
                    <img src={UserLogoGrad} className={gamestyles.userPic} alt="Id do Utilizador"/>
                    <p className={gamestyles.username}>USERNAME</p>
                </div>

                <div className={gamestyles.barra}>
                    <span className={gamestyles.pontuacao} style={{width: 100}}></span>
                </div>

                <div className={gamestyles.mostraRedo}>
                    2  {/* isto não está a aparecer como deve de ser */}
                </div>

                <div className={gamestyles.botanitosfuncoes}>
                    <a>
                        <button  className={gamestyles.inventario} alt="Inventário" ></button>
                        <button  className={gamestyles.inventario2} onClick={() => {
                            <ShowInv />
                            console.log('clicado')
                        }} alt="Inventário"></button>
                    </a>

                    <a>
                        <button className={gamestyles.score} alt="Pontuações"></button>
                        <button className={gamestyles.score2} alt="Pontuações"></button>
                    </a>

                    <a>
                        <button className={gamestyles.redo} alt="Voltar a trás"></button>
                        <button className={gamestyles.redo2} alt="Voltar a trás"></button>
    
                    </a>
                </div>
                <div className={gamestyles.mostraCesta}>
                    <p className={gamestyles.Sinv}>INVENTÁRIO</p>
                
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${maca})` }}></div> 
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${spray})` }}></div>
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${flor})` }}></div>
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${machado})` }}></div>
                </div> 
                <div className={gamestyles.mostraScore}>
                    <p className={gamestyles.Sconq}>CONQUISTAS</p>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Bronze})` }}></div>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Ouro})` }}></div>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Prata})` }}></div>
                </div>
                {/* <div className={gamestyles.mostraRedo}>
                    <p className={gamestyles.hipo}>2</p>
                    <p>HIPÓTESES PARA VOLTAR ATRÁS!</p>
                </div> */}
    
            </div>
    
            <div className={gamestyles.direita}>
                {/* <StoryRender/> */}
                <div className={gamestyles.readingarea}>
                    <p className={gamestyles.texto}> 
                        {/* {renderdStory} */}
                        Após correr por algum tempo pela floresta e certificar-se que está longe do lobo, ela vê um homem ao longe, 
                        ao chegar mais perto percebe que é um caçador, então decide começar a gritar por ajuda e ele vem na sua direção.<br></br>
                        - Em que posso ajudar??<br></br>
                        Capuchinho desesperada diz-lhe:<br></br>
                        - Estou a fugir de um lobo maluco que quer a minha comida.<br></br>
                        O caçador pega no seu machado e vai atrás do lobo, mas quando chegam ao local onde ficaram presos, não há sinais do lobo nem do carro, 
                        Capuchinho percebe que o lobo foi embora e fica mais descansada, assim pode continuar a sua viagem até casa da avózinha.<br></br> 
                        Antes de partir, agradeçe ao caçador pela sua ajuda e ele diz-lhe:<br></br>
                        Têm cuidado com o caminho e com as pessoas que nele passam. Esta floresta é perigosa. Leva este spray pimenta, 
                        pode te ajudar caso te apareça outro anormal.<br></br>
                        E Capuchinho partiu a pé em direção a casa de sua avó.<br></br>
                        No carro, o lobo percebe que Capuchinho deixou o seu telemóvel no banco, então tem uma ideia brilhante, chegar primeiro a casa da avózinha, 
                        livrar-se da velha e conseguir a cesta de comida que tanto desejava.<br></br>
                        Quando chega a casa da avó de Capuchinho, começa a ouvir um barulho muito alto, rapidamente percebe que é o ressonar da senhora, que dorme profundamente.<br></br> 
                        Decide amarrá-la, escondê-la num armário na cave, para que os roncos não se ouçam, vestir as suas roupas e deitar-se na cama a ver Netflix
                        enquanto espera que a Capuchinho chegue.<br></br>
                        Enquanto isso, não muito longe Capuchinho caminha pela floresta, onde vê algumas coisas que pode levar à sua avozinha para a deixar mais feliz:<br></br>
                    </p> 
                    <p className={gamestyles.texto}>- 1. continuar a vasculhar pela floresta (grande chance de encontrar itens e um novo personagem)</p>                
                    <p className={gamestyles.texto}>- 2. seguir o caminho para casa da avó</p>                
                    <p className={gamestyles.texto}>- 3. comer o cesto de comida.</p>                
                </div> 

                <div className={gamestyles.Opcoes}>
                    <button className={gamestyles.BotaoOpcoes} onClick={() => navigate('/api/game1131')}>1</button>
                    <button className={gamestyles.BotaoOpcoes} onClick={() => navigate('/api/game1311')}>2</button>
                    <button className={gamestyles.BotaoOpcoes} onClick={() => navigate('/api/game1331')}>3</button>
                </div>
    
    
            </div>
    
          </header>
        </div>
      );

    // return (
    //     <div>
    //         <UiRender />
    //         <StoryRender />
    //         <PresentOptions options={story[0].options} />
    //     </div>
    //)
}
export function GameRenderOver1() {
    const [renderdStory, setRenderdStory] = useState()
    const [renderdOptions, setRenderdOptions] = useState([])
    let navigate = useNavigate();
    function StoryRender(){
            return(
            <div className={gamestyles.readingarea}>
                    <p className={gamestyles.texto}> 
                        {renderdStory}       
                    </p>
                    
                </div> 
            )        
    }
 
    function PresentOptions(renderdOptions){
        return <div>
            {
                renderdOptions.map((e) => (
                <p>{e}</p>
                ))
            }   
            
        </div>
    }

    

    function ShowInv(){
        return (
            <div >
                <p className={gamestyles.Sinv}>INVENTÁRIO</p>            
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${maca})` }}></div> 
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${spray})` }}></div>
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${flor})` }}></div>
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${machado})` }}></div>
            </div>
        )
    }

    useEffect(() => {   // story
        fetch('/api/game').then(res => {
            if (res.ok){
                console.log()
                return res.json()
            }
        }).then(jsonRes => setRenderdStory(jsonRes[0].text))
    })

    useEffect(() => {   // options
        fetch('/api/game').then(res => {
            if (res.ok){
                console.log()
                return res.json()
            }
        }).then(jsonRes => setRenderdOptions(jsonRes[0].options))
    })

    

    return (
        <div className={gamestyles.App}>
          <header className={gamestyles.Appheader}>
    
            <div className={gamestyles.esquerda}>
                <div className={gamestyles.user}>
                    <img src={UserLogoGrad} className={gamestyles.userPic} alt="Id do Utilizador"/>
                    <p className={gamestyles.username}>USERNAME</p>
                </div>

                <div className={gamestyles.barra}>
                    <span className={gamestyles.pontuacao} style={{width: 100}}></span>
                </div>

                <div className={gamestyles.mostraRedo}>
                    2  {/* isto não está a aparecer como deve de ser */}
                </div>

                <div className={gamestyles.botanitosfuncoes}>
                    <a>
                        <button  className={gamestyles.inventario} alt="Inventário" ></button>
                        <button  className={gamestyles.inventario2} onClick={() => {
                            <ShowInv />
                            console.log('clicado')
                        }} alt="Inventário"></button>
                    </a>

                    <a>
                        <button className={gamestyles.score} alt="Pontuações"></button>
                        <button className={gamestyles.score2} alt="Pontuações"></button>
                    </a>

                    <a>
                        <button className={gamestyles.redo} alt="Voltar a trás"></button>
                        <button className={gamestyles.redo2} alt="Voltar a trás"></button>
    
                    </a>
                </div>
                <div className={gamestyles.mostraCesta}>
                    <p className={gamestyles.Sinv}>INVENTÁRIO</p>
                
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${maca})` }}></div> 
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${spray})` }}></div>
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${flor})` }}></div>
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${machado})` }}></div>
                </div> 
                <div className={gamestyles.mostraScore}>
                    <p className={gamestyles.Sconq}>CONQUISTAS</p>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Bronze})` }}></div>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Ouro})` }}></div>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Prata})` }}></div>
                </div>
                {/* <div className={gamestyles.mostraRedo}>
                    <p className={gamestyles.hipo}>2</p>
                    <p>HIPÓTESES PARA VOLTAR ATRÁS!</p>
                </div> */}
    
            </div>
    
            <div className={gamestyles.direita}>
                {/* <StoryRender/> */}
                <div className={gamestyles.readingarea}>
                    <p className={gamestyles.texto}> 
                        {/* {renderdStory} */}
                        Ao ouvir as palavras do lobo, Capuchinho enche-se de força e dá um murro no focinho do lobo, que fica vermelho de raiva. <b></b>
                        Cheia de medo, a menina começa a fugir para dentro da floresta mas o lobo vai atrás dela. <b></b>
                        A perseguição decorre já algum tempo quando Capuchinho começa a ficar desesperada, e decide ir para as profundezas da floresta na esperança de se esconder e despistar o lobo.<b></b> 
                        Encontra uma espécie de gruta escura, cuja entrada está tapada por alguns arbustos e decide esconder-se lá.<b></b>
                        Se ficar quieta e calada, ele não me descobre - pensou ela.<b></b>
                        Mas o lobo estava furioso e determinado a comer o que havia naquela cesta.<b></b>
                        Após algum tempo consegue encontrá-la, mas a sua raiva era tanta que acaba por matar Capuchinho.<b></b>
                        Passado alguns dias ninguém sabia nada de Capuchinho e toda a vila andava á sua procura, é então que um caçador a encontra.<b></b> 
                        Desde esse dia, o Caçador, furioso e abalado com a imagem da menina sem vida, vagueia pela floresta à procura do lobo, para se vingar do que foi feito ao Capuchinho Vermelho.<b></b>
                    </p> 
                                   
                </div> 

                <div className={gamestyles.Opcoes}>
                    <button className={gamestyles.BotaoOpcoes} onClick={() => navigate('/api/game1')}>Game Over. Retry?</button>
                </div>
    
    
            </div>
    
          </header>
        </div>
      );

    // return (
    //     <div>
    //         <UiRender />
    //         <StoryRender />
    //         <PresentOptions options={story[0].options} />
    //     </div>
    //)
}
export function GameRenderOver2() {
    const [renderdStory, setRenderdStory] = useState()
    const [renderdOptions, setRenderdOptions] = useState([])
    let navigate = useNavigate();
    function StoryRender(){
            return(
            <div className={gamestyles.readingarea}>
                    <p className={gamestyles.texto}> 
                        {renderdStory}       
                    </p>
                    
                </div> 
            )        
    }
 
    function PresentOptions(renderdOptions){
        return <div>
            {
                renderdOptions.map((e) => (
                <p>{e}</p>
                ))
            }   
            
        </div>
    }

    

    function ShowInv(){
        return (
            <div >
                <p className={gamestyles.Sinv}>INVENTÁRIO</p>            
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${maca})` }}></div> 
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${spray})` }}></div>
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${flor})` }}></div>
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${machado})` }}></div>
            </div>
        )
    }

    useEffect(() => {   // story
        fetch('/api/game').then(res => {
            if (res.ok){
                console.log()
                return res.json()
            }
        }).then(jsonRes => setRenderdStory(jsonRes[0].text))
    })

    useEffect(() => {   // options
        fetch('/api/game').then(res => {
            if (res.ok){
                console.log()
                return res.json()
            }
        }).then(jsonRes => setRenderdOptions(jsonRes[0].options))
    })

    

    return (
        <div className={gamestyles.App}>
          <header className={gamestyles.Appheader}>
    
            <div className={gamestyles.esquerda}>
                <div className={gamestyles.user}>
                    <img src={UserLogoGrad} className={gamestyles.userPic} alt="Id do Utilizador"/>
                    <p className={gamestyles.username}>USERNAME</p>
                </div>

                <div className={gamestyles.barra}>
                    <span className={gamestyles.pontuacao} style={{width: 100}}></span>
                </div>

                <div className={gamestyles.mostraRedo}>
                    2  {/* isto não está a aparecer como deve de ser */}
                </div>

                <div className={gamestyles.botanitosfuncoes}>
                    <a>
                        <button  className={gamestyles.inventario} alt="Inventário" ></button>
                        <button  className={gamestyles.inventario2} onClick={() => {
                            <ShowInv />
                            console.log('clicado')
                        }} alt="Inventário"></button>
                    </a>

                    <a>
                        <button className={gamestyles.score} alt="Pontuações"></button>
                        <button className={gamestyles.score2} alt="Pontuações"></button>
                    </a>

                    <a>
                        <button className={gamestyles.redo} alt="Voltar a trás"></button>
                        <button className={gamestyles.redo2} alt="Voltar a trás"></button>
    
                    </a>
                </div>
                <div className={gamestyles.mostraCesta}>
                    <p className={gamestyles.Sinv}>INVENTÁRIO</p>
                
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${maca})` }}></div> 
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${spray})` }}></div>
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${flor})` }}></div>
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${machado})` }}></div>
                </div> 
                <div className={gamestyles.mostraScore}>
                    <p className={gamestyles.Sconq}>CONQUISTAS</p>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Bronze})` }}></div>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Ouro})` }}></div>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Prata})` }}></div>
                </div>
                {/* <div className={gamestyles.mostraRedo}>
                    <p className={gamestyles.hipo}>2</p>
                    <p>HIPÓTESES PARA VOLTAR ATRÁS!</p>
                </div> */}
    
            </div>
    
            <div className={gamestyles.direita}>
                {/* <StoryRender/> */}
                <div className={gamestyles.readingarea}>
                    <p className={gamestyles.texto}> 
                        {/* {renderdStory} */}
                        Ao procurar por mais prendas, Capuchinho vai entrando cada vez mais dentro da floresta, até que encontra uma pequena vila de gnomos, com casas pequeninas e muito coloridas. Ela percebe que deve estar já muito longe do seu caminho, e decide perguntar por direções.<br></br>

                        -Olá, alguém me sabe dizer onde fica a estrada para o fim da vila principal? Eu estava a andar na floresta e acabei por me perder.<br></br>
                        
                        De dentro de um café surge um gnomo barrigudo, com um nariz grande e com chapéu pontiagudo quase maior que ele, que lhe diz:<br></br>
                        
                        -olá viajante, a estrada principal fica por ali (apontando para o outro lado da floresta)... mas pode ficar por aqui mais um pouco, vejo que está cansada e faminta.<br></br>
                        
                        Capuchinho então:
                        
                        Opções
                        
                        -muito obrigado, mas tenho que continuar o meu caminho (voltando a história principal, e ganhando um item no inventário: presente de um gnomo)
                        
                        -Pode ser, já estou com fome e já se bebia uma cervejinha fresquinha .
                        
                        Ao entrar no café, onde as mesas e as cadeiras são cogumelos gigantes, dão-lhe alguns tremoços e amendoins e a tão desejada cervejinha e passado pouco tempo começa a sentir-se muito cansada e com muito sono, percebe que está a ser dopada mas entretanto adormece.
                        
                        Quando acorda, Capuchinho está assustada sem saber onde está, mas olha em volta e percebe que está numa estrada muito parecida àquela para onde ela queria ir, e fica mais calma, pois pode partir em direção ao seu destino. Mas quando olha em volta percebe que já não tem o seu cesto, nem as suas novas Adidas. A pé e descalça e sem comida decide pôr-se a caminho.Após algumas horas, Capuchinho acaba por morrer de tanto andar e por não ter nenhuma comida.
                
                    </p> 
                                   
                </div> 

                <div className={gamestyles.Opcoes}>
                    <button className={gamestyles.BotaoOpcoes} onClick={() => navigate('/api/game1')}>Game Over. Retry?</button>
                </div>
    
    
            </div>
    
          </header>
        </div>
      );

    // return (
    //     <div>
    //         <UiRender />
    //         <StoryRender />
    //         <PresentOptions options={story[0].options} />
    //     </div>
    //)
}
export function GameRenderOver3() {
    const [renderdStory, setRenderdStory] = useState()
    const [renderdOptions, setRenderdOptions] = useState([])
    let navigate = useNavigate();
    function StoryRender(){
            return(
            <div className={gamestyles.readingarea}>
                    <p className={gamestyles.texto}> 
                        {renderdStory}       
                    </p>
                    
                </div> 
            )        
    }
 
    function PresentOptions(renderdOptions){
        return <div>
            {
                renderdOptions.map((e) => (
                <p>{e}</p>
                ))
            }   
            
        </div>
    }

    

    function ShowInv(){
        return (
            <div >
                <p className={gamestyles.Sinv}>INVENTÁRIO</p>            
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${maca})` }}></div> 
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${spray})` }}></div>
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${flor})` }}></div>
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${machado})` }}></div>
            </div>
        )
    }

    useEffect(() => {   // story
        fetch('/api/game').then(res => {
            if (res.ok){
                console.log()
                return res.json()
            }
        }).then(jsonRes => setRenderdStory(jsonRes[0].text))
    })

    useEffect(() => {   // options
        fetch('/api/game').then(res => {
            if (res.ok){
                console.log()
                return res.json()
            }
        }).then(jsonRes => setRenderdOptions(jsonRes[0].options))
    })

    

    return (
        <div className={gamestyles.App}>
          <header className={gamestyles.Appheader}>
    
            <div className={gamestyles.esquerda}>
                <div className={gamestyles.user}>
                    <img src={UserLogoGrad} className={gamestyles.userPic} alt="Id do Utilizador"/>
                    <p className={gamestyles.username}>USERNAME</p>
                </div>

                <div className={gamestyles.barra}>
                    <span className={gamestyles.pontuacao} style={{width: 100}}></span>
                </div>

                <div className={gamestyles.mostraRedo}>
                    2  {/* isto não está a aparecer como deve de ser */}
                </div>

                <div className={gamestyles.botanitosfuncoes}>
                    <a>
                        <button  className={gamestyles.inventario} alt="Inventário" ></button>
                        <button  className={gamestyles.inventario2} onClick={() => {
                            <ShowInv />
                            console.log('clicado')
                        }} alt="Inventário"></button>
                    </a>

                    <a>
                        <button className={gamestyles.score} alt="Pontuações"></button>
                        <button className={gamestyles.score2} alt="Pontuações"></button>
                    </a>

                    <a>
                        <button className={gamestyles.redo} alt="Voltar a trás"></button>
                        <button className={gamestyles.redo2} alt="Voltar a trás"></button>
    
                    </a>
                </div>
                <div className={gamestyles.mostraCesta}>
                    <p className={gamestyles.Sinv}>INVENTÁRIO</p>
                
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${maca})` }}></div> 
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${spray})` }}></div>
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${flor})` }}></div>
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${machado})` }}></div>
                </div> 
                <div className={gamestyles.mostraScore}>
                    <p className={gamestyles.Sconq}>CONQUISTAS</p>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Bronze})` }}></div>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Ouro})` }}></div>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Prata})` }}></div>
                </div>
                {/* <div className={gamestyles.mostraRedo}>
                    <p className={gamestyles.hipo}>2</p>
                    <p>HIPÓTESES PARA VOLTAR ATRÁS!</p>
                </div> */}
    
            </div>
    
            <div className={gamestyles.direita}>
                {/* <StoryRender/> */}
                <div className={gamestyles.readingarea}>
                    <p className={gamestyles.texto}> 
                        {/* {renderdStory} */}
                        
                        Ao entrar no café, onde as mesas e as cadeiras são cogumelos gigantes, dão-lhe alguns tremoços e amendoins e a tão desejada cervejinha e passado pouco tempo começa a sentir-se muito cansada e com muito sono, percebe que está a ser dopada mas entretanto adormece.<br></br>
                        
                        Quando acorda, Capuchinho está assustada sem saber onde está, mas olha em volta e percebe que está numa estrada muito parecida àquela para onde ela queria ir, e fica mais calma, pois pode partir em direção ao seu destino. Mas quando olha em volta percebe que já não tem o seu cesto, nem as suas novas Adidas. A pé e descalça e sem comida decide pôr-se a caminho.Após algumas horas, Capuchinho acaba por morrer de tanto andar e por não ter nenhuma comida.<br></br>
                
                    </p> 
                                   
                </div> 

                <div className={gamestyles.Opcoes}>
                    <button className={gamestyles.BotaoOpcoes} onClick={() => navigate('/api/game1')}>Game Over. Retry?</button>
                </div>
    
    
            </div>
    
          </header>
        </div>
      );

    // return (
    //     <div>
    //         <UiRender />
    //         <StoryRender />
    //         <PresentOptions options={story[0].options} />
    //     </div>
    //)
}

export function GameRenderOverRun() {
    const [renderdStory, setRenderdStory] = useState()
    const [renderdOptions, setRenderdOptions] = useState([])
    let navigate = useNavigate();
    function StoryRender(){
            return(
            <div className={gamestyles.readingarea}>
                    <p className={gamestyles.texto}> 
                        {renderdStory}       
                    </p>
                    
                </div> 
            )        
    }
 
    function PresentOptions(renderdOptions){
        return <div>
            {
                renderdOptions.map((e) => (
                <p>{e}</p>
                ))
            }   
            
        </div>
    }

    

    function ShowInv(){
        return (
            <div >
                <p className={gamestyles.Sinv}>INVENTÁRIO</p>            
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${maca})` }}></div> 
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${spray})` }}></div>
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${flor})` }}></div>
                <div className={gamestyles.itens} style={{ backgroundImage: `url(${machado})` }}></div>
            </div>
        )
    }

    useEffect(() => {   // story
        fetch('/api/game').then(res => {
            if (res.ok){
                console.log()
                return res.json()
            }
        }).then(jsonRes => setRenderdStory(jsonRes[0].text))
    })

    useEffect(() => {   // options
        fetch('/api/game').then(res => {
            if (res.ok){
                console.log()
                return res.json()
            }
        }).then(jsonRes => setRenderdOptions(jsonRes[0].options))
    })

    

    return (
        <div className={gamestyles.App}>
          <header className={gamestyles.Appheader}>
    
            <div className={gamestyles.esquerda}>
                <div className={gamestyles.user}>
                    <img src={UserLogoGrad} className={gamestyles.userPic} alt="Id do Utilizador"/>
                    <p className={gamestyles.username}>USERNAME</p>
                </div>

                <div className={gamestyles.barra}>
                    <span className={gamestyles.pontuacao} style={{width: 100}}></span>
                </div>

                <div className={gamestyles.mostraRedo}>
                    2  {/* isto não está a aparecer como deve de ser */}
                </div>

                <div className={gamestyles.botanitosfuncoes}>
                    <a>
                        <button  className={gamestyles.inventario} alt="Inventário" ></button>
                        <button  className={gamestyles.inventario2} onClick={() => {
                            <ShowInv />
                            console.log('clicado')
                        }} alt="Inventário"></button>
                    </a>

                    <a>
                        <button className={gamestyles.score} alt="Pontuações"></button>
                        <button className={gamestyles.score2} alt="Pontuações"></button>
                    </a>

                    <a>
                        <button className={gamestyles.redo} alt="Voltar a trás"></button>
                        <button className={gamestyles.redo2} alt="Voltar a trás"></button>
    
                    </a>
                </div>
                <div className={gamestyles.mostraCesta}>
                    <p className={gamestyles.Sinv}>INVENTÁRIO</p>
                
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${maca})` }}></div> 
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${spray})` }}></div>
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${flor})` }}></div>
                    <div className={gamestyles.itens} style={{ backgroundImage: `url(${machado})` }}></div>
                </div> 
                <div className={gamestyles.mostraScore}>
                    <p className={gamestyles.Sconq}>CONQUISTAS</p>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Bronze})` }}></div>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Ouro})` }}></div>
                    <div className={gamestyles.trofeus} style={{ backgroundImage: `url(${Prata})` }}></div>
                </div>
                {/* <div className={gamestyles.mostraRedo}>
                    <p className={gamestyles.hipo}>2</p>
                    <p>HIPÓTESES PARA VOLTAR ATRÁS!</p>
                </div> */}
    
            </div>
    
            <div className={gamestyles.direita}>
                {/* <StoryRender/> */}
                <div className={gamestyles.readingarea}>
                    <p className={gamestyles.texto}> 
                        {/* {renderdStory} */}
                        Envergonhada porque já nao tem o cesta, Capuchinho decide fugir para sempre e nunca mais voltar.
                    </p> 
                                   
                </div> 

                <div className={gamestyles.Opcoes}>
                    <button className={gamestyles.BotaoOpcoes} onClick={() => navigate('/api/game1')}>Game Over. Retry?</button>
                </div>
    
    
            </div>
    
          </header>
        </div>
      );

    // return (
    //     <div>
    //         <UiRender />
    //         <StoryRender />
    //         <PresentOptions options={story[0].options} />
    //     </div>
    //)
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
                navigate("/api/game1")
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
                      navigate('/api/game1')
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


