function add_targets(paths){
    for (var i=0 ; i<paths.length ; i++){
        var target_icon = document.createElement("img");
        var target_modal = document.getElementById("target_modal");
        target_icon.className = "player_icon";
        target_icon.id = "target_icon" + i;
        target_icon.style.marginLeft = 40 * paths[i][paths[i].length-1].x + 35 + "px";
        target_icon.style.marginTop = 40 * paths[i][paths[i].length-1].y + 5 + "px";
        target_icon.style.width = 30 + "px";
        target_icon.style.height = 30 + "px";
        target_icon.style.opacity = 0.6;
        target_icon.src = "images/tile/dest.png";
        target_icon.dataset.index = i;
        target_modal.appendChild(target_icon);
    }
}

// 建立遊戲版上的各個格子
function add_tiles(){
    var gameboard = document.getElementById("gameboard");
    for (var i = 0; i < tileData.length; i++) {
        for (var j=0 ; j<tileData[i].length; j++){
            var tile = document.createElement("div");
            tile.className = tileData[i][j].class;
            gameboard.appendChild(tile);
        }
    }
}

// 建立各大地點的附加文字
function add_board_text(){
    for (var i = 0; i < placeData.length; i++) {
        var text = document.createElement("div");
        text.className = "place_text";
        text.style.marginLeft = placeData[i].margin_left + 'px';
        text.style.marginTop = placeData[i].margin_top + 'px';
        text.textContent = placeData[i].text;
        document.body.appendChild(text);
    }
}

function get_player_data(data){
    var ans = '<center> <b> <font size=5px>' + data.name + '資料 </font> </b> </center> <br>';
    
    ans += '<span class="icons money"> </span>' + '<font color="blue"> 金錢： </font>$' + data.money + '<br>';
    ans += '<span class="icons shield"> </span>' + '<font color="blue"> 嫁禍無效卡： </font> ' + data.shield + '張<br>';
    ans += '<span class="icons dice"> </span>' + '<font color="blue"> 控骰卡： </font>';
    if (data.dice.length == 0) ans += '無';
    for (var j = 0; j < data.dice.length; j++) {
        if (j != 0) ans += '、';
        ans += '骰' + data.dice[j] + '  ';
    }
    ans += '<br> <span class="icons buff"> </span>' + '<font color="blue"> 永久效果：</font>';
    if (data.buff.length == 0) ans += '無';
    for (var j = 0; j < data.buff.length; j++) {
        if (j != 0) ans += '、';
        if (data.buff[j].id == 1) ans += '<span class="icons buff1" > </span>';
        if (data.buff[j].id == 2) ans += '<span class="icons buff2" > </span>';
        if (data.buff[j].id == 3) ans += '<span class="icons buff3" > </span>';
        if (data.buff[j].id == 4) ans += '<span class="icons buff4" > </span>';
        if (data.buff[j].id == 5) ans += '<span class="icons buff5" > </span>';
        if (data.buff[j].id == 6) ans += '<span class="icons buff6" > </span>';
        if (data.buff[j].id == 7) ans += '<span class="icons buff7" > </span>';
        if (data.buff[j].id == 8) ans += '<span class="icons buff8" > </span>';
        if (data.buff[j].id == 9) ans += '<span class="icons buff9" > </span>';
        if (data.buff[j].id == 10) ans += '<span class="icons buff10" > </span>';
    }
    return ans;
}

// 建立玩家資料
function add_player_data(){
    var player_data = document.getElementById("player_data");
    for (var i = 0; i < playerData.length; i++) {
        var player = document.createElement("div");
        player.className = "player_status";
        player.id = playerData[i].name;
        player.innerHTML = get_player_data(playerData[i]);
        player_data.appendChild(player);
        
        var player_icon = document.createElement("img");
        player_icon.className = "player_icon";
        player_icon.id = playerData[i].name + "_icon";
        player_icon.style.marginLeft = 40 * playerData[i].x + i % 2 * 10 + 30 + "px";
        player_icon.style.marginTop = 40 * playerData[i].y + Math.floor(i/2) * 10 + "px";
        player_icon.src = "images/player/" + (i+1) + ".png";
        document.body.appendChild(player_icon);
                                                                        
    }
}
                                                                        
function init(){
    playerData = [
        { name: "玩家一", id: 0, person: false, money: 0, shield: 0, dice: [], buff:[], x: 0, y: 23 },
        { name: "玩家二", id: 1, person: false, money: 0, shield: 0, dice: [], buff:[], x: 0, y: 23 },
        { name: "玩家三", id: 2, person: false, money: 0, shield: 0, dice: [], buff:[], x: 0, y: 23 },
        { name: "玩家四", id: 3, person: false, money: 0, shield: 0, dice: [], buff:[], x: 0, y: 23 }
    ];
    quesData = [
                {id:0, money: 30, title: "我愛林乾", description:"太愛吃林乾了，所以回建中吃了一大碗", effect: "前往建國中學"},
                {id:1, money: 30, title: "背視力表", description:"把建中的健檢視力表整張背下來，被健康中心的阿姨抓去約談", effect: "前往建國中學"},
                {id:2, money: 30, title: "老師的處罰", description:"拿歷史老師的名字開玩笑，老師罰你去歷史博物館寫學習單", effect: "前往歷史博物館"},
                {id:3, money: 30, title: "成發影片", description:"為了錄製成發影片，跑到植物園取景", effect: "前往植物園"},
                {id:4, money: 30, title: "長得太像通緝犯", description:"因為被誤會是通緝犯而被抓到警察局", effect: "前往中正二分局"},
                {id:5, money: 30, title: "定向越野", description:"體育老師帶你去中正紀念堂玩定向越野", effect: "前往中正紀念堂"},
                {id:6, money: 30, title: "換硬幣", description:"在上學時間蹺課去中央銀行拿了超多20元硬幣來用", effect: "前往中央銀行"},
                {id:7, money: 20, title: "躲貓貓", description:"你聽說校長室在紅樓，於是你跑到西門紅樓找校長", effect: "前往西門"},
                {id:8, money: 20, title: "童心未泯", description:"你穿著建中制服跑去公園玩兒童溜滑梯", effect: "前往二二八公園"},
                {id:9, money: 20, title: "鈉爆", description:"做化學實驗時，把鈉丟進水裡引發大爆炸", effect: "前往台大醫院"},
                {id:10, money: 20, title: "校慶", description:"被你的朋友強行拉去看成功的校慶", effect: "前往成功高中"},
                {id:11, money: 10, title: "窩不知道", description:"遊戲作者創了北門這個點，但是他也不知道有什麼理由會去那邊", effect: "前往北門"},
                {id:12, money: 10, title: "考指考", description:"你的學測國寫感性題只拿了8分，所以去北車報指考衝刺班", effect: "前往台北車站"},
                {id:13, money: 10, title: "慶功宴", description:"成發結束後，去北車附近的餐廳吃慶功宴", effect: "前往台北車站"},
                {id:14, money: 10, title: "奧林匹亞金牌", description:"拿到奧林匹亞金牌，總統想親自接見你", effect: "前往總統府"},
                {id:15, money: 100, title: "考試50分", description:"媽媽說你考試100分就可以拿到100元，而你考了50分", effect: "獲得50元"},
                {id:16, money: 100, title: "遊戲贏家", description:"在經濟學課堂的賽局遊戲之中成為贏家", effect: "獲得100元"},
                {id:17, money: 100, title: "短期家教", description:"開了時薪1000的家教，結果你只教了6分鐘就被開除", effect: "獲得100元"},
                {id:18, money: 100, title: "中大獎", description:"砸了超多的錢換來超多發票，這是你這輩子第一次中獎", effect: "獲得200元"},
                {id:19, money: 20, title: "我的豆花，30塊！", description:"買了豆花結果過馬路時不小心掉到地上", effect: "失去30元"},
                {id:20, money: 50, title: "借錢忘記還", description:"借同學100元吃午餐，他到畢業前都沒有還給你", effect: "失去100元"},
                {id:21, money: 100, title: "遊戲成癮", description:"在遊戲中抽卡太非洲，花光了所有積蓄還是沒抽到", effect: "失去所有錢"},
                {id:22, money: 100, title: "魯神的造訪", description:"被遊戲作者的強大魯蛇力傳染，大幅增加你到北一女的難度", effect: "失去所有道具卡"},
                {id:23, money: 50, title: "松鼠的逆襲", description:"你的控骰卡放在教室的桌上，被松鼠給咬走了", effect: "失去所有控骰卡"},
                {id:24, money: 50, title: "現充爆炸吧", description:"遊戲作者為了保護你免於爆炸，好心賜予你這張卡片", effect: "失去所有永久效果卡"},
                {id:25, money: 10, title: "BUG", description:"遊戲出bug，導致玩家的位置被弄亂了", effect: "與離北一女最近的對手交換位置"},
                {id:26, money: 10, title: "有錢人的生活", description:"拿到這張卡，可以讓你瞬間變成有錢人哦！", effect: "與最有錢的對手交換金錢數量"},
                {id:27, money: 10, title: "輪換物資", description:"班上舉行聖誕節的交換禮物，而你準備了你的道具卡當禮物", effect: "與最多道具卡的對手交換所有道具卡"},
                {id:28, money: 100, title: "兩張", description:"沒有什麼事是用一張道具卡解決不了的。如果有，那就用兩張", effect: "獲得兩張道具卡"},
                {id:29, money: 100, title: "班導的禮物", description:"你在2月30日這天去班導家玩，他送你兩張道具卡當作禮物", effect: "獲得兩張道具卡"}
            ];
    starData = [
                {type: "shield", effect:""},
                {type: "shield", effect:""},
                {type: "shield", effect:""},
                {type: "shield", effect:""},
                {type: "shield", effect:""},
                {type: "shield", effect:""},
                {type: "shield", effect:""},
                {type: "shield", effect:""},
                {type: "shield", effect:""},
                {type: "shield", effect:""},
                {type: "dice", effect:1},
                {type: "dice", effect:1},
                {type: "dice", effect:2},
                {type: "dice", effect:2},
                {type: "dice", effect:3},
                {type: "dice", effect:3},
                {type: "dice", effect:4},
                {type: "dice", effect:4},
                {type: "dice", effect:5},
                {type: "dice", effect:5},
                {type: "dice", effect:6},
                {type: "dice", effect:6},
                {type: "dice", effect:1},
                {type: "dice", effect:2},
                {type: "dice", effect:3},
                {type: "dice", effect:4},
                {type: "dice", effect:5},
                {type: "dice", effect:6},
                {type: "dice", effect:10},
                {type: "dice", effect:10},
                {type: "buff", id:1, effect:"可以免費將？卡嫁禍於人"},
                {type: "buff", id:2, effect:"他人無法用嫁禍無效卡來抵擋你的嫁禍"},
                {type: "buff", id:3, effect:"無限量嫁禍無效卡"},
                {type: "buff", id:4, effect:"到達星星格時，可一次抽兩張道具卡"},
                {type: "buff", id:5, effect:"每回合結束後獲得10元"},
                {type: "buff", id:6, effect:"金錢的收入加倍"},
                {type: "buff", id:7, effect:"每回移動步數+3 (控骰卡除外)"},
                {type: "buff", id:8, effect:"每次被有效嫁禍時，可抽一張道具卡"},
                {type: "buff", id:9, effect:"踩在有其他人的格子時，可搶走他至多50元"},
                {type: "buff", id:10, effect:"使用傳送門的所需費用折半"}
            ]
    for (var i=quesData.length-1 ; i>0 ; i--){
        var temp = Math.floor(Math.random() * (i + 1));
        [quesData[i], quesData[temp]] = [quesData[temp], quesData[i]];
    }
    quesData.push(0);
    for (var i=starData.length-1 ; i>0 ; i--){
        var temp = Math.floor(Math.random() * (i + 1));
        [starData[i], starData[temp]] = [starData[temp], starData[i]];
    }
}

var global_dice = -999;
var global_path = [];
var global_paths = [];
var global_toplayer = null;
var global_shield = null;
                                                                        
var playerData = [
    { name: "玩家一", id: 0, money: 0, shield: 0, dice: [], buff:[], x: 0, y: 23 },
    { name: "玩家二", id: 1, money: 0, shield: 0, dice: [], buff:[], x: 0, y: 23 },
    { name: "玩家三", id: 2, money: 0, shield: 0, dice: [], buff:[], x: 0, y: 23 },
    { name: "玩家四", id: 3, money: 0, shield: 0, dice: [], buff:[], x: 0, y: 23 }
];
var quesData = [];
var starData = [];
                                       
var placeData = [
    { margin_left: 30, margin_top: 890, text: "建國中學" },
    { margin_left: 190, margin_top: 890, text: "歷史博物館" },
    { margin_left: 50, margin_top: 770, text: "植物園" },
    { margin_left: 430, margin_top: 890, text: "中正二分局" },
    { margin_left: 650, margin_top: 890, text: "中正紀念堂" },
    { margin_left: 670, margin_top: 770, text: "中央銀行" },
    { margin_left: 70, margin_top: 370, text: "西門" },
    { margin_left: 110, margin_top: 50, text: "北門" },
    { margin_left: 330, margin_top: 370, text: "總統府" },
    { margin_left: 310, margin_top: 490, text: "北一女中" },
    { margin_left: 450, margin_top: 250, text: "二二八公園" },
    { margin_left: 710, margin_top: 210, text: "台大醫院" },
    { margin_left: 710, margin_top: 50, text: "成功高中" },
    { margin_left: 290, margin_top: 50, text: "台北車站" }
]
var tileData = [
    [{ class: "tile star" },
    { class: "tile normal" },
    { class: "tile place" },
    { class: "tile ques" },
    { class: "tile money" },
    { class: "tile normal" },
    { class: "tile ques" },
    { class: "tile place" },
    { class: "tile money" },
    { class: "tile star" },
    { class: "tile normal" },
    { class: "tile ques" },
    { class: "tile normal" },
    { class: "tile normal" },
    { class: "tile money" },
    { class: "tile normal" },
    { class: "tile normal" },
    { class: "tile ques" },
    { class: "tile place" }],
    
    [{ class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile money" },
    { class: "tile nothing" },
    { class: "tile nothing" }],
    
    [{ class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile money" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile star" },
    { class: "tile nothing" },
    { class: "tile nothing" }],
    
    [{ class: "tile money" },
    { class: "tile normal" },
    { class: "tile star" },
    { class: "tile money" },
    { class: "tile star" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" }],
    
    [{ class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile star" },
    { class: "tile nothing" },
    { class: "tile nothing" }],
    
    [{ class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile money" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile star" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile place" },
    { class: "tile nothing" },
    { class: "tile nothing" }],
    
    [{ class: "tile money" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile star" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile place" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" }],
    
    [{ class: "tile normal" },
    { class: "tile ques" },
    { class: "tile money" },
    { class: "tile normal" },
    { class: "tile money" },
    { class: "tile star" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" }],
    
    [{ class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile money" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile star" },
    { class: "tile normal" },
    { class: "tile nothing" }],
    
    [{ class: "tile place" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile place" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile normal" },
    { class: "tile money" },
    { class: "tile nothing" },
    { class: "tile money" },
    { class: "tile nothing" }],
    
    [{ class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile star" },
    { class: "tile normal" },
    { class: "tile nothing" }],
    
    [{ class: "tile money" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile star" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile money" },
    { class: "tile nothing" },
    { class: "tile nothing" }],
    
    [{ class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile place" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" }],
    
    [{ class: "tile star" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile money" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" }],
    
    [{ class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile star" },
    { class: "tile nothing" },
    { class: "tile nothing" }],
    
    [{ class: "tile money" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" }],
    
    [{ class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile money" },
    { class: "tile nothing" },
    { class: "tile nothing" }],
    
    [{ class: "tile normal" },
    { class: "tile ques" },
    { class: "tile normal" },
    { class: "tile star" },
    { class: "tile normal" },
    { class: "tile money" },
    { class: "tile normal" },
    { class: "tile ques" },
    { class: "tile money" },
    { class: "tile normal" },
    { class: "tile normal" },
    { class: "tile star" },
    { class: "tile ques" },
    { class: "tile money" },
    { class: "tile ques" },
    { class: "tile normal" },
    { class: "tile ques" },
    { class: "tile normal" },
    { class: "tile money" }],
    
    [{ class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile star" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile star" }],
    
    [{ class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile place" },
    { class: "tile money" },
    { class: "tile normal" },
    { class: "tile ques" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile star" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile place" }],
    
    [{ class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile star" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile money" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile money" }],
    
    [{ class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile money" },
    { class: "tile star" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile star" }],
    
    [{ class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile place" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile place" }],
    
    [{ class: "tile place" },
    { class: "tile normal" },
    { class: "tile star" },
    { class: "tile ques" },
    { class: "tile money" },
    { class: "tile normal" },
    { class: "tile normal" },
    { class: "tile ques" },
    { class: "tile normal" },
    { class: "tile star" },
    { class: "tile place" },
    { class: "tile ques" },
    { class: "tile money" },
    { class: "tile normal" },
    { class: "tile normal" },
    { class: "tile star" },
    { class: "tile money" },
    { class: "tile ques" },
    { class: "tile star" }]
];
