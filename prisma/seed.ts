import prisma from '../lib/prisma';

type Blog = {
  title: string;
  type: 'blog';
  content: string;
  date: string;
  author?: string;
  absolute_path: string
};

type Folder = {
  title: string;
  type: 'folder';
  content: Content;
}

type Content = Record<string, Blog | Folder>;

const FEED_DATA: Record<string, Content> = {
    "newsletters": {
        "012": {
            "title": "Bulletin n°12 - Septembre 2014",
            "type": "blog",
            "content": "Cartes postales et images du village d’autrefois et photographies du village d’aujourd’hui\n\nBrèves de Village",
            "date": "2016-02-01",
            "author": "Admin",
            "absolute_path": "newsletters/012"
        },
        "bulletin-n-1-septembre-2002": {
            "title": "Bulletin n°1 - Septembre 2002",
            "type": "blog",
            "content": "![](/feed-data/jgwd7f5hc.jpeg)Dans ce numéro n°1, vous trouverez:\n\n* Les commerces et l’artisanat au village dans l’entre deux guerres\n* Apprendre à bien tenir sa maison\n* Salembier et les « chauffeurs du Nord »\n* Les premières élections à Busnes en 1790\n* La lettre de l’abbé Waÿ aux mobilisés de Busnes, décembre 1939\n* La première foire à l’échalote en 1983",
            "date": "2014-07-12",
            "author": "Marie LEBLANC",
            "absolute_path": "newsletters/bulletin-n-1-septembre-2002"
        },
        "bulletin-n-2-septembre-2003": {
            "title": "Bulletin n°2 - Septembre 2003",
            "type": "blog",
            "content": "![](/feed-data/stkm4t2ht.jpeg)![](/feed-data/29dubmyn2.jpeg)Dans ce numéro 2, vous trouverez:\n\n* La famille Menche de Loisne à Busnes\n* Les mobilisés busnois en décembre 1939\n* Les Busnois au Canada\n* « Le temps passe, et avec lui la mémoire de notre village. […] L’histoire pour être retenue doit être écrite: c’est le but de ce bulletin, sauvegarder une partie de la mémoire », extrait de l’édito de ce numéro écrit par Mr Franck",
            "date": "2014-07-12",
            "author": " Marie leblanc",
            "absolute_path": "newsletters/bulletin-n-2-septembre-2003"
        },
        "bulletin-n-3-septembre-2004": {
            "title": "Bulletin n°3 - Septembre 2004",
            "type": "blog",
            "content": "![](/feed-data/01oxo52ha.jpeg)![Couverture](/feed-data/newsletters-003-couverture.jpg)Dans ce numéro n°3, vous trouverez:\n\n* La ferme d’antan\n* Dix conseils aux jeunes filles pour le mariage\n* Le recensement de la population busnoise en 1836",
            "date": "2014-07-12",
            "author": "Marie LEBLANC",
            "absolute_path": "newsletters/bulletin-n-3-septembre-2004"
        },
        "bulletin-n-4-septembre-2005": {
            "title": "Bulletin n°4 - Septembre 2005",
            "type": "blog",
            "content": "![](/feed-data/d0slvgzi2.jpeg)Le bulletin du Groupe Historique de Busnes est devenu un rendez-vous annuel attendu. Cette année, nous lançons notre premier article sur les grandes familles busnoises. Nous commençons par la famille « Delalleau-Fachaux ». Suite au succès de notre première causerie de cet hiver, nous avons décidé de vous offrir le plan du centre de Busnes de 1748 en couleur. Il vous permettra un grand voyage dans le temps. Nous avons souhaité également rendre un hommage au Père Jean Hanique qui nous a quitté cette année",
            "date": "2014-07-12",
            "author": " Marie LEBLANC",
            "absolute_path": "newsletters/bulletin-n-4-septembre-2005"
        },
        "bulletin-n-5-septembre-2006": {
            "title": "Bulletin n°5 - Septembre 2006",
            "type": "blog",
            "content": "![](/feed-data/s0dga1dwk.jpeg)Dans ce numéro, vous trouverez:\n\n* Quelques éléments historiques sur le canal de Busnes\n* Justice du XIXème siècle impitoyable\n* Famille Dambrune-Leclercq\n* 1817: quand le maire décide de prendre les choses en main",
            "date": "2014-07-12",
            "author": "Marie LEBLANC",
            "absolute_path": "newsletters/bulletin-n-5-septembre-2006"
        },
        "bulletin-n-6-septembre-2007": {
            "title": "Bulletin n°6 - Septembre 2007",
            "type": "blog",
            "content": "![](/feed-data/svt1wwc62.jpeg)Dans ce numéro, vous trouverez:\n\n* Le dernier bedeau de Busnes\n* Busnes dans la Grande Guerre\n* Histoires d’eau à Busnes\n* Le certificat d’études",
            "date": "2014-07-12",
            "author": "Marie LEBLANC",
            "absolute_path": "newsletters/bulletin-n-6-septembre-2007"
        },
        "bulletin-n-7-septembre-2008": {
            "title": "Bulletin n°7 - Septembre 2008",
            "type": "blog",
            "content": "![](/feed-data/uc6z5hqbu.jpeg)Le bulletin n°7 est consacré à un thème principal: le paysan et son cheval. Pendant des siècles, jusqu’il y a encore quelques dizaines d’années, le cheval était le fidèle compagnon de travail de l’homme. Le paysan et son cheval! Toute une histoire aujourd’hui révolue. Tout jeunes, je me vois encore courir sur le bord de la route pour regarder passer Cyril et ses deux chevaux qui partaient aux champs. Scène banale pour les plus anciens mais une vraie curiosité pour le gamin que j’étais. Cyril fut le dernier Busnois à travailler avec des Boulonnais. A travers ce bulletin, nous essaierons de redécouvrir ensemble l’importance du cheval dans ce monde paysan. Nous avons souhaité aborder le sujet à travers de nombreuses photos, toutes busnoises. Je tiens ici à remercier André Bizet, Cyril Bécart et André Delalleau pour leurs précieux renseignements et leur accueil. Dans une seconde partie, nous publierons un recensement des chevaux sur la commune datant de 1939 retrouvé dans les archives municipales. Il donne des renseignements intéressants et fera plaisir à bon nombre de Busnois qui retrouveront par la même occasion le prénom du cheval ayant appartenu au père ou au grand-père",
            "date": "2014-07-12",
            "author": " Marie LEBLANC",
            "absolute_path": "newsletters/bulletin-n-7-septembre-2008"
        },
        "bulletin-n-8-septembre-2009": {
            "title": "Bulletin n°8 - Septembre 2009",
            "type": "blog",
            "content": "![](/feed-data/eoq0lgz23.jpeg)« A la fin des années 20, paraissait dans le journal paroissial « La voix de Notre Dame du Bon Conseil » l’histoire de Busnes avant la révolution par le Comte de Loisne. Dans les années 30, c’est Mgr Leclercq, originaire de Busnes qui publiait « Busnes il y a 50 ans ».\n\nEn 2009, le Groupe Historique de Busnes reprend le flambeau. Le bulletin n°8 est entièrement consacré à l’année 1959. Il s’agit plus précisément d’une rétrospective reprenant l’ensemble des faits marquant notre village à cette époque. Les sources sont multiples, mais s’appuient en premier lieu sur les chroniques de Joseph Coriette dans le quotidien « La Croix du Nord » »",
            "date": "2014-07-12",
            "author": " Marie LEBLANC",
            "absolute_path": "newsletters/bulletin-n-8-septembre-2009"
        },
        "bulletin-n-9-septembre-2010": {
            "title": "Bulletin n°9 - Septembre 2010",
            "type": "blog",
            "content": "![](/feed-data/rvwqqx90n.jpeg)« L’image d’Epinal est célèbre: le garde champêtre annonce d’un roulement de tambour les informations aux villageois qui se pressent autour de lui … »Avis à la population », crie-t-il. Dans ce bulletin, nous retracerons le parcours des derniers garde champêtres du village. Ils ont pour noms: Haduphe Delville, Louis Walle, Joseph Delfly et Gilbert Lefebvre.\n\nSaviez-vous que sept Busnois avaient reçu la Légion d’Honneur? Nous avons réussi à retrouver l’histoire de plusieurs d’entre eux. Enfin, il y a 70 ans, la France vivait des heures douloureuses. Nous allons dans ce bulletin revenir sur des événements méconnus ou complètement oubliés de mai 1940",
            "date": "2014-07-12",
            "author": " Marie LEBLANC",
            "absolute_path": "newsletters/bulletin-n-9-septembre-2010"
        },
        "bulletin-n-10-septembre-2012": {
            "title": "Bulletin n°10 - Septembre 2012",
            "type": "blog",
            "content": "![](/feed-data/vy44vj3y0.jpeg)« 30 ans déjà! Qui aurait pu imaginer en 1983 que la foire à l’échalote de Busnes aurait une telle longévité, une telle importance pour notre village et un tel succès avec un nombre de visiteurs croissant au fil des ans […] Nous avons tenu à faire figurer dans ce bulletin le maximum de personnes qui ont oeuvré pour la foire: les organisateurs, les agriculteurs, les commerçants, les bénévoles… »",
            "date": "2014-07-12",
            "author": " Marie LEBLANC",
            "absolute_path": "newsletters/bulletin-n-10-septembre-2012"
        },
        "bulletin-n-11-septembre-2013": {
            "title": "Bulletin n°11 - Septembre 2013",
            "type": "blog",
            "content": "![](/feed-data/luz0zlrlt.jpeg)Dans ce numéro, vous trouverez:\n\n* Cocorico, il est revenu\n* Le saviez-vous? une école pour les jeunes filles à Busnes tenue par des religieuses au XIXème siècle\n* Un soldat britannique croque notre beau village en 1918\n* L’énigme Louis Gabriel Cochet de Corbeaumont\n* Napoléon a-t-il signé l’acte de rachat du presbytère de Busnes le 26 Septembre 1809",
            "date": "2014-07-12",
            "author": "Marie LEBLANC",
            "absolute_path": "newsletters/bulletin-n-11-septembre-2013"
        },
        "bulletin-n-13-septembre-2015": {
            "title": "Bulletin n°13 - Septembre 2015",
            "type": "blog",
            "content": "Cette année célèbre les vingt années d’existence de l’association. Après une exposition le 8 mars 2015 sur le thème « 20 ans d’affiches busnoises », nous ne pouvions éditer un bulletin sans parler des activités de l’association depuis sa création.\n\nMais c’est aussi le centenaire de la Grande Guerre de 1914-1918, évènement que nous ne pouvions ignorer en qualité d’association historique.\n\nNous nous sommes efforcés de vous faire découvrir certains documents inédits tels que « les Mémoires Intégrales d’Emile Hanique », des articles de « La Voix de Saint Paul datant de 1916, une découverte de Franck sur le site de l’Imperial War Museum de Londres, des photographies, des articles de presse, …. sans oublier les « Brèves de Village », nouvelle que nous avions commencée l’année dernière. Cette année, nous vous proposons « les Busnois expatriés », rubrique que vous retrouverez au fil des bulletins à venir. Nous vous souhaitons une bonne lecture.\n\nRetrouvez-nous aussi sur notre site : busnes-histoire.fr\n\n**Et surtout fouillez vos greniers et les malles de vos ancêtres et venez nous rencontrer avec vos découvertes**\n\nAnne-Marie Delporte\n\nPrésidente du Groupe Historique de Busnes\n\n**Sommaire**\n\n*Page de Garde : Articles de Presse à la création de l’association ; Photographies 2014 et 2015 ; Photographies de Gilbert BOURY et Emile HANIQUE\n\n* L’association le « Groupe Historique de Busnes », 20 ans déjà …\n\n* Nos Ancêtres dans la Grande Guerre\n\n\\- Extrait de « La Voix de Saint Paul »\n\n\\- La Légion d’Honneur\n\n\\- Les Mémoires d’Emile Hanique\n\n\\- Lord Kitchener à Busnes\n\n* Les busnois expatriés : vous êtes où ?....\n\n           - Gilbert BOURY\n\n* La Malle aux Souvenirs\n\n* Brèves de village",
            "date": "2014-07-28",
            "author": "Anne-Marie DELPORTE",
            "absolute_path": "newsletters/bulletin-n-13-septembre-2015"
        },
        "bulletin-n-14-septembre-2016": {
            "title": "Bulletin n°14 – Septembre 2016",
            "type": "blog",
            "content": "Les us et coutumes à Busnes 1855 à 1965\n=======================================\n\nAu sommaire:\n\n* La famille Delobel: Léon Delobel\n* Les Saints Guérisseurs et lieux de pèlerinage aux alentours de Busnes\n* Histoires d' »Enfants de chœur » racontées par des Busnois\n* Les Busnois expatriés: vous êtes où? Eugène Dupuis\n* Les recettes de nos anciens\n* Brèves de village",
            "date": "2016-08-31",
            "author": "Anne-Marie DELPORTE",
            "absolute_path": "newsletters/bulletin-n-14-septembre-2016"
        },
        "bulletin-n-15-hier-est-du-pass-demain-est-un-myst-re-et-aujourd-hui-est-un-cadeau": {
            "title": "Bulletin n°15 - Hier est du passé, demain est un mystère et aujourd’hui est un cadeau",
            "type": "blog",
            "content": "Le Groupe de Recherches Historiques de Busnes vous propose son nouveau bulletin au prix de 8 euros.\n\nNous vous faisons ici découvrir sa première page :« Il y a tellement à découvrir ….\n\nLa passion pour leur village anime les membres du « Groupe de Recherches Historiques de Busnes » et souvent les journées sont trop courtes pour tout ce qu’ils entreprennent.Ce bulletin vous en apporte la preuve par la diversité des sujets abordés. Encore a-t-il fallu en mettre de côté pour les prochaines années.\n\nLes guerres ont profondément meurtri des familles busnoises mais elles ont aussi permis des rencontres et créé des liens que même la distance n’a pas réussi à rompre.L’AMITIE, c’est un sentiment d’affection entre deux personnes mais aussi des relations entre collectivités fondées sur le bon voisinage, la bonne entente et la collaboration.\n\nDans ce bulletin, les membres de l’association se sont investis avec un élan d’amitié que je tiens ici à souligner. Sans ce dynamisme, sans cette entente, l’association ne pourrait pas vivre et encore moins vous faire profiter de ses recherches.Je les remercie pour leur implication tout au long de l’année et à chacune de nos manifestations. Chacune et chacun donne le temps qu’il peut donner, le principal étant de participer.\n\nJe vous souhaite une bonne lecture et n’oubliez pas notre devise :Hier est du passé, demain est un mystère et aujourd’hui est un cadeau",
            "date": "2017-09-05",
            "author": "Anne Marie Delporte",
            "absolute_path": "newsletters/bulletin-n-15-hier-est-du-pass-demain-est-un-myst-re-et-aujourd-hui-est-un-cadeau"
        },
        "bulletin-n-17-le-presbytere-renait": {
            "title": "Bulletin n°17 – Le Presbytere renait",
            "type": "blog",
            "content": "Une rencontre sur la place du village et une conversation s’engage…\n===================================================================\n\nC’est ainsi que l’on découvre des histoires, des personnages qui ont marqué la vie de notre village et comment il nous est possible de vous proposer chaque année à l’occasion de la Foire à l’Echalote, notre nouveau bulletin.\n\nBeaucoup de personnes nous disent : « je ne connaissais pas cette histoire et pourtant nous sommes « busnois » depuis plusieurs générations »\n\nIl faut entretenir la mémoire de notre village. Chaque année, nous lançons un appel à toute la population busnoise afin d’enrichir nos archives. N’hésitez pas à nous contacter. Nous avons besoin de vos souvenirs … même les plus infimes … La Municipalité a mis à notre disposition une salle au 2ème étage du Presbytère et nous les en remercions. Les archives y ont été transportées et bientôt nous pourrons vous y accueillir lors de permanences qui, je l’espère, nous permettront de recueillir toujours plus de témoignages.\n\nBULLETIN 17\n===========\n\n* **Histoire de la ferme de Cécile SOUDAN et Bertin BREVART, Rue de la Pierrière, BUSNES**\n* **L’origine du nom « DELALLEAU »**\n* **Un Busnois « Grand Voyageur » : Roland CARON**\n* **Busnes et son Presbytère** ( sur la plupart des documents anciens, il s’écrivait « presbytaire »)\n* **Les Recettes de nos Anciens :** Qui se souvient de l’ECHAUDE (échaudé)\n* **Brèves de village**\n* **des Incidents dans des débits de boissons de Busnes**",
            "date": "2020-10-01",
            "author": "Anne Marie Delporte",
            "absolute_path": "newsletters/bulletin-n-17-le-presbytere-renait"
        },
        "bulletin-n-18-le-confinement": {
            "title": "Bulletin n° 18 – Le confinement",
            "type": "blog",
            "content": "Bulletin n° 18 au prix de 8 euros : Confiné, par un si bel après-midi !\n=======================================================================\n\n>\n\n> ![](/feed-data/g5pdckf8k.jpeg)\n\n>\n\n>\n\nPoème de Gilbert BOURY, musicien, poète et auteur compositeur, né en 1924 à l’estaminet « Boury-Delville » (ancien café « chez Jack », à Busnes).\n\n* **Le Confinement** : Témoignages de Busnoises et Busnois de tout âge\n* **Les Busnois expatriés** : vous êtes où ?…\n* Daniel DELANGUE à CAUSSADE (82)\n* **Les Recettes de nos Anciens**\n* Les Recettes de nos Anciens\n* **Brèves de village**\n* Protection des Animaux",
            "date": "2020-10-01",
            "author": "Anne Marie Delporte",
            "absolute_path": "newsletters/bulletin-n-18-le-confinement"
        },
        "bulletin-n-16-on-vit-longtemps-busnes": {
            "title": "Bulletin n°16 – On vit longtemps à Busnes",
            "type": "blog",
            "content": "L’Association a présenté son nouveau bulletin à l’occasion de la 36ème Foire à l’Echalote.\n\nVoici les thèmes abordés :\n\n* **Busnes a eu son Peppone et son Don Camillo**\n* **Busnes et ses centenaires :** Notre village peut s’enorgueillir d’avoir eu ses centenaires. En effet, à la lecture des registres municipaux, l’on apprend que nous avons eu plusieurs centenaires dont Jean-Baptiste DUFOSSEZ qui est décédé en 1791 à 102 ans. Nous n’avons pas retrouvé suffisamment d’éléments sur Jean-Baptiste DUFOSSEZ mais nous vous proposons de découvrir 4 autres centenaires. Il s’agit de :\n* Madame Rosine THUILLEZ épouse LEVECQUE\n* Madame Virginie TAFFIN épouse CORIETTE\n* Madame Lucie CONSEIL épouse DELOBEL\n* Madame Jeanne FRANCOIS épouse DELELIS\n* **Busnes et la Guerre**Nous nous devions en cette année 2018 d’évoquer cette « Grande Guerre ». Il ne s’agit pas ici de donner un « cours d’histoire » mais simplement de rappeler les évènements marquants de cette période et ses conséquences souvent dramatiques.\n* **Les Recettes de nos Anciens :** Macarons ou Caramels ?\n* **Brèves de village**\n* « Plus de peur que de mal »\n* « Un Héros à Busnes »\n\n**Vous pouvez le commander par mail. Il suffit de remplir la rubrique « contact » ou vous le procurez au \"Café Tabac Presse \"le B7\" à Busnes**\n\nBonne Lecture\n\n![](/feed-data/uyzm8jyh1.jpeg)",
            "date": "2018-09-12",
            "author": "Anne Marie Delporte",
            "absolute_path": "newsletters/bulletin-n-16-on-vit-longtemps-busnes"
        },
        "bulletin-n-19-il-fait-bon-vivre-busnes": {
            "title": " Bulletin n°19 - Il fait bon vivre à Busnes",
            "type": "blog",
            "content": "Busnes, un village où il fait bon vivre …\n\nNotre village, au fil des ans, change de visage. C’est dans l’air du temps. Il faut s’adapter à notre ère actuelle.\n\nDes bâtiments sont rénovés, d’autres disparaissent. Les évènements à relater ne manquent pas ainsi que les personnages qui ont, chacun à leur façon, marqué une époque de notre histoire.\n\nC’est lors d’une réunion de l’association (et il n’y en a pas eu beaucoup depuis 1 an !) que l’idée de ce bulletin n° 19 est née. Il devait être « allégé »  mais il y a tant à dire.\n\nCette année, nous vous proposerons également à la vente un manuscrit que nous pouvons qualifier d’exceptionnel. Ce manuscrit est l’œuvre de Franck. Il lui a demandé plusieurs années de recherches mais Franck est passionné.\n\nJe tiens à remercier tout particulièrement Joël, Marie et Marie-Cécile pour leur article car sans eux il n’y aurait pas eu de bulletin n°19.\n\nEt je tiens également à remercier Francis et Joëlle qui ont accepté de partager leurs souvenirs.\n\nJe vous rappelle qu’il est toujours possible de se rencontrer si vous le souhaitez sur simple demande auprès de nos membres. Je vous souhaite une bonne lecture et n’oubliez pas notre devise : **Hier** est du passé, **demain** est un mystère **et aujourd’hui** est un cadeau\n\n**Sommaire**\n\n* Napoléon est-il passé à Busnes ?\n\n * Des enseignants qui ont marqué notre enfance\n\n\\- Sœur MARIE-ANNA à l’Ecole Ste Thérèse\n\n\\- Monsieur HOURIEZ à l’Ecole Communale\n\n * Un petit peu de Généalogie\n\n * La Chapelle de la MIquellerie\n\n *  Les Busnois expatriés : vous êtes où ?....\n\nFrancis et Joëlle TERNOY (de Busnes à Meschers sur Gironde 17)\n\n * Les Recettes de nos Anciens\n\n           « Le Pain d’chien »\n\n * Brèves de village\n\n           - des Triplés à Busnes",
            "date": "2023-07-26",
            "author": "Anne-Marie DELPORTE",
            "absolute_path": "newsletters/bulletin-n-19-il-fait-bon-vivre-busnes"
        },
        "bulletin-n-20-la-40-me-foire-l-echalote-de-busnes": {
            "title": "Bulletin n°20 - La 40ème Foire à l'Echalote de Busnes",
            "type": "blog",
            "content": "Busnes, ses Maires, sa Foire, ses Prêtres, sa Confrérie …\n\nMonsieur le Maire souhaite refaire la plaque des Maires de Busnes exposée en Mairie. Lors d’une discussion avec les membres de l’Association, il faut bien se rendre compte qu’il en manque. C’est ainsi que les recherches commencent. Jean-Paul et Joël s’y attellent et retrouvent les noms manquants. Mais ils vont encore plus loin comme vous le découvrirez dans ce bulletin.\n\nLa Foire à l’Echalote fête ses 40 ans. C’est une occasion unique de faire découvrir **« Busnes de A à Z »,** un abécédaire sur notre village. Il couvait depuis plusieurs années. Il est terminé et sera disponible le week-end des 10 et 11 septembre 2022 sur notre stand ainsi que ce même bulletin.\n\nComme vous pouvez le constater, notre association est toujours aussi active. Les projets ne manquent pas et comme dirait Franck « il y a encore tant à découvrir ».\n\nVous pouvez nous rejoindre lors notre Assemblée Générale qui aura lieu courant mars 2023.\n\nll est également possible de se rencontrer sur simple demande auprès de nos membres. Ils sont très souvent le mercredi après-midi au 2ème étage du presbytère.\n\nJe vous souhaite une bonne lecture et n’oubliez pas notre devise : **Hier** est du passé, **demain** est un mystère **et aujourd’hui** est un cadeau\n\n**Sommaire**\n\n* Les Maires de Busnes\n\n* Busnes et sa Foire à l’Echalote : la 40ème\n\n* Les Prêtres originaires de Busnes\n\n* Busnes et sa Confrérie depuis 25 ans\n\n* Le Concours de Lenteur\n\n* Brèves de village\n\n![](/feed-data/574s3puit.jpeg)",
            "date": "2023-07-26",
            "author": "Anne-Marie DELPORTE",
            "absolute_path": "newsletters/bulletin-n-20-la-40-me-foire-l-echalote-de-busnes"
        },
        "bulletin-n-21-le-mariage": {
            "title": " BULLETIN N° 21 - Le Mariage",
            "type": "blog",
            "content": "Busnes, notre beau village …\n\nBusnes, un village dynamique où les manifestations ne manquent pas. Cette année, le village fêtera sa 41ème Foire à l’Echalote. Mais une personne sera absente et nous ne pouvons pas faire comme si rien ne s’était passé.\n\nFrançoise était parmi nous depuis de très nombreuses années. Nous nous devions de lui rendre hommage et de penser à elle et à sa famille. Avec Roland, elle faisait partie de notre association et apportait beaucoup avec ses souvenirs et ses connaissances de la vie du village. Nous ne retracerons pas sa vie dans ce bulletin. Il est encore trop tôt et le courage nous manque. Mais ce n’est que partie remise. C’est grâce à des personnes comme Françoise qui consacrent une bonne partie de leur vie à leur village, qu’il fait bon vivre à Busnes.\n\nJacques Malesys nous a aussi quittés. N’oublions pas son action au sein du Souvenir Français.\n\nLors d’une réunion, Muriel a eu l’idée d’une « galerie photos » et au fil de la discussion, pourquoi ne pas recenser des photos de mariage d’au moins 50 ans et ayant un lien avec Busnes. L’idée était lancée et cette année, l’association exposera plus de 150 photos de mariage à l’occasion de cette foire.\n\nDans ce bulletin, vous découvrirez différents articles. Il faut souligner que les membres de l’association font preuve de beaucoup de ténacité pour pouvoir vous faire connaître des évènements busnois et il faut les en remercier. Sans eux, rien ne serait possible. Nos différentes actions relèvent d’un travail d’équipe.",
            "date": "2024-02-01",
            "author": "Admin",
            "absolute_path": "newsletters/bulletin-n-21-le-mariage"
        },
        "bulletin-n-22": {
            "title": "BULLETIN N° 22",
            "type": "folder",
            "content": {
                "bulletin-n-22": {
                    "title": " BULLETIN N° 22",
                    "type": "blog",
                    "content": "Notre bulletin numéro 22 se veut « varié ». Cette année, nous avons choisi de vous parler de certains Busnois et surtout du Canal à Busnes qui sera aussi l’objet de notre exposition. Nous espérons qu’il vous rappellera de nombreux souvenirs.",
                    "date": "2026-01-05",
                    "author": "Admin",
                    "absolute_path": "newsletters/bulletin-n-22/bulletin-n-22"
                },
                "bulletin-n-23": {
                    "title": "BULLETIN N° 23",
                    "type": "blog",
                    "content": "Ce bulletin est une édition spéciale puisque qu’il est entièrement consacré à la guerre 39-45 à Busnes et environs. Vous découvrirez des témoignages, des anecdotes, des listes, …. et des photos de nos anciens qui ont tout quitté pour défendre leur pays. Un grand MERCI à toutes les personnes qui y contribuées.\n\n**Le devoir de mémoire doit rester présent parmi toutes les générations en espérant que de tels évènements ne se reproduisent jamais mais malheureusement les événements mondiaux actuels nous prouvent le contraire !**\n\n![](/feed-data/wlckez4hd.jpeg)",
                    "date": "2026-01-05",
                    "author": "Admin",
                    "absolute_path": "newsletters/bulletin-n-22/bulletin-n-23"
                }
            }
        }
    },
    "events": {
        "les-journees-du-patrimoine": {
            "title": "Les journées du patrimoine",
            "type": "blog",
            "content": "Lors des Journées du Patrimoine 2014, les membres du Groupe Historique de Busnes ont décidé d’ouvrir au public les portes de l’Eglise Saint Paul de Busnes en accord avec la municipalité et les responsables paroissiaux le dimanche 21 septembre 2014 de 15 heures à 18 heures\n\nAu programme de cette journée :\n\n* visites guidées\n* diaporama sur la restauration de l’église\n* récital de 17 heures à 17 heures 30 sur l’orgue remis en service pour l’occasion, récital donné par Jean Claude Bourdon\n\nDe nombreuses personnes sont venues découvrir ou redécouvrir ce patrimoine. Parmi eux, se trouvaient de nombreux bénévoles qui ont contribué à la restauration de l’église Saint Paul et cette journée était aussi une façon de leur rendre hommage.\n\nLors des visites guidées animées par Jacques Delporte et Franck Hannebicq, les visiteurs ont pu partager ce respect du patrimoine et apporter parfois leur témoignage. Des rencontres sont venues enrichir les connaissances de ces passionnés d’histoire et de culture de l’art. Des contacts ont été pris et les échanges continuent …\n\nL’émotion était au rendez-vous lors du récital sur le magnifique orgue remis en fonction grâce à un bénévole qui se reconnaîtra, récital donné par Jean-Claude Bourdon qui a vécu un grand moment de joie et d’excitation. Il a pu réaliser ce jour-là, l’un de ces rêves les plus fous avec passion et une grande sensibilité. Merci Jean Claude de nous avoir fait partager cet instant magnifique.\n\nQuelques photographies de cette journée témoignent du succès de l’opération…\n\nToute personne désirant visiter l’église Saint Paul de Busnes peut prendre contact avec l’Association. Un rendez-vous peut être fixé avec visite commentée.\n\n![](/feed-data/IMG_8238-300x200.jpg)![](/feed-data/IMG_8258-300x200.jpg)![](/feed-data/IMG_8266-300x200.jpg)![](/feed-data/journee-du-patrimoine-004-300x225.jpg)![](/feed-data/journee-du-patrimoine-019-300x225.jpg)![](/feed-data/journee-du-patrimoine-031-300x225.jpg)",
            "date": "2014-09-28",
            "author": "Marie May",
            "absolute_path": "events/les-journees-du-patrimoine"
        },
        "assemblee-generale": {
            "title": "Assemblée Générale",
            "type": "blog",
            "content": "**L’Assemblée Générale de l’Association a eu lieu le MARDI 24 FEVRIER 2015 à 19 heures à la Salle « Espace Amitié » à Busnes en présence de Monsieur le Maire de Busnes, Monsieur Franck HANNEBICQ et de Monsieur Laurent RAMETTE, Adjoint.**\n\nL’Association se compose de\n\n* Présidente : Anne-Marie DELPORTE\n* Vice Président : Benoit CABOCHE\n* Trésorière : Muriel HULOT\n* Trésorier Adjoint : Jacques DELPORTE\n* Secrétaire : Marie MAY\n* Secrétaire Adjointe : Marie-Cécile DUCATEZ\n* Membres : Francis DECOURCELLE, Robert et Marie DUBOIS, Bernard DUCATEZ, Franck HANNEBICQRoland DECONINCK a rejoint l’Association au mois d’avril 2015. Nous lui souhaitons la bienvenue.\n\nLes réunions ont lieu une fois par mois. L’Association est ouverte à toutes et à tous. Il est simplement demandé à chacun d’assister à un minimum de réunion dans l’année et de participer aux recherches historiques sur le village.\n\nCotisation annuelle : 10 euros par personne",
            "date": "2014-12-22",
            "author": "Anne Marie Delporte",
            "absolute_path": "events/assemblee-generale"
        },
        "exposition-20-ans-d-affiches-busnoises-et-jeu-questions-pour-des-champions": {
            "title": "Exposition « 20 ans d’Affiches Busnoises » et Jeu « Questions pour des Champions »",
            "type": "blog",
            "content": "|||||--|--|--|--![](/feed-data/IMG_20150308_171839.jpg)|![](/feed-data/IMG_20150308_172506.jpg)|![](/feed-data/IMG_20150308_142945.jpg)|![](/feed-data/IMG_20150308_172116.jpg)![](/feed-data/IMG_20150308_172016.jpg)|![](/feed-data/IMG_20150308_172055.jpg)|![](/feed-data/IMG_20150308_172734.jpg)|![](/feed-data/IMG_20150308_172915.jpg)\n\n**Le DIMANCHE 8 MARS 2015, à l’occasion des 20 ans de l’Association, a eu lieu une Exposition sur le thème « 20 ans d’Affiches Busnoises » suivi du Jeu « Questions pour des Champions ».**\n\nLes affiches exposées retraçaient les manifestations busnoises sur les vingt dernières années\n\nLe jeu animé par Franck Hannebicq rassembla une quarantaine de participants. Il est vrai que les questions n’étaient pas faciles. Les trois premières tables ont été récompensées par des bons d’achat chez les commerçants busnois.\n\nLes gagnants étaient :\n\n* 1er : la table de Monsieur et Madame HANNEBIQUE LOONIS Jean-Claude\n* 2nd : la table de Monsieur TAILLY Gilles et Florence\n* 3e : la table de Monsieur et Madame LESAGE Xavier\n\nEn 2016, aura lieu le traditionnel « Déballage Photos » avec des nouveautés et d’autres animations.",
            "date": "2014-12-22",
            "absolute_path": "events/exposition-20-ans-d-affiches-busnoises-et-jeu-questions-pour-des-champions"
        },
        "foire-a-l-echalote-les-12-et-13-septembre-2015": {
            "title": "Foire à l'échalote les 12 et 13 Septembre 2015",
            "type": "blog",
            "content": "12 et 13 septembre 2015 sur le stand lors de la Foire à l’Echalote de Busnes : Nouveau bulletin n° 13\n\n* les 20 ans de l’Association\n* nos ancêtres dans la Grande Guerre\n* …\n\nRencontre avec un ancien boulanger busnois, Monsieur Cadet|||--|--![](/feed-data/12015211_1197065516976015_9166157730518522163_o.jpg)|![](/feed-data/12000825_1197062750309625_679866856563277877_o.jpg)![](/feed-data/11951709_1197062986976268_4028805042004622363_o.jpg)|![](/feed-data/11951586_1197063423642891_4536273120502125867_o.jpg)",
            "date": "2015-09-10",
            "author": "Anne Marie Delporte",
            "absolute_path": "events/foire-a-l-echalote-les-12-et-13-septembre-2015"
        },
        "journee-du-patrimoine": {
            "title": "Journée du patrimoine",
            "type": "blog",
            "content": "Le 20 septembre 2015 de 15h à 19h, le Groupe Historique de Busnes a accueilli les visiteurs à l’Eglise Saint Paul de Busnes.\n\nLes Chapelles-Tabernacles retrouvées dans le grenier du Presbytère et datant sans doute de l’ancienne église étaient pour la première fois présentées au public.||||||--|--|--|--|--![](/feed-data/eglise-001.jpg)|![](/feed-data/eglise-002.jpg)|![](/feed-data/eglise-003.jpg)|![](/feed-data/eglise-007.jpg)|![](/feed-data/eglise-008.jpg)![](/feed-data/eglise-010.jpg)|![](/feed-data/eglise-011.jpg)|![](/feed-data/eglise-012.jpg)|![](/feed-data/eglise-013.jpg)|![](/feed-data/eglise-014.jpg)![](/feed-data/eglise-015.jpg)|![](/feed-data/eglise-016.jpg)|![](/feed-data/eglise-018.jpg)|![](/feed-data/eglise-020.jpg)|![](/feed-data/eglise-021.jpg)",
            "date": "2015-09-10",
            "author": "Anne Marie Delporte",
            "absolute_path": "events/journee-du-patrimoine"
        },
        "dates-a-retenir": {
            "title": "Dates à retenir",
            "type": "blog",
            "content": "**Mardi 23 février 2016** : à 19h Assemblée Générale de l’Association ouverte à tous (Salle « Espace Amitié » à Busnes\n\n**Dimanche 6 mars 2016** : notre traditionnel « Déballage Photos » suivi de « Questions pour des Champions »\n\n**Dimanche 3 avril 2016** : Sortie en Bus\n\n_voir détail de ces différentes manifestations dans les rubriques ci-après_",
            "date": "2016-01-25",
            "author": "Anne Marie Delporte",
            "absolute_path": "events/dates-a-retenir"
        },
        "23-fevrier-2016--assemblee-generale": {
            "title": "23 Février 2016 : Assemblée Générale",
            "type": "blog",
            "content": "L’Assemblée Générale de l’Association aura lieu le MARDI 23 FEVRIER 2016 à 19 heures à la Salle « Espace Amitié » à Busnes\n\nOuverte à toutes et à tous, nous vous présenterons le rapport d’activités de l’année écoulée. Nous sommes toujours à la recherche de documents, témoignages, objets …. sur notre village.\n\nSi vous êtes intéressés, n’hésitez pas à nous rejoindre au sein de l’Association. Nous serons très heureux de vous accueillir",
            "date": "2016-01-31",
            "author": "Anne Marie Delporte",
            "absolute_path": "events/23-fevrier-2016--assemblee-generale"
        },
        "dimanche-6-mars-2016--deballage-photos-et-questions-pour-des-champions": {
            "title": "Dimanche 6 Mars 2016 : Déballage Photos et Questions pour des Champions",
            "type": "blog",
            "content": "![](/feed-data/img018.jpg)",
            "date": "2016-01-31",
            "author": "Anne Marie Delporte",
            "absolute_path": "events/dimanche-6-mars-2016--deballage-photos-et-questions-pour-des-champions"
        },
        "foire-a-l-echalote-les-samedi-9-et-dimanche-10-septembre-2017": {
            "title": "Foire à l’échalote les samedi 9 et dimanche 10 septembre 2017",
            "type": "blog",
            "content": "Venez nous rejoindre sur notre stand durant tout le week-end.\n\nLe Bulletin n° 15 sera disponible à la vente dès le samedi à partir de 15 heures.",
            "date": "2017-07-21",
            "author": "Anne Marie Delporte",
            "absolute_path": "events/foire-a-l-echalote-les-samedi-9-et-dimanche-10-septembre-2017"
        },
        "assemblee-generale-2018": {
            "title": "Assemblée Générale 2018",
            "type": "blog",
            "content": "Le 15 Février 2018 s’est tenue l’Assemblée Générale de l’Association.\n\nRapport d’activité du groupe de recherches historiques de busnes : Année 2017\n=============================================================================\n\n> 11 réunions pendant l’année 2017\n\nIl est rappelé que les réunions ont lieu depuis le mois de septembre 2017 pour des raisons de salle disponible suite aux travaux du presbytère tous les derniers JEUDI du mois, au lieu du Mardi, un rappel par mail ou SMS étant fait à chaque membre\n\n> 9 AVRIL 2017 : une sortie en bus a réuni 53 personnes dans le cadre d’une journée découverte au Musée des Arts Forains à Bercy. Après un départ à 8h30 et un petit apéritif sur le trajet, arrivée à Paris avenue de Wagram pour un déjeuner au Monte Carlo à 2 pas de l’Arc de Triomphe.\n\nPuis direction Bercy pour une visite atypique au Musée des Arts Forains. Ce lieu féérique ouvert dans les anciennes caves de Bercy est entouré d’une atmosphère magique. Les participants ont pu profiter des anciens jeux et manèges et changer complètement d’époque. Les photos sont visibles sur le site de l’Association.\n\n> L’Association a tenu un stand à la foire à l’échalote pendant les 2 jours de septembre 2017 avec une expo sur le thème « Les 50 ans de l’A.E.B. » Elle a aussi présenté son nouveau Bulletin, le n° 15 Bulletin n°15 avec pour différents thèmes :\n\n* **L’A. E. B. a 50 ans** (exposition sur le stand de la Foire 2017)\n* **Un Soldat Ecossais à Busnes** : Robert MAC LEOD\n* **Des Soldats originaires de Busnes morts lors du 1er Empire**\n* **Des Busnois « Soldats de la Résistance »**\n    *   Paul GEORGES\n    *   Lucien DELASSUS\n* **Les Busnois expatriés** : vous êtes où ?…. Elisabeth QUESTE au Paraguay\n* **Les Recettes de nos Anciens** : Les Gaufres Fourrées\n* **Brèves de village** : dans le journal « Le Temps » Des grêlons comme des pièces de cent sous et dans « le Courrier de Tlemcen » : Mariage singulier à Busnes le 27 juillet 1894\n\n> Bien entendu les membres travaillent toute l’année à leur projet d’Abécédaire\n\nDe nouveaux membres sont venus rejoindre l’Association et celle-ci compte à ce jour 23 membres actifs.",
            "date": "2018-06-12",
            "author": "Anne Marie Delporte",
            "absolute_path": "events/assemblee-generale-2018"
        },
        "sortie-en-bus-du-dimanche-8-avril-2018": {
            "title": "Sortie en bus du dimanche 8 avril 2018",
            "type": "blog",
            "content": "Comme chaque année, l’Association proposait une sortie en bus ouverte à toutes et à tous le dimanche 8 avril 2018. Très rapidement, les inscriptions affluèrent et nous fûmes dans l’obligation de réserver un bus plus grand. 63 personnes ont participé à cette sortie et 2 personnes nous ont rejoints directement à Boulogne-sur-Mer.\n\nLes membres de l’association ont emmené les participants à la découverte de la Côte de Sangatte à Boulogne-sur-Mer. Le brouillard ne nous a pas permis de profiter de cette vue magnifique mais en accord avec le chauffeur du bus, nous en avons profité au retour. Le matin, le Capitaine de la Florelle nous a fait découvrir le Port de Boulogne-sur-Mer.\n\nDe retour sur la terre ferme, un apéritif convivial nous attendait au bus. Après un déjeuner pris face à la mer et au port, notre chauffeur nous emmena dans la vieille ville.\n\nUne visite de la crypte, véritable dédale de salles souterraines qui s’étendent sous toute la basilique Notre Dame était programmée.\n\nAprès cette visite, quartier libre au cœur de la vieille ville puis nous avons repris notre bus pour monter à la falaise et découvrir La Poudrière, le Calvaire des Marins, le Monument de la Légion d’Honneur et la Colonne de la Grande Armée.\n\nJoël nous avait concocté une présentation écrite des différents sites traversés que certains participants ont pris plaisir à relire les jours qui ont suivi.\n\nUne proposition a été faite pour la sortie 2019, affaire à suivre …|||||--|--|--|--![](/feed-data/BOUL35.jpg)|![](/feed-data/voyage-003.jpg)|![](/feed-data/BOUL32.jpg)|![](/feed-data/BOUL23.jpg)![](/feed-data/BOUL25.jpg)|![](/feed-data/BOUL34.jpg)|![](/feed-data/BOUL20.jpg)|![](/feed-data/BOUL16.jpg)![](/feed-data/BOUL19.jpg)|![](/feed-data/BOUL14.jpg)|![](/feed-data/BOUL10.jpg)|![](/feed-data/BOUL6.jpg)![](/feed-data/BOUL2.jpg)|![](/feed-data/BOUL5.jpg)|![](/feed-data/BOUL3.jpg)|![](/feed-data/IMG_7063.jpg)![](/feed-data/IMG_7057.jpg)|![](/feed-data/IMG_7056.jpg)|![](/feed-data/IMG_7054.jpg)|![](/feed-data/IMG_7055.jpg)![](/feed-data/IMG_7053.jpg)|![](/feed-data/IMG_7048.jpg)|![](/feed-data/IMG_7051.jpg)|![](/feed-data/IMG_7047.jpg)![](/feed-data/IMG_7044.jpg)|![](/feed-data/IMG_7043.jpg)|![](/feed-data/IMG_7041.jpg)|![](/feed-data/IMG_7038.jpg)![](/feed-data/IMG_7042.jpg)|![](/feed-data/IMG_7037.jpg)|![](/feed-data/IMG_7036.jpg)|![](/feed-data/IMG_7034.jpg)![](/feed-data/IMG_7031.jpg)|![](/feed-data/IMG_7030.jpg)|![](/feed-data/IMG_7029.jpg)|![](/feed-data/IMG_7025.jpg)![](/feed-data/IMG_7019.jpg)|![](/feed-data/IMG_7022.jpg)|![](/feed-data/IMG_7021.jpg)|![](/feed-data/IMG_7016.jpg)![](/feed-data/IMG_7049.jpg)|![](/feed-data/BOUL13.jpg)|![](/feed-data/BOUL24.jpg)|![](/feed-data/BOUL28.jpg)\n\n![](/feed-data/Boulogne-sur-Mer.jpg)",
            "date": "2018-06-12",
            "author": "Anne Marie Delporte",
            "absolute_path": "events/sortie-en-bus-du-dimanche-8-avril-2018"
        },
        "la-foire-a-l-echalote-2018": {
            "title": "La foire à l’échalote 2018",
            "type": "blog",
            "content": "||||--|--|--![](/feed-data/IMG_7702.jpg)|![](/feed-data/IMG_7703.jpg)|![](/feed-data/IMG_7704.jpg)![](/feed-data/IMG_7705.jpg)|![](/feed-data/IMG_7706.jpg)|![](/feed-data/IMG_7717.jpg)\n\n**36ème Foire à l’Echalote de Busnes** a eu lieu les 8 et 9 septembre 2018 sous un soleil radieux. Ce fut une grande réussite pour tous les participants.\n\nLe Groupe de Recherches Historiques de Busnes sortait à cette occasion son 16ème bulletin. (retrouver plus de détails dans la rubrique « les bulletins »)\n\nL’Association présentait également **une exposition « photos » sur tous les producteurs d’échalotes depuis la création de la Foire.**\n\nUn grand merci à **Gérard DALIBON qui a exposé sur le stand la maquette du POTABAC**, la péniche de ses grands parents coulée en mai 1940 et qui a fait l’objet d’un article dans le bulletin n° 9 de l’Association. Gérard a mis plus d’un an pour réaliser cette maquette. Superbe réalisation, Bravo Gérard !",
            "date": "2018-09-12",
            "author": "Anne Marie Delporte",
            "absolute_path": "events/la-foire-a-l-echalote-2018"
        },
        "journee-du-patrimoine-busnes": {
            "title": "Journée du patrimoine busnes",
            "type": "blog",
            "content": "Le Groupe de Recherches Historiques de Busnes sera présent à la Chapelle du Quesnoy le samedi 15 Septembre à partir de 14 heures, rue du Château à Busnes.![](/feed-data/img030.jpg)\n\n* Visite guidée de la chapelle du XVIIIème siècle\n* Présence de l’équipage « Cochet de Corbeaumont » avec leurs oiseaux de chasse\n* Exposition de peintures et de dessins par des artistes peintres animaliers\n* Atelier du Cuir\n* Démonstration d’Aile Volante\n* Stand du GRHB\n\n> **Entrée Gratuite** Venez Nombreux",
            "date": "2018-09-12",
            "author": "Anne Marie Delporte",
            "absolute_path": "events/journee-du-patrimoine-busnes"
        },
        "assembl-e-g-n-rale-2019": {
            "title": "Assemblée Générale 2019",
            "type": "blog",
            "content": "![](/feed-data/IMG_8143.jpg)\n\nLe Jeudi 7 Février 2019, les Membres du Groupe de Recherches Historiques de Busnes se sont réunis en Assemblée Générale au Presbytère de Busnes. De nombreux sympathisants ont répondu « présents » et deux nouveaux membres sont venus rejoindre l’association. Il s’agit de Monique MARTEL et de Gérard DALIBON. Nous leur souhaitons la Bienvenue.",
            "date": "2019-03-03",
            "author": "Anne Marie Delporte",
            "absolute_path": "events/assembl-e-g-n-rale-2019"
        },
        "l-arbre-de-la-vie-des-racines-pour-des-ailes": {
            "title": "L’arbre de la vie, « des racines pour des ailes »",
            "type": "blog",
            "content": "![](/feed-data/IMG_20200216_175259.jpg)|![](/feed-data/IMG_20200216_175304.jpg)![](/feed-data/IMG_20200216_175318.jpg)|![](/feed-data/IMG_20200216_175325.jpg)\n\n> « Le Groupe de Recherches Historiques de Busnes proposait de retrouver le village de Busnes au temps passé le DIMANCHE 16 FEVRIER 2020 à la Maison des Associations « le Presbytère de Busnes »\n\nA cette occasion les visiteurs ont pu revoir et même découvrir pour certains, des événements marquants du village.\n\nDans la « Salle de l’Abbé Bocquet, les visiteurs pouvaient consulter les nombreuses photographies ou reproductions que possède l’association. Ils pouvaient aussi admirer les bannières de l’église qui servaient aux processions et les habits sacerdotaux.\n\nDans la « Salle de l’Horloge », les personnes désireuses de faire des recherches généalogiques avaient à leur disposition deux personnes qui leur apportaient les renseignements et leur expliquaient le fonctionnement d’une recherche sur ordinateur.\n\nDans la « Salle Cochet de Corbeaumont », plusieurs films étaient passés en boucle :\n\n* un film sur le mariage de Charles Hannebicq réalisé par l’Abbé Gérard Bout (propriété de la famille qui a accepté de nous le prêter)\n* un film réalisé par Monsieur Briançon, secrétaire de mairie, sur les diverses manifestations à Busnes dont la première foire à l’échalote. (1982 et 1983) (don de la famille de Monsieur Briançon)\n* un film sur la famille Hulot déguisée qui défile en fanfare dans les rues de Busnes à l’occasion d’une fête familiale (don de la famille Hulot)\n* un film sur une journée de classe à l’Ecole Ste Thérèse de Busnes en 1993. (don de la famille Delporte)\n\nNombreux sont ceux ou celles qui ont reconnu des membres de leur famille.\n\nCette journée a pu avoir lieu grâce aux membres de l’association qui se sont investis pour la préparer dès le matin et aussi à toutes les familles d’origine busnoise qui font don ou prêtent à l’association ces documents qui permettent de retracer la vie à Busnes au temps passé. Un grand merci à toutes ces personnes.",
            "date": "2020-10-01",
            "author": "Anne Marie Delporte",
            "absolute_path": "events/l-arbre-de-la-vie-des-racines-pour-des-ailes"
        },
        "dimanche-3-avril-2016-sortie-en-bus-ouverte-tous-ypres": {
            "title": "Dimanche 3 Avril 2016 : Sortie en Bus ouverte à tous : YPRES",
            "type": "blog",
            "content": "![](/feed-data/img019.jpg)",
            "date": "2016-01-31",
            "author": "Anne Marie Delporte",
            "absolute_path": "events/dimanche-3-avril-2016-sortie-en-bus-ouverte-tous-ypres"
        },
        "sortie-en-bus-2017-le-musee-des-arts-forains-a-bercy": {
            "title": "Sortie en Bus 2017 - LE MUSEE DES ARTS FORAINS A BERCY",
            "type": "blog",
            "content": "> LE GROUPE HISTORIQUE DE BUSNES vous a proposé LE DIMANCHE 9 AVRIL 2017 de découvrir un PARIS Insolite en visitant **le MUSEE DES ARTS FORAINS**\n\n**L’histoire du spectacle et de la fête foraine de 1850 à nos jours.**\n\nNous avons souhaité sortir des sentiers battus et vous proposez un lieu atypique. Ce lieu n’est pas toujours ouvert et la mise en place de cette journée n’a pas été simple. Il s’agit d’un lieu féérique ouvert dans les anciennes caves de Bercy : la grande cour pavée et la végétation qui l’entoure, donnent à l’endroit une atmosphère magique. On pénètre dans différents espaces thématiques qui montrent d’anciens manèges (sur lesquels on peut monter !), des attractions foraines dignes des romans de nos arrières grand-mères, etc … Lorsqu’on plonge dans cet univers, on change définitivement d’époque.\n\n53 personnes ont participé à cette sortie. Le soleil était au rendez-vous. Après un repas suivi d’une balade au pied de l’Arc de Triomphe, les participants ont pu retrouver leur âme d’enfants au « Musée des Arts Forains »\n\nSuivez cette visite en photo|||||||--|--|--|--|--|--![](/feed-data/IMG_6513.jpg)|![](/feed-data/DSC00071.jpg)|![](/feed-data/DSC00074.jpg)|![](/feed-data/DSC00078.jpg)|![](/feed-data/DSC00079.jpg)|![](/feed-data/IMG_6517.jpg)![](/feed-data/IMG_6550.jpg)|![](/feed-data/IMG_6552.jpg)|![](/feed-data/IMG_6528.jpg)|![](/feed-data/IMG_8262.jpg)|![](/feed-data/IMG_6531.jpg)|![](/feed-data/IMG_6533.jpg)![](/feed-data/IMG_6534.jpg)|![](/feed-data/IMG_6535.jpg)|![](/feed-data/IMG_6536.jpg)|![](/feed-data/IMG_6537.jpg)|![](/feed-data/IMG_6544.jpg)|![](/feed-data/IMG_6559.jpg)|![](/feed-data/IMG_6560.jpg)|![](/feed-data/IMG_6563.jpg)![](/feed-data/IMG_6569.jpg)|![](/feed-data/DSC00082.jpg)|![](/feed-data/IMG_6524.jpg)|![](/feed-data/IMG_6539.jpg)|![](/feed-data/IMG_6540.jpg)|![](/feed-data/IMG_8259.jpg)![](/feed-data/DSC00098.jpg)|![](/feed-data/DSC00103.jpg)|![](/feed-data/DSC00106.jpg)|![](/feed-data/DSC00118.jpg)|![](/feed-data/DSC00136.jpg)|![](/feed-data/DSC00140.jpg)![](/feed-data/IMG_8265.jpg)|![](/feed-data/IMG_8272.jpg)|![](/feed-data/IMG_8280.jpg)|![](/feed-data/IMG_8291.jpg)",
            "date": "2017-03-04",
            "author": "Anne Marie Delporte",
            "absolute_path": "events/sortie-en-bus-2017-le-musee-des-arts-forains-a-bercy"
        },
        "2015-les-20-ans-de-l-association-memoire-et-patrimoine": {
            "title": "2015 - Les 20 ans de l’Association : MEMOIRE ET PATRIMOINE",
            "type": "blog",
            "content": "![](/feed-data/PICT0029.jpg)![](/feed-data/PICT0025.jpg)![](/feed-data/PICT0019.jpg)![](/feed-data/PICT00091.jpg)![](/feed-data/PICT0008.jpg)![](/feed-data/PICT0005.jpg)![](/feed-data/PICT0003.jpg)![](/feed-data/PICT0002.jpg)![](/feed-data/PICT0015.jpg)![](/feed-data/PICT0004.jpg)\n\n**Pour fêter dignement les 20 ans de l’Association, une sortie en bus a été organisée le DIMANCHE 12 AVRIL 2015**\n\n> « MEMOIRE ET PATRIMOINE »\n\n46 personnes ont participé à cette journée qu’organisait l’Association le « Groupe Historique de Busnes » à l’occasion de ses vingt années d’existence.\n\nGuidés par Aurore Rouffelaers, guide conférencière nationale, les participants ont pu découvrir cet « Anneau de Mémoire » qui rend hommage aux 600 000 soldats tombés lors de la Première guerre mondiale dans le Nord-Pas de Calais. Leurs noms sont gravés dans l’ordre alphabétique sur des plaques en acier inoxydable, sans distinction de grade, de nationalité ou de religion. Aurore leur a fait découvrir quelques soldats nommés sur l’Anneau et enterrés dans le carré militaire du cimetière de Busnes.\n\nCette ellipse de 345 mètres de périmètre est placée en partie en porte-à-faux, symbolisant ainsi la fragilité de la paix.\n\nLes participants à la demande de Viviane se sont donnés la main et ont dédié une minute de silence à la mémoire de ces victimes de la Grande Guerre.\n\nAprès un passage sur le site de Lorette, un repas sympathique les attendait à l’estaminet « L’Abri des Visiteurs » dans un cadre typique de notre région.\n\nIls ont ensuite rejoint le Musée des Beaux Arts d’Arras afin de découvrir l’Exposition « le Château de Versailles en 100 chefs d’œuvre ».\n\nAprès cette journée riche en émotion et en découverte, ils ont regagné Busnes grâce à Alain, notre chauffeur de bus. Le retour fut très gai et certains ont même poussé la chansonnette : quelques airs du Carnaval de Dunkerque mais aussi « le temps des cerises » … Bien qu’ écrite en 1866 par Jean-Baptiste Clément et la musique composée en 1868 par Antoine Renard, elle reste une chanson reprise par de très nombreux artistes et ne dénotait en rien dans la continuité de notre matinée.\n\nRendez-vous a été pris pour l’année prochaine … où ? … les idées ne manquent pas … vous le saurez dans les prochains mois en consultant régulièrement notre site",
            "date": "2014-12-22",
            "author": "Anne Marie Delporte",
            "absolute_path": "events/2015-les-20-ans-de-l-association-memoire-et-patrimoine"
        },
        "sortie-le-samedi-4-mai-2019-decouvrez-le-ch-teau-de-vaux-le-vicomte": {
            "title": "Sortie le samedi 4 mai 2019 : decouvrez le château de vaux le vicomte",
            "type": "blog",
            "content": "![](/feed-data/det_hs_chateau_12_vaux_interieur_bertrand_rieger.jpg)\n\nAu programme : Arrivée vers 12h, Apéritif (offert par le GRHB) et Pique-Nique (chaque participant prend son casse-croûte pour le déjeuner) sur l’aire réservée à cet effet près du parking du Château. A partir de 14 heures, visite libre du Château, (audioguide compris) des Jardins et du Musée des Equipages. La visite des Jardins peut s’effectuer moyennant un supplément en voiturette électrique à réserver sur place (pour 4 personnes 20 euros les 45 mn). A partir de 19 heures, DINER (boissons comprises) au Restaurant « l’Ecureuil » (environ jusque 20h30/21h) puis nous pourrons assister à la « Soirée aux Chandelles » suivie à 23 heures d’un Feu d’Artifice.\n\n![](/feed-data/IMG_2500-copier.jpg)\n\n2 000 bougies sont allumées à l’intérieur du château ainsi que dans les jardins. Les visiteurs revivent par cette féérie lumineuse une mémorable page d’histoire, celle de la fête à Vaux-le-Vicomte donnée par Nicolas Fouquet le 17 août 1661. Ce spectacle se terminera vers 0h et nous reprendrons la route vers 0h 30\n\n![](/feed-data/vol-en-h-licopt-re-en-soir-e-de-paris-vaux-le-vicomte-dans-la-soir-e-in-paris-161534.jpg)\n\n===",
            "date": "2019-03-03",
            "author": "Anne Marie Delporte",
            "absolute_path": "events/sortie-le-samedi-4-mai-2019-decouvrez-le-ch-teau-de-vaux-le-vicomte"
        },
        "sortie-bus-en-champagne-en-2022": {
            "title": "Sortie Bus en Champagne en 2022",
            "type": "blog",
            "content": "**« LE CHAMPAGNE AIDE A L’EMERVEILLEMENT » disait Georges Sand**\n\nNous sommes arrives sur le parking du Caveau Lallemand situé dans le charmant village de Chamery, classé 4 fleurs sur la route des villages fleuris vers 10h15. A 10h30 le petit train des Vignobles de Champagne nous a emmener pour une balade commentée à la découverte du travail des vignes et du village de Chamery. Vers 11h30, nous avons ete accueillis par le vigneron pour une visite de cave suivie d’une dégustation. Nous avons découvert les méthodes d’élaboration du Champagne. Vers 12h30, nous mettons les pieds sous la table pour un repas servi en costume folklorique (1/4 carafe vin rouge et café inclus), (coupe de champagne, tourte vigneronne sur crudités, mignon de porc Clovis, salade-fromage, dessert du chef aux fraises et biscuits roses). Vers 14h30 nous avons repris le bus pour Cumières et sommes arrives sur les quais de Marne vers 15h30 pour une croisière-promenade d’1h30 à la découverte de l’histoire des canaux, de la faune et de la flore sur la rivière Marne.",
            "date": "2023-07-26",
            "author": "Anne-Marie DELPORTE",
            "absolute_path": "events/sortie-bus-en-champagne-en-2022"
        },
        "forum-des-associations": {
            "title": "forum des associations",
            "type": "blog",
            "content": "Le samedi 30 mars 2024 à partir de 10 heures à la Salle \"Les Moyettes\" à Busnes, a eu lieu notre premier FORUM DES ASSOCIATIONS A VOCATION HISTORIQUE ET CULTURELLE\n\nCette rencontre a rencontré un vif succès avec la participation de 14 associations.\n\nprochain rendez vous en 2026",
            "date": "2024-02-01",
            "author": "Admin",
            "absolute_path": "events/forum-des-associations"
        },
        "rando-historique-et-gourmande": {
            "title": " RANDO HISTORIQUE ET GOURMANDE",
            "type": "blog",
            "content": "**AU PROFIT DU TELETHON 2024,**\n\n**RANDONNEE HISTORIQUE ET GOURMANDE (environ 8 kms)**\n\n     **LE DIMANCHE 15 DECEMBRE 2024 (matinée)**\n\n**visite du site du parc du Château de Beaulieu avec petit « en-cas »  (si le temps le permet)**\n\n**VIsite du site de la Chapelle du Quesnoy avec petit « en-cas »**\n\n**Retour à la Salle la Houblonnière, place de Busnes avec spécialités busnoises à déguster**",
            "date": "2026-01-05",
            "author": "Admin",
            "absolute_path": "events/rando-historique-et-gourmande"
        },
        "sortie-bus-2023": {
            "title": " sortie bus 2023",
            "type": "blog",
            "content": "**LE FAMILISTERE de Guise**, situé dans la commune de [Guise](https://fr.wikipedia.org/wiki/Guise), dans le département de l'[Aisne](https://fr.wikipedia.org/wiki/Aisne_\\(d%C3%A9partement\\)), voulu par l'industriel [**Jean-Baptiste André GODIN**](https://fr.wikipedia.org/wiki/Jean-Baptiste_Andr%C3%A9_Godin) pour l'hébergement de ses ouvriers, est un haut lieu de l’histoire économique et sociale des xixe et xxe siècles. À Guise, la solidarité prend une forme concrète grâce à un système de protection sociale que Godin perfectionne bien avant que ne germe dans notre pays l’idée d’une sécurité sociale accessible à tous.\n\n**LE MUSEE DES METIERS D ANTAN**, c’est un véritable univers que nous vous invitons à découvrir. Sur plus de 3 200 m², venez à la rencontre d’une authenticité disparue.. 55 thèmes de métiers installés ! Au détour d’une ruelle, sur un chemin pavé, prenez le temps de discuter et de partager une expérience autour d’une limonade d’antan. Après ce joli et précieux bond en arrière, peut-être garderez-vous une image nouvelle du temps passé. **LE MUSEE MOTOBECANE**, implanté dans son ancienne usine, vous fera revivre les plus belles heures de la marque aux deux têtes de Gaulois. Plus de 120 modèles exposés; Unique en France ! A découvrir, également, une magnifique collection de voitures hippomobiles et un ensemble de plus de 50 objets rares ou insolites. Une visite à consommer sans modération, pour tout public et tout âge !",
            "date": "2026-01-05",
            "author": "Admin",
            "absolute_path": "events/sortie-bus-2023"
        },
        "sortie-bus-2025": {
            "title": "SORTIE BUS 2025",
            "type": "blog",
            "content": "**Cette année 2025 marque l’Anniversaire de la Fin de la Seconde**\n\n **Guerre Mondiale.**\n\n### C’est pourquoi nous vous proposons de découvrir la Ville de **DUNKERQUE** et tout particulièrement l’histoire de cette seconde guerre mondiale avec le matin la visite du **FORT DES DUNES à** **Leffrinckoucke**, lieu de mémoire et d’histoire. Le Fort des Dunes est un ouvrage militaire situé au sein de l’espace des Dunes de Flandres, sur la commune de Leffrinckoucke. A quelques kilomètres de Dunkerque et à proximité de la plage, cet ouvrage fortifié n’a pas été construit au hasard.\n\n**Le repas de midi se prendra dans un restaurant face à la mer sur la plage de Malo-les-Bains.**\n\n### Après ce repas, visite guidée en car des endroits stratégiques pendant la seconde guerre mondiale puis nous nous rendrons au **Musée de la Guerre 1940**, lieu unique avec sa magnifique collection. Installé dans les courtines du BASTION 32 qui fut le Quartier Général de la défense du secteur fortifié de DUNKERQUE, c’est de là que partaient les ordres pour la défense terrestre, mais aussi la coordination des évacuations par mer. C’est donc un lieu symbolique puisqu’il a joué un rôle important lors des événements de l’Opération Dynamo et de la Bataille de Dunkerque.\n\n###",
            "date": "2026-01-08",
            "author": "Admin",
            "absolute_path": "events/sortie-bus-2025"
        }
    },
    "themes": {
        "la-mairie": {
            "title": "La mairie",
            "type": "folder",
            "content": {}
        },
        "les-ecoles": {
            "title": "Les écoles",
            "type": "folder",
            "content": {}
        },
        "les-lieux-de-culte": {
            "title": "Les lieux de culte",
            "type": "folder",
            "content": {
                "l-eglise": {
                    "title": "L'église",
                    "type": "folder",
                    "content": {
                        "les-eglises": {
                            "title": "Les Eglises",
                            "type": "blog",
                            "content": "Une église existait à Busnes avant l’année 1043 puisqu’à cette date, son autel fut donné au chapitre de Lillers, dans la charte de fondation de la collégiale. Cette église fut reconstruite au début du XIIIème siècle puis détruite en partie par des bandes flamandes en 1346.\n\nEn 1383, les Anglais à travers des courses folles dans la région, pillèrent et saccagèrent le village. De ce fait, en 1519, l’église fortement abimée, subit un remaniement qui, pour la nef et la façade, fut une véritable reconstruction.\n\nPuis vinrent le temps des guerres de religion et plus tard, la Révolution. L’église fut alors vendue et devint un édifice public. Elle fut rendue au culte le 20 février 1802. (1er Ventose an X de la République).\n\nSérieusement brûlée par les dévastations antérieures, elle avait été réparée. Mais cette église était devenue trop petite et elle avait un grave inconvénient, celui de ne pas laisser apercevoir l’autel.\n\nLe 1er novembre 1866 est nommé à Busnes Mr l’abbé FAIDY. Sitôt arrivé, les paroissiens lui manifestent le désir d’agrandir l’église devenue trop petite pour la population. On envisagea alors d’abattre la tour, d’agrandir la nef à la place du choeur et de construire un autre clocher au portail. Une souscription fut alors ouverte et devant le succès remporté, on entrevoit de reconstruire l’église toute entière.\n\nDécembre 1869, un premier devis est demandé à Monsieur Norman, architecte à Hesdin. Survient la guerre de 1870 et la défaite. Mais le curé et les paroissiens sont persévérants. Le 26 Janvier 1874, après la signature de l’adjudication des travaux, ceux-ci peuvent commencer. (entreprise des frères DESQUENNES à Busnes)\n\nDeux ans après, le 2 juillet 1876, le choeur et le transept sont terminés. En 1878, la nef est terminée et livrée au culte. Le clocher restait encore à construire. Malheureusement Mr l’abbé FAIDY décédait le 25 décembre 1878. En 1879, une nouvelle souscription est faite dans la paroisse pour la construction de la flèche qui manquait encore. En juin 1879, un étage est ajouté à la tour et une flèche en pierres couronnait le tout. Tous ces travaux furent terminés le 9 octobre 1879.\n\nMais il reste beaucoup à faire. Pendant plus de 20 ans, les travaux d’aménagement vont se succéder.\n\n1881, le 14 octobre un ouragan abat la croix de la flèche du clocher\n\n1882, érection du maître autel\n\n1883, les chapiteaux du choeur sont sculptés par Mr Marlé de St Pierre les Calais, la chaire est replacée\n\n1884, le tabernacle est installé en août et les bancs de communion en chêne sculpté provenant de l’ancienne église sont replacés moyennant quelques modifications\n\n1885, ravalement intérieur et extérieur; les murs extérieurs sont jointoyés et une couleur uniforme est appliquée sur les briques à l’intérieur avec un ton différent pour le tour des fenêtres. La croix est replacée au sommet du clocher.\n\n1889, pavage de l’église\n\nTout n’était pas terminé mais tout était prêt pour la consécration de cette nouvelle église. Elle fut faite par Monseigneur DENNEL, évêque d’Arras le mardi 23 juillet 1889.\n\n1894, Chapelle de St Joseph\n\n1895, Chapelle de la Vierge\n\n1896, Vitrail de la Chapelle de la Vierge\n\n1897, les anciennes marches du maître autel, trop petites, sont remplacées par du marbre de Marquise et le bas de l’autel s’orne d’un Christ au tombeau\n\n1898, vitraux des nefs et des transepts (les noms des donateurs sont inscrits au bas de chaque vitrail)\n\n1899, les stalles dans le choeur et nouveau chemin de croix\n\n1900, le dimanche 8 avril inauguration solennelle des nouvelles orgues. La tribune n’étant pas assez grande pour les recevoir, il a fallu l’agrandir par une espèce de terrasse. La chorale est née à cette occasion pour rehausser la solennité des offices\n\n1914, a vu l’électrification de l’église\n\nReconstruite dans le style gothique du XIIIe siècle, les colonnes de la nef datent de la reconstruction partielle exécutée au commencement du XVIe siècle. L’une d’elles engagée dans le pilier, à l’entrée du bas côté de gauche, porte en belle minuscule gothique la date « 1519 ».\n\nL’Eglise Saint Paul de Busnes détient encore bien des secrets. Tout ne peut être relaté ici mais les membres de l’Association restent à la disposition de toute personne s’y intéressant. ils sont aussi toujours à la recherche de documents, témoignages, photographies qui viendront agrandir leur documentation\n\n> Sources :\n>\n> Abbé BOCQUET, ancien curé de Busnes Dictionnaire historique et archéologique du département du pas-de-calais Registres paroissiaux",
                            "date": "2014-09-29",
                            "author": "Anne Marie Delporte",
                            "absolute_path": "themes/les-lieux-de-culte/l-eglise/les-eglises"
                        },
                        "la-restauration-de-l-eglise": {
                            "title": "La restauration de l’église",
                            "type": "blog",
                            "content": "Cliquez [ici](http://www.calameo.com/read/0039408363e4675e1a084) pour voir le diaporama du nettoyage de l’église",
                            "date": "2014-09-28",
                            "author": "Marie May",
                            "absolute_path": "themes/les-lieux-de-culte/l-eglise/la-restauration-de-l-eglise"
                        }
                    }
                },
                "le-presbyt-re": {
                    "title": "Le presbytère",
                    "type": "folder",
                    "content": {}
                },
                "les-chapelles": {
                    "title": "Les chapelles",
                    "type": "folder",
                    "content": {}
                }
            }
        },
        "le-village": {
            "title": "Le village",
            "type": "folder",
            "content": {
                "le-bourg": {
                    "title": "Le bourg",
                    "type": "folder",
                    "content": {}
                },
                "les-hameaux": {
                    "title": "Les hameaux",
                    "type": "folder",
                    "content": {}
                }
            }
        },
        "les-chateaux": {
            "title": "Les châteaux",
            "type": "folder",
            "content": {
                "la-chapelle-du-quesnoy": {
                    "title": "La Chapelle du Quesnoy",
                    "type": "blog",
                    "content": "Cette magnifique chapelle du XVIIIème siècle est le seul bâtiment qui subsiste du château du Quesnoy détruit par un incendie en 1898.\n\nCette chapelle fut probablement construite sous Louis Gabriel Cochet de Corbeaumont, Seigneur des lieux et Maire de Busnes. Dédiée à Notre Dame de Montligeon, quelques offices religieux y sont encore célébrés comme le 15 août et la messe en plein air.\n\nElle est la propriété de Delphine et David MESSEAN. Située au Hameau de l’Eclème, il est possible de la visiter en demandant l’autorisation aux propriétaires.\n\nCe bel édifice fut sauvé de la ruine par l’association créée par Thérèse-Marie SALOME.\n\nLa chapelle se retrouve désormais dans un écrin du plus bel effet, entourée de douves aménagées et d’un porche qui la met particulièrement en valeur.\n\nToutes nos félicitations et un grand merci pour la sauvegarde de notre patrimoine\n\n![](/feed-data/011.jpg)![](/feed-data/IMG_0011.jpg)",
                    "date": "2014-07-20",
                    "author": "Anne Marie Delporte",
                    "absolute_path": "themes/les-chateaux/la-chapelle-du-quesnoy"
                },
                "le-ch-teau-de-beaulieu": {
                    "title": "Le Château de Beaulieu",
                    "type": "blog",
                    "content": "Actuellement cet endroit est un haut lieu de la Gastronomie Française depuis qu’il a été repris et complètement aménagé par le célèbre cuisinier double étoilé **Marc MEURIN** en 2005 avec son épouse Claudine. A cette table exceptionnelle on peut y ajouter une vingtaine de chambres et suites de luxe qui le font désormais entrer dans la catégorie des « Relais et Châteaux ». En 2021, Marc MEURIN cède l'hôtel et le restaurant à **Christophe DUFOSSE** et son épouse Delphine. Christophe DUFOSSE perpétue la tradition culinaire et obtient en 2023 la 2ème étoile au Guide Michelin et l Etoile Verte.\n\nMais cet édifice a une histoire liée à plusieurs familles …\n\nIl a été construit en 1680 par **Jacques Le Jay, écuyer, seigneur de Massuère** (…)Il figure sur le plan de Cassini au XVIIIème siècle comme château.\n\nA l’époque, c’était une gentilhommière située dans une enceinte rectangulaire d’ un hectare, entourée de vastes douves, larges de 7 à 10 mètres. L’accès se faisait par la route de Lillers à Busnes. On accédait à la demeure par une avenue pavée bordée d’ormes. Un large pont de pierres et de briques franchissait les douves et permettait d’accéder à la maison par une grand porte à deux vantaux (actuellement on y trouve la salle de restaurant de la véranda).\n\nAprès cette large porte au centre de la maison on avait accès, par un passage voûté de 5 mètres de large, à la cour et aux dépendances.\n\nA l’époque cette maison d’habitation, construite en briques et pierres blanches, sur soubassements de grès se composait d’un corps simple à un étage couvert de tuiles avec deux ailes en retour. Le portail d’entrée était flanqué de deux petites tourelles en encorbellement, sortes d’échauguettes, dont l’une servait de cabinet de toilette et l’autre était employée à des usages intimes.\n\nAu rez de chaussée il y avait huit ou neuf pièces : cabinet- bureau ouvrant sur le jardin par une porte d’entrée, salle à manger, couloir-vestibule, antichambre, salon orné en 1770 de boiseries dans le goût du XVIIIème, chapelle où l’on disait la messe. Dans les ailes il y avait la cuisine, la relaverie, les offices, une petite chambre et cabinet. A l’étage, il y avait sept chambres éclairées par 19 fenêtres. Les domestiques couchaient sous les combles ou à la basse cour.\n\nLa cour contenait les bâtiments d’exploitation, avec un pigeonnier, la laiterie, des chambres, écuries, étables, granges, remise à voiture, hangar et petit pavillon pour le four à pain et la buanderie. Un grand jardin potager, des pâtures et un petit bois complétaient la propriété avec en dehors de l’enclos, une cinquantaine de mesures de terre en culture.\n\nLa vie des châtelains était celle des gentils hommes campagnards occupés à l’exploitation de leur terre. Mais la révolution de 1789 vient troubler la vie dans ce château paisible de Busnes …\n\nMademoiselle **Marie Antoinette Le Jay de Massuère** qui l’occupait à cette période, fut comme fille de noble, enfermée à Arras en 1794 à la prison des Baudets par ordre de Philippe Lebon. Cet événement, dramatique en soi, lui permit de faire la connaissance d’**Augustin Menche de Loisne** également emprisonné. Tous deux furent libérés au 9 Thermidor (24 juillet 1794) par la chute de Robespierre. Une liaison intime des deux familles s’ensuivit … et les deux jeunes gens se fiancèrent. En 1800, Augustin Menche de Loisne épousait son ancienne compagne de captivité ! …\n\nC’est ainsi que « Beaulieu » passa de la famille Le Jay de Massuère à celle de Menche de Loisne…\n\n**Emerance, fille de Marie Antoinette et d’Augustin**, reçut le château en héritage à la mort de ses parents. Elle poursuivit l’exploitation agricole dans les traditions de ses parents et en se signalant par ses libéralités envers la nouvelle église de Busnes (l’église actuelle). En 1868, célibataire sans enfants, elle institua pour légataire universel, un de ses neveux : **Auguste Menche de Loisne** né à Poitiers … il avait 15 ans. Emerance décéda en 1881.\n\nAuguste, après de solides études de droit partagea son temps entre la capitale et Busnes où il résidait le plus souvent. Historien, archéologue, membre titulaire de la commission départementale du Pas de Calais des monuments historiques, il laissa de très nombreux ouvrages sur la région.\n\nCelui-ci commença par supprimer les bâtiments d’exploitation en les remplaçant par un jardin à la française et une ferme, fit abattre l’avenue, supprima le passage qui coupait en deux l’habitation, déplaça l’ancien pont, et remplaça les toits de tuiles par des toits d’ardoise à la Mansard, éleva un grand pavillon sur l’emplacement de la chapelle qui avait été désaffectée à la Révolution et planta une grande partie du parc.\n\nPendant la guerre 14-18, Beaulieu servit de cible aux projectiles allemands, sans toutefois que les constructions aient été atteintes. D’importants dégâts furent causés au parc par les projectiles et aux appartements par les Etats-majors des troupes alliées. Tous ce dégâts purent être réparés en 1919 et 1920.\n\n**Henri, fils d’Auguste**, géra ensuite ce domaine jusqu’en 1966, date de son décès. La propriété fut, vendue en 1980 à un architecte béthunois, **Pierre Godart** qui le céda à son tour en 2003 à Monsieur et Madame MEURIN venus également de Béthune.\n\nAprès de longs mois de travaux l’établissement ouvrit ses portes fin 2005. On peut maintenant qualifier ce domaine de « Château de la Gastronomie »\n\n> **Article écrit par Jacques Delporte (Membre du Groupe de Recherches Historiques de Busnes)**\n\n![](/feed-data/im07.jpg)![](/feed-data/IMG_0018.jpg)![](/feed-data/a6kqpoeof.jpeg)",
                    "date": "2014-07-20",
                    "author": "Anne Marie Delporte",
                    "absolute_path": "themes/les-chateaux/le-ch-teau-de-beaulieu"
                },
                "les-autres-ch-teaux": {
                    "title": "Les autres châteaux",
                    "type": "folder",
                    "content": {}
                }
            }
        },
        "les-personnalites": {
            "title": "Les personnalités",
            "type": "folder",
            "content": {}
        },
        "la-malle-aux-souvenirs": {
            "title": "La malle aux souvenirs",
            "type": "blog",
            "content": "La « Malle aux Souvenirs » est un projet de la communauté Artois-Lys qui consiste à recueillir et à valoriser la mémoire des aînés de nos communes.\n\nAu sein de l’intercommunalité, un objectif de santé consiste à stimuler la mémoire des personnes âgées.\n\nPour l’Association « le Groupe Historique de Busnes », l’objectif principal est un objectif culturel : retracer l’histoire de notre territoire à travers le vécu de ses habitants.\n\nLe principe est d’aller à la rencontre des personnes âgées dans la commune, en rendez-vous collectifs ou individuels, pour recueillir leurs souvenirs, leurs anecdotes, leurs histoires …\n\nTous les sujets peuvent être abordés : écoles, métiers, vies dans les familles, traditions locales, religions, …\n\nTous les sujets peuvent être abordés : écoles, métiers, vies dans les familles, traditions locales, religions, …\n\nSi vous souhaitez apporter vos témoignages ou si vous avez des parents ou grands-parents qui accepteraient de nous recevoir, n’hésitez pas à nous contacter. Ce sera avec un immense plaisir que nous répondrons à votre demande et nous vous en remercions à l’avance.",
            "date": "2014-09-29",
            "author": "Anne Marie Delporte",
            "absolute_path": "themes/la-malle-aux-souvenirs"
        }
    },
    "publications": {
        "abecedaire": {
            "title": " ABECEDAIRE",
            "type": "blog",
            "content": "**Busnes de A à Z…**\n\nQuelle belle idée que cet abécédaire historique de notre village ! Evidemment, il a fallu faire des choix et se creuser la tête pour les lettres W, X ou Y. Au fil des pages, vous découvrirez une multitude d’informations historiques aussi diverses qu’originales. Vous en apprendrez beaucoup sur les deux châteaux de Busnes, vous découvrirez ou redécouvrirez quelques trésors de notre église, vous voyagerez dans le temps avec Cochet de Corbeaumont…\n\nIl a fallu aussi du temps pour écrire cet abécédaire ; un travail long et minutieux de recherches, de vérification, de concertation et d’écriture. Je tiens à féliciter tous les membres du Groupe de Recherches Historiques de Busnes qui ont travaillé sur cet ouvrage qui fera date. En effet, quoi de plus enrichissant pour des passionnés d’histoires locales que d’éditer un si beau livre que les Busnois auront plaisir à feuilleter.\n\nPourtant, ce travail ne saurait être un aboutissement, il reste tant de choses à découvrir sur l’histoire de notre beau village…\n\nBonne lecture.\n\nFranck HANNEBICQ, maire de Busnes.\n\nSeptembre 2022\n\n***\n\nCe projet d’ABECEDAIRE sur notre village de Busnes couvait depuis de nombreuses années. Nous nous devions de le réaliser et pourquoi ne pas profiter de cette 40ème Foire à l’Echalote de Busnes pour s’y atteler.\n\nLe résultat est un véritable travail d’équipe.\n\nIl a demandé de nombreuses recherches et de nombreuses heures de travail y ont été consacrées.\n\nIl vous permettra de découvrir, de vous remémorer, de commenter la vie à Busnes ces dernières décennies.\n\nNous connaissons toutes et tous le Château de Beaulieu, la Place du village, l’Eglise Saint Paul, … mais connaissez-vous leur histoire ? Alors, plongez dans cet abécédaire qui, nous l’espérons, vous enchantera.\n\nNous vous souhaitons une très bonne lecture.\n\nAnne-Marie Delporte\n\nPrésidente du « Groupe de Recherches Historiques de Busnes »",
            "date": "2023-07-26",
            "author": "Anne-Marie DELPORTE",
            "absolute_path": "publications/abecedaire"
        },
        "la-guerre-14-18-a-busnes": {
            "title": " LA GUERRE 14-18 A BUSNES",
            "type": "blog",
            "content": "LE DEVOIR DE MEMOIRE\n\nLa Guerre de 14-18 est le premier conflit mondial de tous les temps. Elle a été terriblement meurtrière. Elle devait être brève mais durera finalement plus de quatre ans, faisant finalement des dizaines de millions de morts civils et militaires. Elle débutera le 24 juillet 1914 et se terminera par la signature de l’armistice au wagon de Rethondes le 11 novembre 1918.\n\nDe nombreux témoignages subsistent sur cette période mais malheureusement « nos Poilus » rescapés ont tous disparus.\n\nLe devoir de mémoire est donc d’autant plus important et apparaît comme impératif. Heureusement nous avons la chance d’avoir des personnes qui consacrent une grande partie de leur loisir à faire connaître ces évènements certes dramatiques, mais qu’il ne faut en aucun cas oublier. Et pour cela nous pouvons compter sur l’auteur de ce manuscrit qui est sans aucun doute l’aboutissement d’un long parcours de recherches.\n\nCe passionné de la Guerre 14-18 qu’est Franck, ne pouvait se contenter de quelques nouvelles. Non seulement Franck se passionne pour cette période de notre histoire de France mais de plus il est très attaché à son village.\n\nProfesseur d’Histoire-Géographie et toujours très impliqué dans la vie associative de notre village, il fut membre de notre Association le « Groupe de Recherches Historiques de Busnes » dès sa création en 1995 et il en sera le Président pendant 10 ans. Il quitta son poste après son élection en qualité de Maire de notre commune, estimant ne pouvoir cumuler les deux fonctions. Il décida ainsi de se consacrer à la vie de son village et de ses habitants. Mais il est toujours membre actif de notre association et nous rejoint aux réunions dès qu’il le peut.\n\n Franck est « conservateur » et garde tout document l’intéressant. C’est ainsi qu’il a pu partager avec ses lecteurs les souvenirs de ses arrières grands-parents. Il n’hésite pas non plus à traverser la Manche pour se rendre à l’Imperial War Museum de Londres afin de trouver des renseignements et surtout des photos en rapport avec Busnes. Il fouine, interroge, rend visite aux busnoises et busnois, classe, répertorie, écrit et PARTAGE.\n\nLorsque Franck m’a demandé si j’acceptai d’écrire la préface de son livre, j’avoue que j’ai été très interpellée par cette demande. Quelle responsabilité mais aussi quel honneur pour moi de l’accompagner dans cette grande aventure que représente l’édition d’un livre. Nous avons sans doute des points communs puisque bien que n’étant pas native de Busnes, j’ai repris la présidence de l’association à son départ. Mais ce dont je suis certaine, c’est que le point commun le plus important qui nous relie, c’est l’amour des Gens. Nous aimons les gens, nous aimons leur faire plaisir et s’ils sont heureux, nous le sommes aussi.\n\nBusnoises, busnois, prenez du plaisir à le lire. Vous retrouverez des noms connus faisant partie de votre famille, de vos amis, de vos voisins…. Ne les oublions pas ces hommes partis à la guerre en laissant femmes et enfants s’occuper de la maison, de la ferme, des champs, des bêtes ….\n\nMerci Franck pour ce témoignage et un grand bravo pour ta ténacité. Le résultat est là sous nos yeux.\n\nMerci de le partager avec nous.\n\nAnne-Marie Delporte\n\nPrésidente du « Groupe de Recherches Historiques de Busnes »\n\nLe bénéfice de la vente de ce livre ira en intégralité à l’Association et permettra d’améliorer nos recherches sur notre village et ses habitants. Franck l’a souhaité ainsi. Merci à lui",
            "date": "2023-07-26",
            "author": " Anne-Marie DELPORTE",
            "absolute_path": "publications/la-guerre-14-18-a-busnes"
        }
    }
};

const ROOT_FOLDER_IDS: Record<string, string> = {
    "newsletters": "clnewslettersroot00000000",
    "events": "cleventsroot0000000000000",
    "themes": "clthemesroot0000000000000",
    "publications": "clpublicationsroot0000000"
};

async function upsertFolder(slug: string, name: string, parentId: string | null) {
    const folder = await prisma.folder.findFirst({
        where: { slug, parentId }
    });

    if (folder) {
        return prisma.folder.update({
          where: {id: folder.id},
          data: {name}
        });
    } else {
        return prisma.folder.create({
          data: {slug, name, parentId}
        });
    }
}

async function upsertPost(slug: string, title: string, content: string, author: string, date: string | null, folderId: string | null) {
    const post = await prisma.post.findFirst({
        where: { slug, folderId }
    });

    const data = {
        title,
        content,
        author: author.trim(),
        createdAt: date ? new Date(date) : new Date(),
        folderId
    };

    if (post) {
        return prisma.post.update({
          where: {id: post.id},
          data
        });
    } else {
        return prisma.post.create({
          data: {...data, slug}
        });
    }
}

async function processContent(content: Content, folderId: string) {
    for (const [slug, entry] of Object.entries(content)) {
        if (entry.type === 'blog') {
            console.log(`  Adding post: ${entry.title} (${slug})`);
            await upsertPost(slug, entry.title, entry.content, entry.author || 'Admin', entry.date || null, folderId);
        } else {
            console.log(`  Adding folder: ${entry.title} (${slug})`);
            const folder = await upsertFolder(slug, entry.title, folderId);
            if (entry.content) {
                await processContent(entry.content, folder.id);
            }
        }
    }
}

async function main() {
    console.log("Starting seed from hardcoded data...");

    for (const [catSlug, catData] of Object.entries(FEED_DATA)) {
        const rootId = ROOT_FOLDER_IDS[catSlug];
        if (!rootId) continue;

        console.log(`Processing root category: ${catSlug}`);
        await processContent(catData, rootId);
    }

    console.log("Seed finished successfully.");
}

main()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
