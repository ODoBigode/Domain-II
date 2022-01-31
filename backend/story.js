
// exports.holeStory = (req, res) => {
//     res.json({
//         story:[
//             {
//                 id: 1,
//                 text: 'Era uma vez uma menina, que vivia numa pequena vila perto de uma floresta mágica, era adorada por todos, mas principalmente pela sua avó. Certo dia, a avó ofereceu-lhe um capucho vermelho por ser tão doce e bondosa.\nA menina gostou tanto do presente que nunca mais o tirou e passou a ser chamada de Capuchinho Vermelho. Um belo dia, Capuchinho Vermelho acordou com uma sms da sua mãe, que lhe pedia que levasse a cesta que tinha preparado para casa de sua avó, que estava muito doente.\nCapuchinho Vermelho respondeu:\n\n\n\n- 1 .Bom dia mãe, como está a avozinha? Há mais alguma coisa para levar?\n- 2. Bom dia mãe, não vou levar isso, é muito longe, a velha que venha buscar.\n- 3. Viu a mensagem mas nem sequer se levantou.',
//                 options:['Bom dia mãe, como está a avozinha? Há mais alguma coisa para levar?','Bom dia mãe, não vou levar isso, é muito longe, a velha que venha buscar.','Viu a mensagem mas nem sequer se levantou.'] 
                
//             },
//             {
//                 id: 2,
//                 text: '',
//                 options:[] 
//             },
//             {
//                 id: 3,
//                 text: 'parte 3',
//                 options:[]
//             }

//         ]
//     })
// }

exports.holeStory = (req, res) => {
    res.json([
        {
            id:1,
            text:(`Era uma vez uma menina, que vivia numa pequena vila perto de uma floresta mágica, era adorada por todos, mas principalmente pela sua avó. Certo dia, a avó ofereceu-lhe um capucho vermelho por ser tão doce e bondosa.\nA menina gostou tanto do presente que nunca mais o tirou e passou a ser chamada de Capuchinho Vermelho. Um belo dia, Capuchinho Vermelho acordou com uma sms da sua mãe, que lhe pedia que levasse a cesta que tinha preparado para casa de sua avó, que estava muito doente. \nCapuchinho Vermelho respondeu:`),
            options:['- 1 .Bom dia mãe, como está a avozinha? Há mais alguma coisa para levar?','- 2. Bom dia mãe, não vou levar isso, é muito longe, a velha que venha buscar.','- 3. Viu a mensagem mas nem sequer se levantou.']

        },
        {
            id:2,
            text:'',
            options:[]
        },
        
    ])
}


