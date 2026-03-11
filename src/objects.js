// Each story has a -type- ("positive" / "negative") dynamic property
export const stories = [
  {
    story: "a",
    sentences: [
      {
        introductory: true,
        base: true,
        text: "Imagina que estás buscando un piso para alquilar. Hoy has quedado con un agente inmobiliario para visitar uno que está semiamueblado. Vas con la intención de fijarte en todos los detalles, porque más tarde tendrás que describírselo a tu pareja, con quien tienes pensado compartirlo. Llegas al barrio en el que está situado el piso y tomas notas de algunos detalles que consideras importantes.",
      },
      {
        base: false,
        text: "",
        options: {
          positive: "El polideportivo sí tiene piscina.",
          negative: "El polideportivo no tiene piscina.",
        },
        keyword1: "polideportivo",
        keyword2: "piscina",
        question: "¿Es el nosequé nosecuanto?",
      },
      {
        base: true,
        text: "Las farolas tienen un diseño sencillo.",
      },
      {
        base: false,
        text: "",
        options: {
          positive: "El ambulatorio sí tiene urgencias.",
          negative: "El ambulatorio no tiene urgencias.",
        },
        keyword1: "ambulatorio",
        keyword2: "urgencias",
        question: "¿Es el nosequé nosecuanto?",
      },
      {
        base: true,
        text: "Los colegios tienen jornada partida.",
      },
      {
        base: false,
        text: "",
        options: {
          positive: "El supermercado sí tiene pescadería.",
          negative: "El supermercado no tiene pescadería.",
        },
        keyword1: "supermercado",
        keyword2: "pescadería",
        question: "¿Es el nosequé nosecuanto?",
      },
      {
        base: true,
        text: "Las aceras son anchas y permiten caminar con comodidad.",
      },
      {
        base: false,
        text: "",
        options: {
          positive: "La plaza sí tiene fuentes.",
          negative: "La plaza no tiene fuentes.",
        },
        keyword1: "plaza",
        keyword2: "fuentes",
        question: "¿Es el nosequé nosecuanto?",
      },
      {
        base: true,
        text: "Hay bancos repartidos a lo largo de la calle principal.",
      },
      {
        base: false,
        text: "",
        options: {
          positive: "La cafetería sí tiene terraza.",
          negative: "La cafetería no tiene terraza.",
        },
        keyword1: "cafetería",
        keyword2: "terraza",
        question: "¿Es el nosequé nosecuanto?",
      },
      {
        introductory: true,
        base: true,
        text: "El agente inmobiliario te está esperando en la tienda de enfrente del edificio. Os saludáis y acordáis comenzar la visita examinando el edificio y sus instalaciones. El agente es una persona de unos treinta y tantos, con el pelo castaño y corto. Te va explicando cómo es la comunidad mientras vais visitando el edificio. Te gusta lo que vas viendo y vas anotando lo más relevante.",
      },
      {
        base: false,
        text: "",
        options: {
          positive: "El ascensor sí tiene cámaras.",
          negative: "El ascensor no tiene cámaras.",
        },
        keyword1: "ascensor",
        keyword2: "cámaras",
        question: "¿Es el nosequé nosecuanto?",
      },
      {
        base: true,
        text: "El portal está bien iluminado.",
      },
      {
        base: false,
        text: "",
        options: {
          positive: "El patio interior sí tiene macetas.",
          negative: "El patio interior no tiene macetas.",
        },
        keyword1: "patio",
        keyword2: "macetas",
        question: "¿Es el nosequé nosecuanto?",
      },
      {
        base: true,
        text: "El cuarto de basuras cierra a las diez de la noche.",
      },
      {
        base: false,
        text: "",
        options: {
          positive: "El trastero sí tiene ventana.",
          negative: "El trastero no tiene ventana.",
        },
        keyword1: "trastero",
        keyword2: "ventana",
        question: "¿Es el nosequé nosecuanto?",
      },
      {
        introductory: true,
        base: true,
        text: "Llegáis a la puerta del piso. El agente abre la puerta y te anima a examinarlo libremente. Al cruzar el umbral notas que las paredes están recién pintadas. El piso huele a limpio, con un ligero aroma a ambientador, y entra bastante luz desde el salón. Te tomas unos segundos para observar el espacio con calma, recorriendo las estancias con la mirada y comprobando varias cosas.",
      },
      {
        base: false,
        text: "",
        options: {
          positive: "La cama sí tiene sábanas.",
          negative: "La cama no tiene sábanas.",
        },
        keyword1: "cama",
        keyword2: "sábanas",
        question: "¿Es el nosequé nosecuanto?",
      },
      {
        base: true,
        text: "Las cortinas están sucias.",
      },
      {
        base: false,
        text: "",
        options: {
          positive: "El sofá sí tiene cojines.",
          negative: "El sofá no tiene cojines.",
        },
        keyword1: "sofá",
        keyword2: "cojines",
        question: "¿Es el nosequé nosecuanto?",
      },
      {
        base: true,
        text: "La televisión está colgada de la pared.",
      },
      {
        base: false,
        text: "",
        options: {
          positive: "La ducha sí tiene mampara.",
          negative: "La ducha no tiene mampara.",
        },
        keyword1: "ducha",
        keyword2: "mampara",
        question: "¿Es el nosequé nosecuanto?",
      },
      {
        base: true,
        text: "El microondas tiene huellas en la puerta.",
      },
      {
        base: false,
        text: "",
        options: {
          positive: "La entrada sí tiene paragüero.",
          negative: "La entrada no tiene paragüero.",
        },
        keyword1: "entrada",
        keyword2: "paragüero",
        question: "¿Es el nosequé nosecuanto?",
      },
      {
        introductory: true,
        base: true,
        text: "Cuando termináis el recorrido, sales al rellano con la sensación de tener suficientes detalles para contárselo todo a tu pareja. Te despides del agente y mientras sales del piso, repasas mentalmente la visita. Piensas en los aspectos que más te han llamado la atención y en aquellos detalles que pueden ser importante si finalmente decidís vivir allí.",
      },
    ],
  },
  {
    story: "b",
    sentences: [
      {
        introductory: true,
        base: true,
        text: "Imagina que empiezas tu turno de trabajo como cocinero en un restaurante. Es el comienzo del servicio de la tarde y llegas a la cocina con la intención de tenerlo todo bajo control desde el primer momento. La cocina está tranquila y todavía no han llegado los primeros pedidos. Revisas la zona de trabajo y te preparas mentalmente para la jornada que tienes por delante.",
      },
      {
        base: false,
        text: "",
        options: {
          positive: "La sartén sí tiene aceite.",
          negative: "La sartén no tiene aceite.",
        },
        keyword1: "sartén",
        keyword2: "aceite",
        question: "¿Es el nosequé nosecuanto?",
      },
      {
        base: true,
        text: "El fregadero tiene un tapón en el desagüe.",
      },
      {
        base: false,
        text: "",
        options: {
          positive: "El frigorífico sí tiene verduras.",
          negative: "El frigorífico no tiene verduras.",
        },
        keyword1: "frigorífico",
        keyword2: "verduras",
        question: "¿Es el nosequé nosecuanto?",
      },
      {
        base: true,
        text: "Los cubiertos están ordenados según su tamaño y función.",
      },
      {
        base: false,
        text: "",
        options: {
          positive: "La papelera sí tiene botellas.",
          negative: "La papelera no tiene botellas.",
        },
        keyword1: "papelera",
        keyword2: "botellas",
        question: "¿Es el nosequé nosecuanto?",
      },
      {
        base: true,
        text: "Los fogones están integrados en una encimera de acero.",
      },
      {
        base: false,
        text: "",
        options: {
          positive: "La cesta sí tiene pan.",
          negative: "La cesta no tiene pan.",
        },
        keyword1: "cesta",
        keyword2: "pan",
        question: "¿Es el nosequé nosecuanto?",
      },
      {
        introductory: true,
        base: true,
        text: "Después de terminar las comprobaciones en la cocina, sales un momento a la sala del restaurante para ver cómo está el ambiente. Todavía son las 12:30. La sala está tranquila y hay pocas personas. Las mesas están colocadas en filas, con espacio suficiente entre ellas para el paso. Observas el ambiente general del restaurante mientras un camarero termina de colocar las cartas sobre las mesas.",
      },
      {
        base: false,
        text: "",
        options: {
          positive: "La barra sí tiene copas.",
          negative: "La barra no tiene copas.",
        },
        keyword1: "barra",
        keyword2: "copas",
        question: "¿Es el nosequé nosecuanto?",
      },
      {
        base: true,
        text: "El datáfono tiene un lector de tarjetas en el lateral.",
      },
      {
        base: false,
        text: "",
        options: {
          positive: "El carro sí tiene jarras.",
          negative: "El carro no tiene jarras.",
        },
        keyword1: "carro",
        keyword2: "jarras",
        question: "¿Es el nosequé nosecuanto?",
      },
      {
        introductory: true,
        base: true,
        text: "Al cabo de unos minutos regresas a la cocina, donde ya han empezado a llegar las primeras comandas. Te ajustas tu delantal rojo antes de continuar. Sigues de cerca el ritmo de trabajo en la zona de preparación y observas a una de tus compañeras, que lleva solo una semana en el equipo, mientras organiza los pedidos en la zona de pase. Te fijas en cuáles están listos para salir.",
      },
      {
        base: false,
        text: "",
        options: {
          positive: "La ensalada sí tiene tomate.",
          negative: "La ensalada no tiene tomate.",
        },
        keyword1: "ensalada",
        keyword2: "tomate",
        question: "¿Es el nosequé nosecuanto?",
      },
      {
        base: true,
        text: "La tarta de zanahoria está recién hecha.",
      },
      {
        base: false,
        text: "",
        options: {
          positive: "La pizza sí tiene atún.",
          negative: "La pizza no tiene atún.",
        },
        keyword1: "pizza",
        keyword2: "atún",
        question: "¿Es el nosequé nosecuanto?",
      },
      {
        base: true,
        text: "La paella está servida en platos hondos.",
      },
      {
        base: false,
        text: "",
        options: {
          positive: "La sopa sí tiene fideos.",
          negative: "La sopa no tiene fideos.",
        },
        keyword1: "sopa",
        keyword2: "fideos",
        question: "¿Es el nosequé nosecuanto?",
      },
      {
        base: true,
        text: "La pasta necesita más tiempo de cocción.",
      },
      {
        base: false,
        text: "",
        options: {
          positive: "La hamburguesa sí tiene mayonesa.",
          negative: "La hamburguesa no tiene mayonesa.",
        },
        keyword1: "hamburguesa",
        keyword2: "mayonesa",
        question: "¿Es el nosequé nosecuanto?",
      },
      {
        introductory: true,
        base: true,
        text: "Cuando el servicio termina, comienzas a recoger tu puesto y a dejar todo en orden antes de marcharte. Ha sido un buen servicio y tienes la sensación de haber hecho un buen trabajo. Te diriges a la sala de los empleados para cambiarte y recoger tus cosas. Es una habitación pequeña y compartida con el resto del personal. Allí revisas algunos detalles antes de salir del restaurante.",
      },
      {
        base: false,
        text: "",
        options: {
          positive: "El perchero sí tiene chaquetas.",
          negative: "El perchero no tiene chaquetas.",
        },
        keyword1: "perchero",
        keyword2: "chaquetas",
        question: "¿Es el nosequé nosecuanto?",
      },
      {
        base: true,
        text: "El extintor está cerca de la salida.",
      },
      {
        base: false,
        text: "",
        options: {
          positive: "La taquilla sí tiene candado.",
          negative: "La taquilla no tiene candado.",
        },
        keyword1: "taquilla",
        keyword2: "candado",
        question: "¿Es el nosequé nosecuanto?",
      },
      {
        base: true,
        text: "Hay un botiquín que tiene vendas y gasas.",
      },
    ],
  },
];

export const words = [
  {
    word: "Piscina",
    old: true,
    correctResponse: "",
  },
  {
    word: "Ambulatorio",
    old: true,
    correctResponse: "",
  },
  {
    word: "Supermercado",
    old: true,
    correctResponse: "",
  },
  {
    word: "Plaza",
    old: true,
    correctResponse: "",
  },
  {
    word: "Cafetería",
    old: true,
    correctResponse: "",
  },
  {
    word: "Ascensor",
    old: true,
    correctResponse: "",
  },
  {
    word: "Patio",
    old: true,
    correctResponse: "",
  },
  {
    word: "Trastero",
    old: true,
    correctResponse: "",
  },
  {
    word: "Cama",
    old: true,
    correctResponse: "",
  },
  {
    word: "Sofá",
    old: true,
    correctResponse: "",
  },
  {
    word: "Ducha",
    old: true,
    correctResponse: "",
  },
  {
    word: "Entrada",
    old: true,
    correctResponse: "",
  },
  {
    word: "Sartén",
    old: true,
    correctResponse: "",
  },
  {
    word: "Frigorífico",
    old: true,
    correctResponse: "",
  },
  {
    word: "Papelera",
    old: true,
    correctResponse: "",
  },
  {
    word: "Cesta",
    old: true,
    correctResponse: "",
  },
  {
    word: "Barra",
    old: true,
    correctResponse: "",
  },
  {
    word: "Carro",
    old: true,
    correctResponse: "",
  },
  {
    word: "Ensalada",
    old: true,
    correctResponse: "",
  },
  {
    word: "Pizza",
    old: true,
    correctResponse: "",
  },
  {
    word: "Sopa",
    old: true,
    correctResponse: "",
  },
  {
    word: "Hamburguesa",
    old: true,
    correctResponse: "",
  },
  {
    word: "Perchero",
    old: true,
    correctResponse: "",
  },
  {
    word: "Taquilla",
    old: true,
    correctResponse: "",
  },
  {
    word: "Gimnasio",
    old: false,
    correctResponse: "",
  },
  {
    word: "Hospital",
    old: false,
    correctResponse: "",
  },
  {
    word: "Iglesia",
    old: false,
    correctResponse: "",
  },
  {
    word: "Ayuntamiento",
    old: false,
    correctResponse: "",
  },
  {
    word: "Casino",
    old: false,
    correctResponse: "",
  },
  {
    word: "Garaje",
    old: false,
    correctResponse: "",
  },
  {
    word: "Azotea",
    old: false,
    correctResponse: "",
  },
  {
    word: "Escalera",
    old: false,
    correctResponse: "",
  },
  {
    word: "Armario",
    old: false,
    correctResponse: "",
  },
  {
    word: "Cuadro",
    old: false,
    correctResponse: "",
  },
  {
    word: "Bañera",
    old: false,
    correctResponse: "",
  },
  {
    word: "Pasillo",
    old: false,
    correctResponse: "",
  },
  {
    word: "Olla",
    old: false,
    correctResponse: "",
  },
  {
    word: "Congelador",
    old: false,
    correctResponse: "",
  },
  {
    word: "Basura",
    old: false,
    correctResponse: "",
  },
  {
    word: "Cajón",
    old: false,
    correctResponse: "",
  },
  {
    word: "Mostrador",
    old: false,
    correctResponse: "",
  },
  {
    word: "Vitrina",
    old: false,
    correctResponse: "",
  },
  {
    word: "Menestra",
    old: false,
    correctResponse: "",
  },
  {
    word: "Ternera",
    old: false,
    correctResponse: "",
  },
  {
    word: "Crema",
    old: false,
    correctResponse: "",
  },
  {
    word: "Bocadillo",
    old: false,
    correctResponse: "",
  },
  {
    word: "Silla",
    old: false,
    correctResponse: "",
  },
  {
    word: "Mochila",
    old: false,
    correctResponse: "",
  },
];
