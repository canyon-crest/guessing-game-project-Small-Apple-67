// add javascript here
let level, answer, score;
const levelArr = document.getElementsByName("level");
const scoreArr = [];


function showTime(){
    const el = document.getElementById('date');
    if(el) el.textContent = time();
}

showTime();
setInterval(showTime, 1000);

// add event listeners
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
// Give Up button
const giveUpBtn = document.getElementById('giveUp');
if (giveUpBtn) giveUpBtn.addEventListener('click', giveUpGame);

function nameBtn(){
    let namec = document.getElementById("name").textContent;
    let nameCap = namec.charAt(0).toUpperCase();
    nameB.textContent = "Welcome, " + nameCap + "! Let's play a guessing game.";
}
function play(){
    score = 0; // sets scroe to 0 every new game
    playBtn.disabled = true;
    guessBtn.disabled = false;
    giveUpBtn.disabled = false;
    guess.disabled = false;
    if (giveUpBtn) giveUpBtn.disabled = false;
    for(let i = 0; i < levelArr.length; i++){
        if(levelArr[i].checked){
            level = levelArr[i].value;
        }
        levelArr[i].disabled = true;
    }
    msg.textContent = "Guess a number from 1-" + level;
    answer = Math.floor(Math.random() * level) + 1;
    guess.placeholder = answer;
}   
function makeGuess(){
    const di = document.getElementById('di');
    let userGuess = parseInt(guess.value, 10);
    if(isNaN(userGuess) || userGuess < 1 || userGuess > level){
        msg.textContent = "Enter a VALID # between 1 and " + level;
        if(di) di.textContent = "";
        return;
    }

    score++; // valid guess add 1 to score

    const diff = Math.abs(userGuess - answer);

    // show proximity hint in #di
    if(di){
        if(diff === 0){
            di.textContent = "Correct!";
        }
        else if(diff <= 10){
             di.textContent = "Hot!";
        }
        else if(diff <= 20){
            di.textContent = "Warm";
        }
        else{
            di.textContent = "Cold";
        }
    }
    if(sc){
        if(score === 0) sc.textContent = "Your score was perfect!";
        else if(score <= 25) sc.textContent = "Your score was good!"; // close
        else if(score <= 50) sc.textContent = "Your score was okay.";
        else sc.textContent = "Your score was bad.";
    }
    // guidance to user
    if(userGuess < answer){
        msg.textContent = "Guess higher.";
    }
    else if(userGuess > answer){
        msg.textContent = "Guess lower.";
    }
    else{
        msg.textContent = "You got it right! It took you " + score + " tries. Press play to play again.";
        updateScore();
        reset();
    }
}

function giveUpGame(){
    // Show the answer, set the score to the range and record it
    if(typeof answer === 'undefined') return;
    // convert level to number (level is set in play())
    const rangeScore = parseInt(level, 10) || 0;
    score = rangeScore;
    msg.textContent = "You gave up. The answer was " + answer + ". Your score has been set to " + score + ".";
    // record and reset
    updateScore();
    reset();
}
function reset(){
    guessBtn.disabled = true;
    guess.disabled = true;
    guess.value = "";
    guess.placeholder = "";
    playBtn.disabled = false;
    for(let i = 0; i < levelArr.length; i++){
        levelArr[i].disabled = false;
    }
}
function updateScore(){
    scoreArr.push(score);
    scoreArr.sort((a, b) => a - b); // sort by increasing order
    let lb = document.getElementsByName("leaderboard");
    wins.textContent = "Total wins: " + scoreArr.length;
    let sum = 0;
    for(let i =0; i < scoreArr.length; i++){
        sum += scoreArr[i];
        if(i < lb.length){
            lb[i].textContent = scoreArr[i] + " " + time();
        }
    }
    let avg = sum/scoreArr.length;
    avgScore.textContent = "Average Score: " + avg.toFixed(2);
}
function time(){
    let d = new Date();
    const months = [
        'January','February','March','April','May','June',
        'July','August','September','October','November','December'
    ];
    const monthName = months[d.getMonth()];
    const day = d.getDate();

    const year = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');

    return monthName + " " + day + ", " + year + " " + hh + ":" + mm + ":" +ss;
}
