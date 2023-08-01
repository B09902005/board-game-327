function have_buff(player, id){
    for (var j=0 ; j<player.buff.length ; j++){
        if (player.buff[j].type != "buff") continue;
        if (player.buff[j].id == id) return true;
    }
    return false;
}

function find_all_paths(x, y, num){
    if (num == 0) return [[{x:x, y:y}]];
    var prev_paths = find_all_paths(x, y, num-1);
    var paths = [];
    var dx = [-1,0,1,0];
    var dy = [0,1,0,-1];
    for (const path of prev_paths){
        for (var i=0 ; i<4 ; i++){
            var last = {x:path[num-1].x+dx[i], y:path[num-1].y+dy[i]};
            if ((num >= 2) && (last.x == path[num-2].x) && (last.y == path[num-2].y)) continue;
            if ((last.x<0) || (last.y<0) || (last.y>=tileData.length) || (last.x>=tileData[last.y].length)) continue;
            if (tileData[last.y][last.x].class == "tile nothing") continue;
            var temppath = path.concat([last]);
            paths.push(temppath);
        }
    }
    return paths;
}

function distance_to_terminal(x, y){
    var distance = [];
    for (var i=0 ; i<tileData.length ; i++){
        distance.push([]);
        for (var j=0 ; j<tileData[0].length ; j++) distance[i].push(99999);
    }
    var list = [{x:9, y:12}];
    var distance_now = 0;
    distance[12][9] = 0;
    var dx = [-1,0,1,0];
    var dy = [0,1,0,-1];
    while (list.length != 0){
        distance_now += 1;
        var templist = [];
        for (const point of list){
            for (var i=0 ; i<4 ; i++){
                var last = {x:point.x+dx[i], y:point.y+dy[i]};
                if ((last.x<0) || (last.y<0) || (last.y>=tileData.length) || (last.x>=tileData[last.y].length)) continue;
                if (tileData[last.y][last.x].class == "tile nothing") continue;
                if (distance[last.y][last.x] <= distance_now) continue;
                distance[last.y][last.x] = distance_now;
                templist.push(last);
            }
        }
        list = templist;
    }
    return distance[y][x];
}

async function use_ques(ques, player){
    if (player == null) return;
    if (ques.id < 15){
        var src = {x:player.x, y:player.y};
        var dest = {x:0, y:23};
        if (ques.id == 0) dest = {x:0, y:23};
        if (ques.id == 1) dest = {x:0, y:23};
        if (ques.id == 2) dest = {x:3, y:22};
        if (ques.id == 3) dest = {x:2, y:19};
        if (ques.id == 4) dest = {x:10, y:23};
        if (ques.id == 5) dest = {x:18, y:22};
        if (ques.id == 6) dest = {x:18, y:19};
        if (ques.id == 7) dest = {x:0, y:9};
        if (ques.id == 8) dest = {x:13, y:6};
        if (ques.id == 9) dest = {x:16, y:5};
        if (ques.id == 10) dest = {x:18, y:0};
        if (ques.id == 11) dest = {x:2, y:0};
        if (ques.id == 12) dest = {x:7, y:0};
        if (ques.id == 13) dest = {x:7, y:0};
        if (ques.id == 14) dest = {x:9, y:9};
        if (ques.id == -1) dest = {x:9, y:12};
        for (var i=1 ; i<=100 ; i++){
            player.x = (i*dest.x + (100-i)*src.x) / 100;
            player.y = (i*dest.y + (100-i)*src.y) / 100;
            output_player(player);
            await sleep(10);
        }
    }
    if (ques.id == 15){
        player.money += 50;
        if (have_buff(player, 6) == true) player.money += 50;
    }
    if (ques.id == 16){
        player.money += 100;
        if (have_buff(player, 6) == true) player.money += 100;
    }
    if (ques.id == 17){
        player.money += 100;
        if (have_buff(player, 6) == true) player.money += 100;
    }
    if (ques.id == 18){
        player.money += 200;
        if (have_buff(player, 6) == true) player.money += 200;
    }
    if (ques.id == 19) player.money -= 30;
    if (ques.id == 20) player.money -= 100;
    if (ques.id == 21) player.money = 0;
    if (ques.id == 22){
        for (var i=0 ; i<player.shield ; i++) starData.push({type: "shield", effect:""});
        for (var i=0 ; i<player.dice.length ; i++) starData.push({type: "dice", effect:player.dice[i]});
        for (var i=0 ; i<player.buff.length ; i++) starData.push(player.buff[i]);
        player.shield = 0;
        player.dice = [];
        player.buff = [];
    }
    if (ques.id == 23){
        for (var i=0 ; i<player.dice.length ; i++) starData.push({type: "dice", effect:player.dice[i]});
        player.dice = [];
    }
    if (ques.id == 24){
        for (var i=0 ; i<player.buff.length ; i++) starData.push(player.buff[i]);
        player.buff = [];
    }
    if (ques.id == 25){
        var tempid = (player.id+1)%4;
        for (var i=0 ; i<4 ; i++){
            if (playerData[i].name == player.name) continue;
            if (distance_to_terminal(playerData[i].x, playerData[i].y) < distance_to_terminal(playerData[tempid].x, playerData[tempid].y)) tempid = i;
        }
        var src = {x:player.x, y:player.y};
        var dest = {x:playerData[tempid].x, y:playerData[tempid].y};
        for (var i=1 ; i<=100 ; i++){
            player.x = (i*dest.x + (100-i)*src.x) / 100;
            player.y = (i*dest.y + (100-i)*src.y) / 100;
            output_player(player);
            playerData[tempid].x = (i*src.x + (100-i)*dest.x) / 100;
            playerData[tempid].y = (i*src.y + (100-i)*dest.y) / 100;
            output_player(playerData[tempid]);
            await sleep(10);
        }
        output_player(playerData[tempid]);
    }
    if (ques.id == 26){
        var tempid = (player.id+1)%4;
        for (var i=0 ; i<4 ; i++){
            if (playerData[i].name == player.name) continue;
            if (playerData[i].money > playerData[tempid].money) tempid = i;
        }
        [player.money, playerData[tempid].money] = [playerData[tempid].money, player.money];
        output_player(playerData[tempid]);
    }
    if (ques.id == 27){
        var tempid = (player.id+1)%4;
        for (var i=0 ; i<4 ; i++){
            if (playerData[i].name == player.name) continue;
            if (playerData[i].shield + playerData[i].dice.length + playerData[i].buff.length > playerData[tempid].shield + playerData[tempid].dice.length + playerData[tempid].buff.length) tempid = i;
        }
        [player.shield, playerData[tempid].shield] = [playerData[tempid].shield, player.shield];
        [player.dice, playerData[tempid].dice] = [playerData[tempid].dice, player.dice];
        [player.buff, playerData[tempid].buff] = [playerData[tempid].buff, player.buff];
        output_player(playerData[tempid]);
    }
    if (ques.id >= 28){
        for (var i=0 ; i<2 ; i++){
            await sleep(1000);
            if (starData.length == 0){
                card.innerHTML += '<br>道具卡已經全部分發完';
                continue;
            }
            var star = starData.shift();
            if (star.type == "shield"){
                player.shield += 1;
                card.innerHTML += '<br>' + player.name + '獲得嫁禍無效卡';
                console.log(player.name, '獲得嫁禍無效卡');
            }
            if (star.type == "dice"){
                player.dice.push(star.effect);
                card.innerHTML += '<br>' + player.name + '獲得控骰卡：骰' + star.effect;
                console.log(player.name, '獲得控骰卡：骰'+ star.effect);
            }
            if (star.type == "buff"){
                player.buff.push(star);
                card.innerHTML += '<br>' + player.name + '獲得永久效果卡：' + star.effect;
                console.log(player.name, '獲得永久效果卡：', star.effect);
            }
        }
    }
    if (player.money < 0) player.money = 0;
    output_player(player);
}

function throw_ques(player, ques){
    var dest = {};
    var nearest = playerData[(player.id+1)%playerData.length];
    var richest = playerData[(player.id+1)%playerData.length];
    var diceest = playerData[(player.id+1)%playerData.length];
    var buffest = playerData[(player.id+1)%playerData.length];
    var prevwinner = null;
    for (var i=0 ; i<playerData.length ; i++){
        if (player.name == playerData[i].name) continue;
        if (distance_to_terminal(nearest.x, nearest.y) > distance_to_terminal(playerData[i].x, playerData[i].y)) nearest = playerData[i];
        if (richest.money < playerData[i].money) richest = playerData[i];
        if (diceest.dice.length < playerData[i].dice.length) diceest = playerData[i];
        if (buffest.buff.length < playerData[i].buff.length) buffest = playerData[i];
        if (canwin(playerData[i].x, playerData[i].y, playerData[i].dice) != 0) prevwinner = playerData[i];
    }
    if (ques.id == 0) dest = {x:0, y:23};
    if (ques.id == 1) dest = {x:0, y:23};
    if (ques.id == 2) dest = {x:3, y:22};
    if (ques.id == 3) dest = {x:2, y:19};
    if (ques.id == 4) dest = {x:10, y:23};
    if (ques.id == 5) dest = {x:18, y:22};
    if (ques.id == 6) dest = {x:18, y:19};
    if (ques.id == 7) dest = {x:0, y:9};
    if (ques.id == 8) dest = {x:13, y:6};
    if (ques.id == 9) dest = {x:16, y:5};
    if (ques.id == 10) dest = {x:18, y:0};
    if (ques.id == 11) dest = {x:2, y:0};
    if (ques.id == 12) dest = {x:7, y:0};
    if (ques.id == 13) dest = {x:7, y:0};
    if (ques.id == 14) dest = {x:9, y:9};
    if (ques.id <= 14) if (prevwinner != null) return prevwinner;
    if (ques.id <= 12){
        if (distance_to_terminal(player.x, player.y) < distance_to_terminal(dest.x, dest.y) - 10) return nearest;
        if (distance_to_terminal(nearest.x, nearest.y) <= 10) return nearest;
        return player;
    }
    if (ques.id <= 18) return player;
    if (ques.id <= 21) return richest;
    if (ques.id <= 22){
        if (prevwinner != null) return prevwinner;
        return buffest;
    }
    if (ques.id <= 23){
        if (prevwinner != null) return prevwinner;
        return diceest;
    }
    if (ques.id <= 24) return buffest;
    return player;
}

function use_shield(player, ques){
    if (ques.id >= 25) return false;
    if ((ques.id >= 12) && (ques.id <= 18)) return false;
    if (have_buff(player, 3) == true) return true;
    if (ques.id <= 14){
        var dest = {};
        if (ques.id == 0) dest = {x:0, y:23};
        if (ques.id == 1) dest = {x:0, y:23};
        if (ques.id == 2) dest = {x:3, y:22};
        if (ques.id == 3) dest = {x:2, y:19};
        if (ques.id == 4) dest = {x:10, y:23};
        if (ques.id == 5) dest = {x:18, y:22};
        if (ques.id == 6) dest = {x:18, y:19};
        if (ques.id == 7) dest = {x:0, y:9};
        if (ques.id == 8) dest = {x:13, y:6};
        if (ques.id == 9) dest = {x:16, y:5};
        if (ques.id == 10) dest = {x:18, y:0};
        if (ques.id == 11) dest = {x:2, y:0};
        if (ques.id == 12) dest = {x:7, y:0};
        if (ques.id == 13) dest = {x:7, y:0};
        if (ques.id == 14) dest = {x:9, y:9};
        if (distance_to_terminal(player.x, player.y) < distance_to_terminal(dest.x, dest.y) - 10) return true;
        return false;
    }
    if (ques.id >= 21) return true;
    return false;
}

async function transfer(player, ques){
    await sleep(1000);
    var card = document.getElementById("card");
    global_toplayer = null;
    card.innerHTML = '<center><b>' + ques.title + '</b></center>';
    card.innerHTML += ques.description;
    card.innerHTML += ('<br><br><b>' + ques.effect + '</b><br>');
    if (player.person == false) global_toplayer = await throw_ques(player, ques);
    else transfer_option(player, ques);
    while (global_toplayer == null) await sleep(100);
    var player2 = global_toplayer;
    var money = ques.money;
    if (have_buff(player, 1) == true) money = 0;
    if (player.money < money) player2 = player;
    if (player2.name != player.name){
        if (player.person == false) await sleep(1000);
        card.innerHTML += ('<br><br>' + player.name + '花' + money + '元嫁禍給' + player2.name);
        console.log(player.name, '選擇嫁禍給', player2.name);
        player.money -= money;
        await sleep(1000);
        global_shield = null;
        if (have_buff(player, 2) == true) global_shield = false;
        else if ((player2.shield == 0) && (have_buff(player2, 3) == false)) global_shield = false;
        else if (player2.person == false) global_shield = use_shield(player2, ques);
        else shield_option(player2);
        while (global_shield == null) await sleep(100);
        if (global_shield == true){
            card.innerHTML += ('<br>' + player2.name + '使用嫁禍無效卡');
            console.log(player2.name, '使用嫁禍無效卡');
            if (have_buff(player2, 3) == false){
                player2.shield -= 1;
                starData.push({type: "shield", effect:""});
            }
            output_player(player2);
            return null;
        }else{
            if (have_buff(player2, 8) == true){
                await sleep(1000);
                if (starData.length == 0) card.innerHTML += '<br>道具卡已經全部分發完';
                else{
                    var star = starData.shift();
                    if (star.type == "shield"){
                        player2.shield += 1;
                        card.innerHTML += '<br>(被動效果發動) ' + player2.name + '獲得嫁禍無效卡';
                        console.log(player2.name, '被動效果發動，獲得嫁禍無效卡');
                    }
                    if (star.type == "dice"){
                        player2.dice.push(star.effect);
                        card.innerHTML += '<br>(被動效果發動) ' + player2.name + '獲得控骰卡：骰' + star.effect;
                        console.log(player2.name, '被動效果發動，獲得控骰卡：骰'+ star.effect);
                    }
                    if (star.type == "buff"){
                        player2.buff.push(star);
                        card.innerHTML += '<br>(被動效果發動) ' + player2.name + '獲得永久效果卡：' + star.effect;
                        console.log(player2.name, '被動效果發動，獲得永久效果卡：', star.effect);
                    }
                }
            }
        }
    }
    await sleep(1000);
    return player2;
}

function shield_option(player){
    var card = document.getElementById("card");
    card.innerHTML += '<br>' + player.name + ' 是否使用嫁禍無效卡？<br>';
    for (var i=0 ; i<2 ; i++){
        var button = document.createElement("button");
        if (i == 0) button.textContent = "是";
        if (i == 1) button.textContent = "否";
        button.className = "btnOption";
        button.id = "use_shield" + i;
        button.style.marginTop = (70*i+100) + 'px';
        card.appendChild(button);
    }
}

function transfer_option(player, ques){
    var card = document.getElementById("card");
    var money = ques.money;
    if (have_buff(player, 1) == true) money = 0;
    var button = document.createElement("button");
    button.className = "btnOption";
    button.id = "toplayer" + player.id;
    button.textContent = "不嫁禍";
    button.style.backgroundColor = '#4CAF50';
    button.style.marginTop = 15 + 'px';
    button.dataset.index = 0;
    card.appendChild(button);
    
    for (var i=0 ; i<playerData.length-1 ; i++){
        var j = i;
        if (j >= player.id) j = j + 1;
        button = document.createElement("button");
        button.textContent = "嫁禍給" + playerData[j].name + " ($" + money + ")";
        button.className = "btnOption";
        button.id = "toplayer" + j;
        button.dataset.index = money;
        button.style.marginTop = (55*i+70) + 'px';
        card.appendChild(button);
    }
}

async function get_buff(player){
    var card = document.getElementById("card");
    if (tileData[player.y][player.x].class == "tile money"){
        var money = 30;
        if (have_buff(player, 6) == true) money = 60;
        player.money += money;
        if (money == 30) card.innerHTML = '<br>' + player.name + '獲得' + money + '元';
        if (money == 60) card.innerHTML = '<br>(被動效果發動) ' + player.name + '獲得' + money + '元';
        console.log(player.name, '獲得', money, '元');
    }
    if (tileData[player.y][player.x].class == "tile star"){
        var temp = 1;
        if (have_buff(player, 4) == true) temp = 2;
        for (var i=0 ; i<temp ; i++){
            await sleep(1000);
            if (i == 0){
                card.innerHTML = '';
                if (temp == 2) card.innerHTML = '<br>(被動效果發動) ';
            }
            if (starData.length == 0) card.innerHTML += '<br>道具卡已經全部分發完';
            else{
                var star = starData.shift();
                if (star.type == "shield"){
                    player.shield += 1;
                    card.innerHTML += '<br>' + player.name + '獲得嫁禍無效卡';
                    console.log(player.name, '獲得嫁禍無效卡');
                }
                if (star.type == "dice"){
                    player.dice.push(star.effect);
                    card.innerHTML += '<br>' + player.name + '獲得控骰卡：骰' + star.effect;
                    console.log(player.name, '獲得控骰卡：骰'+ star.effect);
                }
                if (star.type == "buff"){
                    player.buff.push(star);
                    card.innerHTML += '<br>' + player.name + '獲得永久效果卡：' + star.effect;
                    console.log(player.name, '獲得永久效果卡：', star.effect);
                }
            }
        }
    }
    if (tileData[player.y][player.x].class == "tile ques"){
        var ques = quesData[quesData[quesData.length-1]];
        var money = ques.money;
        if (have_buff(player, 1) == true) money = 0;
        console.log(player.name, '抽到？卡：', ques.effect);
        quesData[quesData.length-1] = (quesData[quesData.length-1] + 1) % (quesData.length-1);
        var player2 = await transfer(player, ques);
        await use_ques(ques, player2);
    }
    output_player(player);
    if (have_buff(player, 5) == true){
        await sleep(1000);
        var money = 10;
        if (have_buff(player, 6) == true) money = 20;
        player.money += money;
        output_player(player);
        var card = document.getElementById("card");
        card.innerHTML += '<br>(被動效果發動) ' + player.name + '獲得' + money + '元';
        console.log(player.name, '被動效果發動，獲得', money, '元');
    }
    for (var j=0 ; j<playerData.length ; j++){
        if (player.name == playerData[j].name) continue;
        if (have_buff(player, 9) == false) continue;
        if ((player.x == playerData[j].x) && (player.y == playerData[j].y)){
            await sleep(1000);
            var money = 50;
            if (playerData[j].money < 50) money = playerData[j].money;
            [player.money, playerData[j].money] = [player.money+money, playerData[j].money-money];
            var card = document.getElementById("card");
            card.innerHTML += '<br>(被動效果發動) ' + player.name + '搶走' + playerData[j].name + money + '元';
            console.log(player.name, '被動效果發動，搶走', playerData[j].name, money, '元');
            output_player(player);
            output_player(playerData[j]);
        }
    }
    await sleep(1000);
}

async function pick_dice_AI(player){
    if ((player.money >= 500) || ((have_buff(player, 10)) && (player.money >= 250))){
        global_dice = await transferto(player, '北一女中', 500);
        return global_dice;
    }
    if (player.dice.length == 0){ // no card then roll
        global_dice = await roll();
        return global_dice;
    }
    if (canwin(player.x, player.y, player.dice) != 0){ // will win then card
        global_dice = -canwin(player.x, player.y, player.dice);
        return global_dice;
    }
    if ((player.money >= 300) || ((have_buff(player, 10)) && (player.money >= 150))){
        for (var i=0 ; i<player.dice.length ; i++){
            if (player.dice[i] == 3){
                global_dice = await transferto(player, '總統府', 300);
                return global_dice;
            }
        }
    }
    if (distance_to_terminal(player.x, player.y) <= 10){ // no win but near then roll
        global_dice = await roll();
        return global_dice;
    }
    for (var i=0 ; i<player.dice.length ; i++){ // have to attack then card
        var paths = find_all_paths(player.x, player.y, player.dice[i]);
        for (var j=0 ; j<paths.length ; j++){
            var point = paths[j][paths[j].length-1];
            if ((score_of_path(player, point) > 3000) && (score_of_path(player, point) < 20000)){
                global_dice = -player.dice[i];
                return global_dice;
            }
        }
    }
    global_dice = await roll();
    return global_dice;
}

function canwin(x, y, dice){
    var distance = distance_to_terminal(x, y);
    for (var i=0 ; i<dice.length ; i++){
        if (distance == dice[i]) return dice[i];
    }
    for (var i=0 ; i<dice.length ; i++){
        var paths = find_all_paths(x, y, dice[i]);
        for (var j=0 ; j<dice.length ; j++){
            if (i == j) continue;
            for (var k=0 ; k<paths.length ; k++){
                var point = paths[k][paths[k].length-1];
                distance = distance_to_terminal(point.x, point.y);
                if (distance == dice[j]) return dice[i];
            }
        }
    }
    return 0;
}

function score_of_path(player, point){
    var distance = distance_to_terminal(point.x, point.y);
    if (distance == 0) return 10000000;
    if (canwin(point.x, point.y, player.dice) != 0) return 100000;
    var score = -10 * distance;
    var star = player.shield + player.dice.length + player.buff.length;
    if (tileData[point.y][point.x].class == "tile money"){
        score += 50;
        if (have_buff(player, 6) == true) score += 50;
        if (player.money >= 250) score += 50;
        if (player.money >= 350) score += 4000;
    }
    if (tileData[point.y][point.x].class == "tile star"){
        score += (72-7*star);
        if (have_buff(player, 4) == true) score += (72-7*star);
    }
    if (tileData[point.y][point.x].class == "tile ques"){
        if (have_buff(player, 1) == true) score += 120;
        if (have_buff(player, 2) == true) score += 30;
        if (distance > 30){
            score += 47;
            score -= star * 15;
        }else{
            score -= star * 3;
            if (player.money < 50) score -= 25;
            if (distance < 10) score -= 25;
        }
        for (var i=0 ; i<playerData.length ; i++){
            if (player.name == playerData[i].name) continue;
            if ((distance_to_terminal(playerData[i].x, playerData[i].y) <= 10) && (have_buff(playerData[i], 3) == false) && (player.money >= 30)) score += 500;
            if ((distance_to_terminal(playerData[i].x, playerData[i].y) <= 6) && (have_buff(playerData[i], 3) == false) && (player.money >= 30)) score += 5000;
        }
    }
    if (have_buff(player, 9) == true){
        for (var i=0 ; i<playerData.length ; i++){
            if ((playerData[i].x == point.x) && (playerData[i].y == point.y)) score += 70;
        }
    }
    return score;
}

function find_path_AI(player, paths){
    var path = paths[0];
    var score = score_of_path(player, paths[0][paths[0].length-1]);
    for (var i=0 ; i<paths.length ; i++){
        if (score_of_path(player, paths[i][paths[i].length-1]) > score){
            path = paths[i];
            score = score_of_path(player, paths[i][paths[i].length-1]);
        }
    }
    return path;
}

async function moveplayer(player, diceNumber){
    var card = document.getElementById("card");
    if (diceNumber <= 50){
        if (diceNumber > 0){ // roll
            card.innerHTML = '<br>' + player.name + '骰出了 ' + diceNumber;
            console.log(player.name, '骰出了', diceNumber);
            if (have_buff(player, 7) == true){
                diceNumber += 3;
                card.innerHTML += '<br>(被動效果發動) 可以走'+ diceNumber + '步';
                console.log(player.name, '被動效果發動，可以走', diceNumber, '步');
            }
        }else if (diceNumber < 0){ // card
            diceNumber = -diceNumber;
            var index = player.dice.indexOf(diceNumber);
            player.dice.splice(index, 1);
            if (player.person == false) await sleep(1000);
            card.innerHTML = '<br>' + player.name + '使用控骰卡：骰' + diceNumber;
            console.log(player.name, '使用控骰卡：骰' + diceNumber);
            starData.push({type: "dice", effect:diceNumber});
        }
        if (player.person == false) await sleep(1000);
        global_paths = find_all_paths(player.x, player.y, diceNumber);
        global_path = [];
        if (player.person == false) global_path = find_path_AI(player, global_paths);
        else{
            card.innerHTML += '<br>' + '請在地圖上點選想去的格子';
            add_targets(global_paths);
        }
        while (global_path.length == 0) await sleep(100);
        var path = global_path;
        console.log(player.name, '移動到', path[diceNumber].x, path[diceNumber].y);
        for (var i=1 ; i<=diceNumber ; i++){
            player.x = path[i].x;
            player.y = path[i].y;
            output_player(player);
            await sleep(500);
        }
    }
    await sleep(1000);
    await get_buff(player);
    if ((player.x == 9) && (player.y == 12)){
        var card = document.getElementById("card");
        card.innerHTML = '<br>' + '恭喜' + player.name + '勝出！';
        console.log(player.name, '勝出！');
        return;
    }else my_turn((player.id+1)%playerData.length);
}

var turncount=0;
var who=0;

async function my_turn(i){
    who = i;
    if (i == 0) turncount += 1;
    if (i == 0) console.log('第', turncount, '輪');
    var button1 = document.getElementById("roll");
    var button2 = document.getElementById("use_star");
    var button3 = document.getElementById("door");
    if (playerData[i].person == false){ // AI
        button1.disabled = true;
        button2.disabled = true;
        button3.disabled = true;
        var card = document.getElementById("card");
        card.innerHTML = '<br>輪到' + playerData[i].name;
        await sleep(1000);
        await pick_dice_AI(playerData[i]);
        await moveplayer(playerData[i], global_dice);
    }
    else{ // person
        button1.disabled = false;
        button2.disabled = false;
        button3.disabled = false;
        var card = document.getElementById("card");
        card.innerHTML = '<br>輪到' + playerData[i].name + '，請按按鈕移動。';
        global_dice = -999;
        while (global_dice == -999) await sleep(100);
        button1.disabled = true;
        button2.disabled = true;
        button3.disabled = true;
        await moveplayer(playerData[i], global_dice);
    }
}
