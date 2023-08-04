async function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function roll2(){
    global_dice = 10;
}

async function roll(){
    var intervalId;
    var diceImage = document.getElementById("big_dice");
    var counter = 0;
    var num = -1;
    for (var i=0 ; i<20 ; i++){
        var temp = num;
        while (temp == num) temp = Math.floor(Math.random() * 6) + 1;
        num = temp;
        diceImage.src = "images/dice/" + num + ".png";
        await sleep(50);
    }
    global_dice = num;
    return num;
}

function openmodal(){
    var places = ['台北車站','總統府','北一女中']
    const modal = document.getElementById("myModal");
    modal.innerHTML = "";
    modal.style.display = "block";
    for (var i=0 ; i<3 ; i++){
        var button = document.createElement("button");
        var money = 100 + i * 200;
        if (have_buff(playerData[who], 10) == true) money = money / 2;
        button.className = "btnOption";
        button.id = 'transfer_to' + i;
        button.textContent = '移動到' + places[i] + ' ($' + money + ')';
        button.style.marginTop = (70*i+30) + 'px';
        modal.appendChild(button);
    }
}

function openmodal2(who){
    const modal = document.getElementById("myModal2");
    modal.innerHTML = "";
    modal.style.display = "block";
    if (playerData[who].dice.length == 0) modal.innerHTML = "<br>你目前沒有任何控骰卡";
    for (var i=0 ; i<playerData[who].dice.length ; i++){
        var button = document.createElement("button");
        button.className = "btnOption";
        button.id = 'dice_number' + i;
        button.textContent = '骰' + playerData[who].dice[i];
        button.style.marginTop = (70*i+30) + 'px';
        modal.appendChild(button);
    }
}

window.addEventListener("click", (event) => {
    const modal = document.getElementById("myModal");
    const button = document.getElementById("door");
    const modal2 = document.getElementById("myModal2");
    const button2 = document.getElementById("use_star");
    if (event.target != button) modal.style.display = "none";
    if (event.target != button2) modal2.style.display = "none";
    if (event.target.id.includes("dice_number") == true) global_dice = -playerData[who].dice[event.target.id[11]];
    if (event.target.id.includes("transfer_to") == true){
        if (event.target.id[11] == '0') transferto(playerData[who], '台北車站', 100);
        if (event.target.id[11] == '1') transferto(playerData[who], '總統府', 300);
        if (event.target.id[11] == '2') transferto(playerData[who], '北一女中', 500);
    }
    
    if (event.target.id.includes("target_icon") == true){
        var target_modal = document.getElementById("target_modal");
        target_modal.innerHTML = "";
        global_path = global_paths[event.target.dataset.index];
    }
    if (event.target.id.includes("toplayer") == true){
        if (playerData[who].money < event.target.dataset.index) alert("玩家金錢不足");
        else{
            var card = document.getElementById("card");
            card.innerHTML = "";
            global_toplayer = playerData[event.target.id[8]];
        }
    }
    if (event.target.id.includes("use_shield") == true){
        var card = document.getElementById("card");
        card.innerHTML = "";
        if (event.target.id[10] == '0') global_shield = true;
        else global_shield = false;
    }

});

function output_player(player){
    var p = document.getElementById(player.name);
    p.innerHTML = get_player_data(player);
    var player_icon = document.getElementById(player.name + "_icon");
    player_icon.style.marginLeft = 40 * player.x + player.id % 2 * 10 + 30 + "px";
    player_icon.style.marginTop = 40 * player.y + Math.floor(player.id%4/2) * 10 + "px";
}

async function start_game(){
    init();
    console.log("遊戲開始");
    do people = parseInt(prompt("請輸入真人數量？(只能是0到8的整數)", ""),10);
    while ((isNaN(people)) || (people < 0) || (people > 8));
    do ai = parseInt(prompt("請輸入AI數量？(真人+AI要在2到8之間)", ""),10);
    while ((isNaN(ai)) || (people+ai < 2) || (people+ai > 8));
    playerData = [];
    playername = ["玩家一","玩家二","玩家三","玩家四","玩家五","玩家六","玩家七","玩家八"];
    for (var i = 0; i < people; i++) playerData.push({ name: playername[i], id: i, person: true, money: 0, shield: 0, dice: [], buff:[], x: 0, y: 23 });
    for (var i = 0; i < ai; i++) playerData.push({ name: playername[people+i], id: people+i, person: false, money: 0, shield: 0, dice: [], buff:[], x: 0, y: 23 });
    add_player_data();
    my_turn(0);
}

function restart(){
    var temp = confirm('確定要重新開始遊戲？本局的遊戲資料將不會保存。');
    if (temp) location.reload();
}

async function transferto(player, place, m){
    var money = m;
    if (have_buff(player, 10) == true) money = money / 2;
    if (player.money < money){
        alert("玩家金錢不足");
        return -999;
    }
    var temp = true;
    if (player.person == true) temp = confirm('確定要花費$' + money + '，在這回合移動到' + place + '？');
    if (temp == false) return -999;
    player.money -= money;
    var card = document.getElementById("card");
    card.innerHTML = ('<br>' + player.name + '花' + money + '元，使用傳送門移動至' + place);
    console.log(player.name, '花', money, '元，使用傳送門移動至', place);
    var ques = {id:999, money: 0, effect: ""};
    if (place == '台北車站') ques.id = 12;
    if (place == '總統府') ques.id = 14;
    if (place == '北一女中') ques.id = -1;
    await use_ques(ques, player);
    global_dice = m;
    return m;
}
