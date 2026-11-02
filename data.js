/* Bright Bible Play: conteudo (100 atividades). Versiculos: KJV (dominio publico). Textos originais. */
const DATA={};
DATA.ws=[
 ['Noah’s Ark',['ARK','DOVE','RAIN','NOAH','LAMB','BOAT','WATER','RAINBOW','ANIMALS']],
 ['God Makes the World',['LIGHT','SUN','MOON','STARS','SEA','LAND','PLANTS','BIRDS','FISH']],
 ['David and Goliath',['DAVID','GOLIATH','SLING','STONE','SHEPHERD','GIANT','BRAVE','HARP']],
 ['Daniel and the Lions',['DANIEL','LIONS','DEN','PRAYER','KING','ANGEL','BRAVE','FAITH']],
 ['Jonah and the Big Fish',['JONAH','FISH','SEA','STORM','SHIP','NINEVEH','PRAYED','THREE']],
 ['Baby Moses',['MOSES','EGYPT','BASKET','RIVER','STAFF','MANNA','PHARAOH','SEA']],
 ['The Christmas Story',['MARY','JOSEPH','BABY','STAR','MANGER','ANGELS','SHEPHERDS','BETHLEHEM']],
 ['The Easter Story',['JESUS','CROSS','TOMB','STONE','EASTER','RISEN','GARDEN','LOVE']],
 ['Fruit of the Spirit',['LOVE','JOY','PEACE','KIND','GOOD','FAITH','GENTLE','FRUIT']],
 ['Books of the Bible',['GENESIS','EXODUS','PSALMS','MATTHEW','MARK','LUKE','JOHN','RUTH']],
 ['Miracles of Jesus',['HEAL','WINE','BREAD','FISH','STORM','BLIND','WATER','SEA']],
 ['Stories Jesus Told',['SEED','SOWER','SHEEP','COIN','TREASURE','PEARL','YEAST','LOST']],
 ['Joseph and His Coat',['JOSEPH','COAT','JACOB','DREAM','BROTHERS','EGYPT','PHARAOH','FORGAVE']],
 ['Ruth and Naomi',['RUTH','NAOMI','BOAZ','FIELD','GRAIN','LOYAL','HARVEST','BETHLEHEM']],
 ['Queen Esther',['ESTHER','QUEEN','KING','BRAVE','PALACE','PRAYED','PEOPLE','HAMAN']],
 ['The Garden of Eden',['ADAM','EVE','GARDEN','TREE','SNAKE','FRUIT','RIVER','EDEN']],
 ['The Good Shepherd',['SHEPHERD','SHEEP','PASTURE','WATERS','STAFF','VALLEY','GOODNESS','MERCY']],
 ['Armor of God',['BELT','SHIELD','HELMET','SWORD','TRUTH','FAITH','PEACE','SALVATION']],
 ['Friends of Jesus',['PETER','ANDREW','JAMES','JOHN','PHILIP','MATTHEW','THOMAS','SIMON']],
 ['Prayer and Thanks',['PRAY','THANKS','PRAISE','SING','HOPE','TRUST','AMEN','LISTEN']]
].map(([t,w])=>({t,w}));

const MAZE_THEMES=[['🐑','🌿','Help the lamb find the green pasture'],['🕊️','🌳','Help the dove find the olive tree'],['🐪','⭐','Help the camel follow the star'],['🐟','🌊','Help the fish swim to the sea']];
DATA.maze=[5,5,6,6,7,7,8,8,8,9,9,10,10,10,11,11,12,12,13,13].map((n,i)=>({n,th:i%4}));

DATA.verse=[
 ['Genesis 1:1','In the beginning God created the heaven and the earth.',['beginning','created','earth']],
 ['Psalm 23:1','The Lord is my shepherd; I shall not want.',['shepherd','want']],
 ['Psalm 119:105','Thy word is a lamp unto my feet, and a light unto my path.',['lamp','light','path']],
 ['Psalm 118:24','This is the day which the Lord hath made; we will rejoice and be glad in it.',['day','rejoice','glad']],
 ['Psalm 100:1','Make a joyful noise unto the Lord, all ye lands.',['joyful','noise','lands']],
 ['Proverbs 15:1','A soft answer turneth away wrath: but grievous words stir up anger.',['soft','wrath','anger']],
 ['Proverbs 3:5','Trust in the Lord with all thine heart; and lean not unto thine own understanding.',['Trust','heart','understanding']],
 ['Philippians 4:13','I can do all things through Christ which strengtheneth me.',['things','Christ','strengtheneth']],
 ['Ephesians 4:32','Be ye kind one to another.',['kind','another']],
 ['Ephesians 6:1','Children, obey your parents in the Lord: for this is right.',['obey','parents','right']],
 ['Joshua 1:9','Be strong and of a good courage; be not afraid, neither be thou dismayed.',['strong','courage','afraid','dismayed']],
 ['1 John 4:8','God is love.',['love']],
 ['Psalm 107:1','O give thanks unto the Lord, for he is good.',['thanks','good']],
 ['John 3:16','For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',['loved','begotten','believeth','everlasting']],
 ['Matthew 19:14','But Jesus said, Suffer little children, and forbid them not, to come unto me: for of such is the kingdom of heaven.',['little','children','kingdom']],
 ['Matthew 7:7','Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you.',['Ask','seek','knock']],
 ['Psalm 56:3','What time I am afraid, I will trust in thee.',['afraid','trust']],
 ['Isaiah 41:10','Fear thou not; for I am with thee: be not dismayed; for I am thy God.',['Fear','with','dismayed']],
 ['Luke 6:31','And as ye would that men should do to you, do ye also to them likewise.',['men','likewise']],
 ['1 Thessalonians 5:17','Pray without ceasing.',['Pray','ceasing']]
].map(([ref,text,blanks])=>({ref,text,blanks}));

DATA.quiz=[
 ['Creation and the Garden',[['What did God create on the first day?','Light','Animals','The sea'],['On which day did God rest?','The seventh day','The first day','The third day'],['Who was the first man God made?','Adam','Cain','Noah'],['What was the name of the first woman?','Eve','Mary','Sarah'],['Where did Adam and Eve live?','The Garden of Eden','Egypt','Bethlehem'],['What did God put in the sky to shine at night?','The moon and stars','A rainbow','Clouds']]],
 ['Noah and the Flood',[['Who built the ark?','Noah','Moses','David'],['How many days and nights did the rain fall?','40','7','100'],['Which bird brought Noah an olive leaf?','A dove','An owl','A parrot'],['What did God put in the sky as a promise?','A rainbow','A star','A cloud'],['How many people were on the ark?','8','2','12'],['What was the ark made of?','Wood','Stone','Gold']]],
 ['David the Shepherd Boy',[['What was David’s job as a boy?','Shepherd','Fisherman','Carpenter'],['Who was the giant David faced?','Goliath','Pharaoh','Herod'],['What did David use against Goliath?','A sling and a stone','A sword','A spear'],['How many smooth stones did David pick up?','5','1','12'],['What instrument did David play?','The harp','The drum','The trumpet'],['Who anointed David to be king?','Samuel','Moses','Aaron']]],
 ['Daniel and His Friends',[['Who was put in the lions’ den?','Daniel','Joseph','Peter'],['What did Daniel do three times a day?','Pray','Sing','Travel'],['Who shut the lions’ mouths?','God’s angel','The king','The guards'],['Who was thrown into the fiery furnace?','Shadrach, Meshach and Abednego','Peter, James and John','Matthew, Mark and Luke'],['What did the three friends refuse to do?','Bow to the golden statue','Eat bread','Sing songs'],['Who was king when Daniel was in the lions’ den?','Darius','David','Herod']]],
 ['Jonah and the Big Fish',[['Who was swallowed by a big fish?','Jonah','Daniel','Elijah'],['How many days was Jonah inside the fish?','Three','One','Seven'],['To which city did God send Jonah?','Nineveh','Bethlehem','Jericho'],['What did Jonah do at first?','Ran away on a ship','Built a boat','Sang for joy'],['What happened to the storm when Jonah was thrown into the sea?','It stopped','It grew bigger','It froze'],['What did the people of Nineveh do after Jonah’s message?','Turned from wrong and prayed','Ignored him','Built a wall']]],
 ['Moses and the People',[['Where did baby Moses float?','In a basket on the river','On a big ship','On a camel'],['Who found baby Moses in the river?','Pharaoh’s daughter','A shepherd','A soldier'],['What did God speak to Moses from?','A burning bush','A tall tree','A cloud of dust'],['What did God give the people to eat in the desert?','Manna','Fish soup','Apples'],['What did God give Moses on the mountain?','The Ten Commandments','A crown','A map'],['Which sea did God part for his people?','The Red Sea','The Dead Sea','The Sea of Galilee']]],
 ['The Birth of Jesus',[['In which town was Jesus born?','Bethlehem','Nazareth','Jerusalem'],['Who was Jesus’ mother?','Mary','Martha','Ruth'],['Where was baby Jesus laid?','In a manger','In a palace','In a boat'],['Who first heard the angels’ good news?','Shepherds','Kings','Soldiers'],['What led the wise men?','A star','A river','A lamp'],['What gifts did the wise men bring?','Gold, frankincense and myrrh','Bread, fish and honey','Silver, wool and oil']]],
 ['Friends of Jesus',[['How many disciples did Jesus choose?','12','7','20'],['What was Peter’s job before he followed Jesus?','Fisherman','Soldier','Teacher'],['Who climbed a tree to see Jesus?','Zacchaeus','Peter','Matthew'],['What did Jesus say about little children?','Let them come to me','Make them wait','Send them away'],['Which disciple wanted to see Jesus’ hands to believe?','Thomas','John','Andrew'],['Which disciple was a tax collector?','Matthew','Peter','James']]],
 ['Miracles of Jesus',[['What did Jesus turn into wine at a wedding?','Water','Milk','Juice'],['About how many people ate from 5 loaves and 2 fish?','Over 5,000','12','100'],['What did Jesus calm on the lake?','A storm','A volcano','A crowd'],['Who did Jesus raise after four days?','Lazarus','Peter','Judas'],['What did Jesus do for blind Bartimaeus?','Healed his eyes','Gave him coins','Took him home'],['What did Jesus walk on?','Water','Fire','Clouds']]],
 ['Stories Jesus Told',[['In the lost sheep story, how many sheep stayed safe while the shepherd searched?','99','9','10'],['In the Good Samaritan story, who helped the hurt man?','A Samaritan','A priest','A soldier'],['Where did the wise man build his house?','On the rock','On the sand','On a cloud'],['What did the father do when his son came home?','Welcomed him with joy','Sent him away','Ignored him'],['What did the woman lose in Jesus’ story?','A coin','A ring','A sheep'],['In the sower story, what did seeds on good soil become?','Good crops','Weeds','Rocks']]],
 ['Heroes of Faith',[['Who was told to leave home and go to a new land?','Abraham','Noah','Samson'],['Who was thrown in a pit by his brothers?','Joseph','Daniel','David'],['Who stayed with Naomi and helped her?','Ruth','Esther','Mary'],['Who became queen and helped save her people?','Esther','Ruth','Deborah'],['Who prayed for rain on Mount Carmel?','Elijah','Elisha','Samuel'],['Who asked God for wisdom?','Solomon','Saul','Aaron']]],
 ['Bible Basics',[['How many books are in the Bible?','66','40','100'],['What is the first book of the Bible?','Genesis','Psalms','Matthew'],['What is the last book of the Bible?','Revelation','Acts','Jude'],['Which book is full of songs and prayers?','Psalms','Proverbs','Job'],['What is the first book of the New Testament?','Matthew','Genesis','John'],['What are the first four books of the New Testament called?','The Gospels','The Psalms','The Prophets']]]
].map(([t,q])=>({t,q:q.map(([q,a,...o])=>({q,a,o}))}));

DATA.who=[
 ['Heroes of the Old Testament',[['Noah','I built a very big boat, and God kept my family and the animals safe.','🚢'],['David','I was a shepherd boy. I faced a giant with a sling and a stone.','🪨'],['Daniel','I prayed, and God shut the mouths of the lions.','🦁'],['Jonah','A big fish swallowed me, and I was inside it for three days.','🐟']]],
 ['Brave and Faithful',[['Moses','I led God’s people out of Egypt, and the sea opened for us.','🌊'],['Joseph','My father gave me a coat of many colors.','🧥'],['Esther','I became a queen and was brave for my people.','👑'],['Ruth','I stayed with Naomi and went with her to Bethlehem.','🌾']]],
 ['Friends of Jesus',[['Peter','I was a fisherman. Jesus called me to follow him.','🎣'],['Zacchaeus','I climbed a tree to see Jesus.','🌳'],['Mary','I am the mother of Jesus.','💖'],['Thomas','I wanted to see Jesus’ hands before I believed.','👋']]],
 ['Listening to God',[['Abraham','God told me to look at the stars and promised me a big family.','⭐'],['Samuel','I heard God call my name in the night.','🌙'],['Elijah','Ravens brought me food, and God answered my prayer for rain.','🌧️'],['Solomon','I asked God for wisdom, and I became a wise king.','📜']]],
 ['Around Jesus’ Birth',[['Mary','An angel told me I would have a special baby.','💖'],['Joseph','I was a carpenter in Nazareth and cared for Mary and Jesus.','🪚'],['John the Baptist','I baptized people in the Jordan River and baptized Jesus.','💧'],['Gabriel','I am the angel who brought good news to Mary.','👼']]],
 ['Helpers of the Church',[['Paul','I wrote many letters to the first churches.','✉️'],['Timothy','I was Paul’s young friend. I learned the Scriptures as a child.','📖'],['Lydia','I sold purple cloth and opened my home to others.','🏠'],['Luke','I was a doctor who wrote a Gospel.','📝']]]
].map(([t,items])=>({t,items:items.map(([a,clue,e])=>({a,clue,e}))}));

const _L={LAMB:'🐑',DOVE:'🕊️',FISH:'🐟',LION:'🦁',CAMEL:'🐪',SNAKE:'🐍',SUN:'☀️',MOON:'🌙',STAR:'⭐',TREE:'🌳',SEED:'🌱',CLOUD:'☁️',BOAT:'⛵',WATER:'💧',RAINBOW:'🌈',WHALE:'🐋',BIRD:'🐦',MOUNTAIN:'⛰️',BREAD:'🍞',GRAPES:'🍇',WHEAT:'🌾',FLOWER:'🌸',HOUSE:'🏠',CROWN:'👑',BIBLE:'📖',HEART:'❤️',CANDLE:'🕯️',BELL:'🔔',ANGEL:'👼',GIFT:'🎁',FIRE:'🔥',KEY:'🔑',HORSE:'🐴'};
DATA.letters=[['Animals of the Bible','LAMB DOVE FISH LION CAMEL SNAKE'],['God’s Creation','SUN MOON STAR TREE SEED CLOUD'],['Water and Sky','BOAT WATER RAINBOW WHALE BIRD MOUNTAIN'],['Food, Farm and Home','BREAD GRAPES WHEAT FLOWER HOUSE CROWN'],['Special Things','BIBLE HEART CANDLE BELL ANGEL GIFT'],['Surprise Words','FIRE KEY HORSE BIRD SEED CROWN']].map(([t,s])=>({t,items:s.split(' ').map(w=>({w,e:_L[w]}))}));

DATA.story=[
 ['God Makes the World',['God makes light','God makes the sky and the sea','God makes land and plants','God makes the sun, moon and stars','God makes animals and people']],
 ['Noah and the Ark',['Noah builds the ark','The animals go in','The rain falls','Noah sends out a dove','A rainbow shines in the sky']],
 ['David and Goliath',['David is a shepherd boy','Goliath challenges the army','David picks five smooth stones','David uses his sling','The giant falls']],
 ['Daniel in the Lions’ Den',['Daniel prays to God every day','Men trick the king','Daniel is put in the lions’ den','An angel shuts the lions’ mouths','The king is glad Daniel is safe']],
 ['Jonah and the Big Fish',['God tells Jonah to go to Nineveh','Jonah runs away on a ship','A great storm comes','A big fish swallows Jonah','Jonah goes to Nineveh']],
 ['The Birth of Jesus',['Mary and Joseph travel to Bethlehem','Jesus is born and laid in a manger','Angels tell the shepherds','Shepherds visit baby Jesus','Wise men follow the star']],
 ['The Good Samaritan',['A man is hurt on the road','A priest walks by','A Levite walks by','A Samaritan stops to help','He takes him to an inn']],
 ['The Lost Sheep',['A shepherd has 100 sheep','One sheep is lost','The shepherd leaves the 99','He finds the lost sheep','He is glad and tells his friends']]
].map(([t,s])=>({t,s}));

DATA.memory=[
 {t:"Animals of the Bible",e:["🐑","🕊️","🐟","🦁","🐪","🐴","🐋","🐦"]},
 {t:"God’s Creation",e:["☀️","🌙","⭐","🌳","🌈","🌊","⛰️","☁️"]},
 {t:"Christmas Story",e:["⭐","👼","🐑","🐪","🎁","👶","🔔","👑"]},
 {t:"Garden and Field",e:["🍇","🌾","🌱","🌸","🍞","🏠","🌳","🐑"]},
 {t:"Kind Hearts",e:["❤️","📖","🎁","🤝","🙏","😊","🕊️","🔔"]}
];
DATA.coloring=['Rainbow Promise','Shepherd’s Field','Star of Bethlehem'].map(t=>({t}));
