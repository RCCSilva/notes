// Conteúdo do tópico Reentry. Todo fato vem de research/reentry/*.md. Os rótulos impressos do painel ficam como impressos.
export default {
  name: 'Painéis do Reentry (prova de conceito)',
  blurb: "PROVA DE CONCEITO: redesenhos interativos dos painéis da cabine do simulador espacial Reentry, feitos a partir dos seus manuais de voo e do manual Gemini da NASA. Por enquanto dois painéis: o painel de comunicações da Gemini e o painel esquerdo de chaves e disjuntores da Gemini. Uma lição básica também explica as órbitas, com um simulador de queimas.",
  lessons: {
    orbits: {"title": "Órbitas para iniciantes", "summary": "Prova de conceito: cair ao redor da Terra, apogeu e perigeu, e um simulador de queimas."},
    mercury: { title: "Mercury: a cápsula e seus painéis", summary: "Planejada: a cápsula Mercury e os painéis da sua cabine." },
    geminiComm: { title: 'Gemini: painel de comunicações', summary: 'Prova de conceito: um painel interativo. Toque nas chaves e veja o que o manual diz.' },
    geminiLeft: { title: "Gemini: painel esquerdo de chaves e disjuntores", summary: "Prova de conceito: 42 disjuntores e chaves de squib. Toque neles, veja o que a NASA documenta e o que ainda falta verificar." },
    apollo: { title: "Apollo: o módulo de comando", summary: "Planejada: o módulo de comando Apollo e os painéis da sua cabine." },
    orbitMath: { title: "Matemática orbital: as fórmulas por trás do simulador", summary: "Planejada: as fórmulas por trás do simulador de órbitas, explicadas passo a passo." },
  },
  panel: {
    names: { 'gemini-comm': 'Painel de comunicações da Gemini (nosso redesenho)' , 'gemini-left': "Painel esquerdo de chaves e disjuntores da Gemini (nosso redesenho)" },
    hint: 'Toque em um controle para movê-lo. Clique direito ou as setas do teclado voltam.',
    pickOne: 'Toque em um controle para ver sua posição e o que o manual diz sobre ele.',
    position: 'Posição',
    inGame: 'No jogo',
    unverified: 'Função ainda não verificada: o texto do manual que lemos não diz o que ela faz.',
  },
  rule: {
    switchV: 'Chave vertical: clique esquerdo sobe, clique direito desce.',
    switchH: 'Chave horizontal: clique esquerdo move para a esquerda, clique direito para a direita.',
    selector: 'Seletor: clique direito gira para a direita (sentido anti-horário), clique esquerdo para a esquerda (sentido horário).',
  },
  fn: {
    mode1: 'Escolhe o rádio. Coloque em HF (com HF select em RNTY) para usar o HF. O UHF é o rádio principal em órbita; o HF é necessário após a reentrada.',
    mode2: 'Escolhe o rádio. Coloque em HF (com HF select em RNTY) para usar o HF. O UHF é o rádio principal em órbita; o HF é necessário após a reentrada.',
    hfSel: 'Coloque em RNTY para escolher o rádio HF.',
    hfAnt: 'Estende ou recolhe a antena HF. Na inserção, coloque em EXT: a antena HF estende em um minuto. Depois coloque em OFF. Ela é recolhida antes da separação do adaptador, o que pode levar mais de um minuto.',
    sBand: 'Coloque em CMD na inserção.',
    cBand: 'Coloque em CMD na inserção.',
    tm: 'Coloque em R/T & ACQ antes da separação do adaptador.',
    antSel: 'Coloque em RNTY antes da separação do adaptador.',
  },
  presets: {
    prelaunch: "Ajustes de pré-lançamento",
    afterInsertion: "Após a inserção",
    tr256: "Em Tr-256",
    afterRetroFire: "Após o disparo retro e a separação",
    landing: "Squibs de pouso",
    insertion: 'Colocar as posições da inserção',
    useHf: 'Selecionar HF',
    beforeSeparation: 'Colocar antes da separação do adaptador',
  },
  status: {
      "nasa": "Documentado na NASA Vol II (nave real, GT-5 a GT-12).",
      "partial": "Documentado em parte: leia os detalhes abaixo.",
      "vol1": "Descrito só na NASA Vol 1, outra nave (GT-3, 4, 7): pode não valer para a Gemini do Reentry.",
      "inferred": "Inferido, não declarado: os manuais não dizem isso diretamente.",
      "unverified": "Nenhuma descrição encontrada nos manuais da NASA que consultamos."
  },
  left: {
    fn: {
      coaxCntl: "Em ON, deixa a chave ANT SEL do painel de comunicações funcionar. A ANT SEL controla a chave coaxial 1 e a energia do defasador da antena de banda C.",
      audio1: "Energia de reserva para o rádio de voz UHF número 1. Precisa estar em ON para esse rádio funcionar e para gravar voz em fita.",
      audio2: "Energia de reserva para o rádio de voz UHF número 2. Precisa estar em ON para esse rádio funcionar e para gravar voz em fita.",
      uhfRelay: "A descrição do keying diz que a energia da chave KEYING (VOX, PTT ou CONT INT/PTT) passa pela posição ON deste disjuntor. O texto do escaneamento está corrompido, então o identificamos pelo rótulo.",
      toneVox: "Precisa estar em ON, junto com AUDIO & UHF T/R 1 e 2, para gravar voz em fita com RECORD em CONT ou MOM.",
      hfTr: "Energia de reserva para o rádio HF. Fica em ON antes do lançamento.",
      antCntl: "Em ON, liga o quadriplexador à chave coaxial 5, deixando a antena curta UHF disponível.",
      electTimer: "CB8-15: Alimenta o temporizador eletrônico, que começa na decolagem e conta o tempo que falta até o retrofoguete (disparo dos retrofoguetes).",
      eventTimer: "CB8-14: Alimenta o temporizador de eventos, que começa na decolagem e conta o tempo desde a decolagem.",
      boostCutoff1: "CB3-8: Alimenta a chave de desligamento do propulsor e a de troca para a orientação secundária. Arma os dois circuitos.",
      boostCutoff2: "CB3-21: Reserva do BOOST CUTOFF 1: também alimenta a chave de desligamento do propulsor e o sinal de corte do motor do segundo estágio para o computador.",
      retroAuto: "CB4-1: Alimenta a chave ARM AUTO RETRO e o disparo em salva dos retrofoguetes em um aborto. Se não estiver fechado, o temporizador não dispara os retrofoguetes automaticamente.",
      retroMan: "CB4-2: Alimenta o disparo manual dos retrofoguetes e o disparo em salva com a alavanca de aborto.",
      tr256: "CB8-16: Deixa o sinal TR-256 acender três indicadores âmbar do painel principal: IND RETRO ATT, BTRY PWR e RCS.",
      ecsIndLts: "Nenhum texto o descreve. Um diagrama mostra um circuito “ECS IND LTS” que alimenta as linhas das chaves das bombas. Nosso palpite: a energia das quatro luzes indicadoras das bombas.",
      paraCntl: "Não é descrito para esta nave. No Vol 1 (GT-3, 4, 7) ele alimenta os indicadores de 40K e 10.6K pés, e precisa estar fechado, senão as chaves barostáticas não conseguem acendê-los.",
      seqLightsPwr: "CB6-1: Alimenta a chave BRIGHT-DIM das luzes de sequência.",
      seqLightsCntl: "CB1-13: Deixa o indicador BTRY PWR do painel principal acender em verde quando o relé de energia das baterias principais é acionado.",
      attIndRetro: "CB12-7: Alimenta o interruptor-indicador IND RETRO ATT e o relé de viés do retrofoguete, que é acionado ao pressionar JETT RETRO.",
      attIndLdg: "Suplemento do Vol II: fornece o sinal de perda de rastreamento (sensor de horizonte). O Vol 1 (GT-3, 4, 7) diz outra coisa: alimenta a chave de modo de controle de atitude. Os dois diferem (naves diferentes); para GT-5 em diante vale o suplemento.",
      boostInsCntl1: "CB3-1: Alimenta o barramento de squib usado pela alavanca de aborto e pelas etapas de separação do veículo de lançamento: soltar a carenagem e a tampa do sensor, separar a nave, estender antenas.",
      boostInsCntl2: "CB3-11: Reserva redundante do BOOST INSERT CNTL 1: a mesma energia de squib por um segundo barramento.",
      retroSeqCntl1: "CB4-3: Alimenta o barramento de squib da sequência dos retrofoguetes: os interruptores-indicadores SEP OAMS LINES, SEP ADAPT, SEP ELEC e JETT RETRO.",
      retroSeqCntl2: "CB4-28: Reserva redundante do RETRO SEQ CNTL 1: a mesma energia de squib por um segundo barramento.",
      landSeqCntl1: "Não é descrito para esta nave. No Vol 1 (GT-3, 4, 7) alimenta as chaves EMERG DROGUE, HI ALT DROGUE, PARA, PARA JETT e LDG ATT.",
      landSeqCntl2: "Não é descrito para esta nave. No Vol 1 (GT-3, 4, 7) é a reserva redundante do LANDING SEQ CNTL 1.",
      seqLightsTest: "AMBER acende todas as luzes de sequência âmbar (e todas as do painel anunciador). RED & GREEN acende todas as vermelhas ou verdes. A posição OFF do meio é só do Vol 1 (outra nave).",
      seqLightsBright: "BRIGHT ou DIM para todas as luzes de sequência.",
      boostInsertArm: "Arma os barramentos de squib do BOOST-INSERT. ARM antes do lançamento; SAFE após a separação do propulsor e a inserção.",
      retroPwrArm: "Arma os barramentos de squib dos retrofoguetes, que alimentam as chaves dos retrofoguetes e os disjuntores da sequência retro. ARM em Tr-256; SAFE após o retro e a separação do adaptador.",
      retroJettArm: "Arma o descarte da seção dos retrofoguetes. Vai para ARM depois do disparo dos retrofoguetes: “efetivamente um intertravamento para evitar o descarte acidental da seção retrógrada antes do disparo dos retrofoguetes” (tradução nossa).",
      landingArm: "Arma os barramentos de squib de pouso. ARM durante a reentrada, depois de desarmar os barramentos de squib dos retrofoguetes; SAFE após o pouso. Vol 1 (GT-3, 4, 7): em SAFE, os paraquedas não podem ser abertos nem descartados. Também fica em SAFE na inserção, para a antena chicote HF se estender.",
      retroSquib1: "Uma de quatro chaves que enviam a tensão que acende os quatro retrofoguetes. Em SAFE, essa tensão é retirada. ARM antes do lançamento (capacidade de aborto) e de novo em Tr-256.",
      retroSquib2: "Uma de quatro chaves que enviam a tensão que acende os quatro retrofoguetes. Em SAFE, essa tensão é retirada. ARM antes do lançamento (capacidade de aborto) e de novo em Tr-256.",
      retroSquib3: "Uma de quatro chaves que enviam a tensão que acende os quatro retrofoguetes. Em SAFE, essa tensão é retirada. ARM antes do lançamento (capacidade de aborto) e de novo em Tr-256.",
      retroSquib4: "Uma de quatro chaves que enviam a tensão que acende os quatro retrofoguetes. Em SAFE, essa tensão é retirada. ARM antes do lançamento (capacidade de aborto) e de novo em Tr-256.",
      whipHf: "Um dos três disjuntores WHIP ANTENNAS, ajustados antes do lançamento para que as peças de comunicação funcionem na ordem certa. O texto não diz qual faz o quê.",
      whipUhf: "Um dos três disjuntores WHIP ANTENNAS, ajustados antes do lançamento para que as peças de comunicação funcionem na ordem certa. O texto não diz qual faz o quê.",
      whipDiplex: "Um dos três disjuntores WHIP ANTENNAS, ajustados antes do lançamento para que as peças de comunicação funcionem na ordem certa. O texto não diz qual faz o quê.",
    },
  },
  orbit: {
    "perigee": "Perigeu",
    "apogee": "Apogeu",
    "period": "Período",
    "earth": "Terra",
    "nmi": "mn",
    "stretched": "Alturas esticadas ×{k}",
    "airLine": "O ar começa: {km} km (nossa linha)",
    "cannon": {
      "head": "Três tiros, três velocidades",
      "slow": "Lento demais: cai perto",
      "fast": "Mais rápido: cai mais longe",
      "orbit": "Rápido o bastante: continua errando a Terra",
      "label": "Animação: três balas de canhão disparadas de lado do alto de uma montanha. As duas mais lentas caem no chão. A mais rápida dá a volta na Terra.",
      "notToScale": "Sem escala"
    },
    "missions": {
      "ma6": "Mercury MA-6",
      "ma7": "Mercury MA-7",
      "g4": "Gemini IV",
      "g6a": "Gemini VI-A"
    },
    "apsides": {
      "head": "Escolha uma órbita real",
      "pick": "Órbitas reais",
      "point": "Ponto",
      "colAlt": "Altitude (km)",
      "colCenter": "Do centro da Terra (km)",
      "colSpeed": "Velocidade (km/s)",
      "calc": "Nosso cálculo a partir da órbita publicada (órbita ideal)",
      "period": "Período: {min} min (nosso cálculo).",
      "radius": "Raio da Terra usado: {r} km.",
      "printed": "Publicado pela NASA: {lo} × {hi} {unit} (perigeu × apogeu).",
      "label": "Desenho da órbita da {name}, com perigeu e apogeu marcados.",
      "yellow": "Amarelo: altitude"
    },
    "sim": {
      "head": "Simulador de queimas: escolha um ponto e empurre",
      "whereLabel": "Onde queimar",
      "atLow": "no ponto baixo (perigeu)",
      "atHigh": "no ponto alto (apogeu)",
      "atDeg": "a {deg}° do ponto baixo",
      "goLow": "Ponto baixo",
      "goHigh": "Ponto alto",
      "dirLabel": "Em que sentido",
      "prograde": "Acelerar (prógrado)",
      "retrograde": "Frear (retrógrado)",
      "dvLabel": "Tamanho do empurrão (delta-v)",
      "presets": "Queimas reais",
      "reset": "Reiniciar",
      "startOrbit": "Órbita inicial: {peri} × {apo} km (Mercury MA-7, NASA).",
      "before": "Antes",
      "after": "Depois",
      "opposite": "Altitude do lado oposto",
      "oppositeSide": "Lado oposto",
      "calc": "Nosso cálculo",
      "ideal": "Órbita ideal, queima instantânea, nosso cálculo com as fórmulas da NASA. Não é uma previsão de voo.",
      "label": "Desenho: a órbita antiga (tracejada) e a nova depois da queima (laranja), com o ponto da queima e o lado oposto marcados.",
      "noBurn": "Sem empurrão, sem mudança.",
      "escape": "Velocidade demais: isto já não é uma órbita ao redor da Terra.",
      "result": "{action}: {dv} m/s, {where}. Altitude no lado oposto: de {from} km para {to} km.",
      "actUp": "Acelerando",
      "actDown": "Freando",
      "inAir": "O ponto baixo fica a {alt} km: dentro do ar (nossa linha: {line} km), então este caminho termina em reentrada."
    },
    "presets": {
      "gemVIA": {
        "name": "Gemini VI-A: +4 m/s",
        "note": "Gemini VI-A, 15 de dezembro de 1965: de uma órbita de 161 × 259 km, +4 m/s no ponto baixo. NASA: o perigeu ficou igual e o apogeu subiu para 272 km. Nosso modelo: 272,7 km."
      },
      "gemXup": {
        "name": "Gemini X: +856 ft/s",
        "note": "Gemini X, motor do Agena: +856 ft/s (261 m/s) para a frente, de cerca de 206,9 × 208,9 mn. NASA: 208,6 × 750,5 mn. Nosso modelo: cerca de 207 × 751 mn. Supomos que foi no ponto baixo: a NASA não lista o ponto exato."
      },
      "gemXdown": {
        "name": "Gemini X: −886 ft/s",
        "note": "Gemini X, motor do Agena: 886 ft/s (270 m/s) para trás, «para baixar o apogeu», de 208,6 × 750,5 mn. NASA: 190,2 × 208,7 mn. Nosso modelo: cerca de 190,7 × 208,6 mn. Ponto da queima suposto no ponto baixo."
      }
    },
    "retro": {
      "chip0": "Em órbita",
      "chip1": "Queima de retro",
      "chip2": "Ponto baixo no ar",
      "cap0": "Nosso exemplo: a órbita da MA-7",
      "cap1": "Frear {dv} m/s no ponto alto",
      "cap2": "O ponto baixo desce para {peri} km",
      "label0": "Desenho: uma nave no ponto alto da órbita.",
      "label1": "Desenho: a nave aciona os foguetes contra o sentido do movimento, no ponto alto.",
      "label2": "Desenho: a nova órbita mergulha no anel tracejado de ar no ponto baixo.",
      "lowPoint": "Ponto baixo",
      "computed": "Nosso cálculo: neste exemplo ideal, {dv} m/s no ponto alto dão o ponto baixo que a Gemini IV teve depois da queima de retro (42,3 mn, 78 km). Não é um número da missão."
    },
    "catch": {
      "gap": "Distância: {deg}°",
      "periods": "Volta: {lo} min contra {hi} min",
      "low": "Órbita baixa ({km} km)",
      "high": "Órbita alta ({km} km)",
      "speeded": "tempo acelerado",
      "label": "Animação: duas naves em duas órbitas circulares. A da órbita baixa anda mais rápido e alcança a outra.",
      "note": "Nossas órbitas de exemplo e tempos de volta, calculados com a terceira lei de Kepler."
    }
  },
  slides: {
    orbitWhat: {
      "title": "Uma órbita é uma queda que nunca chega ao chão",
      "body": "Jogue algo de lado e cai. Jogue rápido o bastante e a Terra se curva enquanto ele cai: isso é uma órbita.",
      "note": "A imagem da NASA é o canhão de Newton: com velocidade suficiente, a bala «cai por completo ao redor da Terra». Em órbita baixa são cerca de 7,8 km/s, e uma volta leva cerca de 90 minutos (ESA).",
      "example": "Astronautas flutuam porque caem na mesma taxa que a nave, não porque a gravidade sumiu (NASA)."
    },
    orbitShape: {
      "title": "Apogeu e perigeu",
      "body": "Uma órbita costuma ser um oval, não um círculo. O ponto mais próximo da Terra é o perigeu, o mais distante é o apogeu.",
      "bullets": [
        "Altitude é a altura acima do chão.",
        "A conta da órbita usa a distância ao centro da Terra: altitude mais o raio da Terra.",
        "Você anda mais rápido no ponto mais próximo (as velocidades aqui são nosso cálculo)."
      ],
      "note": "Os documentos das missões dão a altitude acima da Terra. A Aurora 7 (MA-7, 1962) voou 86,87 × 144,06 milhas náuticas (NASA)."
    },
    orbitBurn: {
      "title": "Queime aqui, mude lá",
      "body": "Acelere ou freie em um ponto, e o lado oposto da órbita se move.",
      "bullets": [
        "Acelerar no ponto baixo: o ponto alto sobe.",
        "Frear no ponto alto: o ponto baixo desce."
      ],
      "note": "A NASA diz o mesmo. A Gemini VI-A acelerou só 4 m/s, e o apogeu subiu de 259 para 272 km.",
      "aside": {
        "title": "Experimente",
        "body": "Aperte uma queima real e depois afaste o ponto do ponto baixo ou do alto: os dois lados começam a mexer. A grande queima de retro da Gemini X também baixou os dois lados."
      },
      "insight": "Nossa redação: o «vetor velocidade» é a sua rapidez mais a direção para onde você vai. Prógrado é um empurrão a favor, retrógrado um empurrão contra. Os documentos da Gemini X da NASA dizem «posigrade» e «retrograde»."
    },
    orbitRetro: {
      "title": "Retrofoguete: afundar o ponto baixo",
      "body": "Para voltar para casa, freie com foguetes apontados para a frente. O ponto baixo afunda no ar, e o ar faz o resto.",
      "bullets": [
        "A Mercury tinha três retrofoguetes; dois bastavam para uma reentrada segura (NASA).",
        "A queima de retro da Gemini IV deixou o ponto baixo em 42,3 mn (78 km). NASA: para ficar em órbita, não desça abaixo de cerca de 150 km."
      ],
      "note": "A Mercury reentrava só com «frenagem por arrasto». Na MA-7 o retrofoguete disparou cerca de 3 segundos atrasado, e ela pousou várias centenas de milhas do previsto.",
      "insight": "Nossa simplificação: desenhamos o começo do ar a 120 km. A NASA não deu um número único no que lemos; a Gemini IV planejou começar a reentrada a 400.000 ft (cerca de 122 km). O tamanho da queima mostrado é nosso cálculo."
    },
    orbitCatch: {
      "title": "Para alcançar, desça",
      "body": "Uma órbita mais baixa é uma volta mais curta. Desça para ganhar terreno do alvo e depois suba ao encontro dele.",
      "note": "NASA: ganhar velocidade sobe a órbita e alonga a volta. A técnica certa é «descer para uma órbita mais baixa e portanto mais curta».",
      "example": "A Gemini VI-A voou mais baixo que a Gemini VII, então era mais rápida e foi ganhando devagar (NASA).",
      "aside": {
        "title": "A Gemini IV errou",
        "body": "Em junho de 1965 a tripulação apontou para o estágio de foguete já usado e acelerou. Não conseguiram se aproximar e gastaram quase metade do propelente."
      }
    },
    commPanel: {
      title: 'O painel de comunicações',
      body: 'No jogo Gemini, os rádios são controlados pelo painel central inferior.',
      note: 'Lemos os rótulos impressos a olho na imagem do manual, então pode haver erros. Onde o texto do manual não diz o que um controle faz, a leitura avisa.',
      insight: 'É um redesenho simplificado nosso, não a imagem do manual. As posições iniciais são arbitrárias.',
    },
    commOperate: {
      title: 'Como o jogo move um controle',
      body: 'O painel tem chaves (verticais ou horizontais) e seletores giratórios.',
      bullets: [
        'Chave vertical: clique esquerdo sobe, clique direito desce.',
        'Chave horizontal: clique esquerdo vai para a esquerda, clique direito para a direita.',
        'Seletor: clique direito gira para a direita, clique esquerdo para a esquerda.',
      ],
      insight: 'Aqui, um toque move o controle para a próxima posição; clique direito ou as setas do teclado voltam uma. É a nossa simplificação.',
    },
    commInsertion: {
      title: 'Na inserção',
      body: 'O manual dá três ajustes para a inserção.',
      bullets: [
        'HF ANT em EXT (um minuto para estender), depois OFF.',
        'S-BAND e C-BAND em CMD.',
      ],
      insight: 'O botão só coloca as chaves nas posições citadas. O “depois OFF” vem mais tarde: faça à mão.',
    },
    commHf: {
      title: 'HF e reentrada',
      body: 'O UHF é o rádio principal em órbita. O HF é necessário após a reentrada.',
      bullets: [
        'Para usar o HF: HF select em RNTY e MODE 1 ou 2 em HF.',
        'Antes da separação do adaptador: T/M CONTROL em R/T & ACQ e ANT SEL em RNTY.',
        'Antes, a antena HF é recolhida; isso pode levar mais de um minuto.',
      ],
      insight: 'Entendemos “HF select” como a chave HF e “T/M CONTROL” como a chave T/M. O texto do manual não aponta onde elas estão na imagem.',
    },
    leftPanel: {
      title: "O painel esquerdo de chaves e disjuntores",
      body: "O nome que a NASA dá ao painel no extremo esquerdo da cabine Gemini. Tem 42 controles em quatro fileiras.",
      bullets: [
        "Fileira 1, 11 disjuntores: em grande parte comunicações.",
        "Fileira 2, 12 disjuntores: temporizadores, corte do propulsor, retro e luzes de sequência.",
        "Fileira 3, 11 células: mais disjuntores e três chaves.",
        "Fileira 4, 8 chaves: armam e travam os squibs.",
      ],
      note: "NASA: “três fileiras de disjuntores e uma fileira de chaves” (tradução nossa). O desenho está marcado “S/C 8 & UP”. As páginas nos chips são páginas do PDF; as páginas impressas do manual também aparecem.",
      insight: "É o nosso redesenho plano, não a imagem em ângulo da NASA. Posicionar as três chaves da fileira 3 (SEQ LIGHTS TEST, BRIGHT / DIM, ATT IND) é a nossa leitura do desenho. Os disjuntores começam abertos (para baixo) de forma arbitrária. Toque em um controle para ver o quanto ele está documentado.",
    },
    leftTypes: {
      title: "Disjuntores e chaves de squib",
      body: "A fileira de baixo arma ou trava os barramentos de squib: ARM em cima, SAFE embaixo. Os disjuntores deixam a energia passar quando fechados (em cima).",
      bullets: [
        "31 disjuntores: fechado = em cima.",
        "8 chaves ARM / SAFE na fileira de baixo.",
        "As quatro RETRO ROCKET SQUIBS enviam a tensão que acende os retrofoguetes. Em SAFE ela é retirada.",
      ],
      note: "A NASA diz que a fileira de baixo tem oito chaves, mas o texto da sequência descreve sete: a LANDING é descrita em outro lugar.",
      insight: "No desenho da NASA, disjuntores e chaves são parecidos. CLOSED / OPEN é a nossa palavra, não um rótulo impresso.",
    },
    leftSquib: {
      title: "A sequência das chaves de squib",
      body: "Aperte um botão para definir uma etapa documentada e depois mude uma chave à mão.",
      bullets: [
        "Antes do lançamento: BOOST-INSERT e os quatro squibs em ARM; RETRO e LANDING em SAFE.",
        "Após a inserção: BOOST-INSERT em SAFE.",
        "Em Tr-256: RETRO PWR e os quatro squibs em ARM.",
        "Após o disparo dos retrofoguetes: RETRO JETT em ARM. Após a separação: RETRO PWR em SAFE.",
        "Durante a reentrada: LANDING em ARM.",
      ],
      note: "RETRO JETT é “efetivamente um intertravamento para evitar o descarte acidental da seção retrógrada antes do disparo dos retrofoguetes” (tradução nossa). O manual do jogo também coloca os quatro squibs em SAFE após a inserção; não achamos isso nas páginas da NASA.",
      insight: "Os botões são a nossa ordenação de ajustes documentados separadamente, não uma lista oficial. “Após a inserção” mistura uma etapa da NASA com uma do manual do jogo. O botão de pré-lançamento também fecha os disjuntores das fileiras 1 a 3, mas não mexe nas chaves da fileira 3.",
    },
    leftGaps: {
      title: "O que ainda não está documentado",
      body: "Algumas células não têm função documentada, ou só uma de outra nave. Elas estão destacadas.",
      bullets: [
        "Sem descrição: TV, IND LT TEST, ATT IND WITH FDI / W/O FDI.",
        "Só inferido: UHF RELAY, ECS IND LTS.",
        "Só no Vol 1 (outra nave): PARA CNTL, LANDING SEQ CNTL 1 e 2.",
        "Parcial: os três WHIP ANTENNAS, ATT IND CNTL LDG, SEQ LIGHTS TEST, LANDING.",
        "Um pequeno rótulo “CLK LT” acima da fileira 1 não é explicado.",
      ],
      note: "O Vol 1 e o Vol II usam números de disjuntor diferentes: o temporizador eletrônico é CB8-15 no Vol II e CB8-43 no Vol 1.",
      insight: "“Não documentado” quer dizer que não achamos, não que não faça nada: os escaneamentos têm ruído e uma menção pode ter passado. Toque em uma célula destacada para ver o status.",
    },
  },
};
