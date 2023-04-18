//Project : Dice Game DOM practice
//Name: Luis Padilla 
//Date: March 2023

'use strict';

//Selecting elements -----------------------------------------------------------------
const elScore0 = document.getElementById('score--0');
const elScore1 = document.getElementById('score--1');
const elCurScore0= document.getElementById('current--0');
const elCurScore1= document.getElementById('current--1');

const elSectionPlayer0 =document.querySelector('.player--0');
const elSectionPlayer1 =document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew  = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions-----------------------------------------------------------------
elScore0.textContent = '0';
elScore1.textContent = '0';
diceEl.classList.add('hidden');

const scores = [0,0];
let currentScore =0;
let  activePlayer =0;
let playing = true;



//rolling dice functionality 

btnRoll.addEventListener('click', function (){
    //1.0 Check if any of the scores have not overpass or equal 100 score 
    if (playing){
           // 1.1 Generating a random dice roll
        const diceNumber= Math.trunc(Math.random()*6)+1;

        // 2. Display dice 
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${diceNumber}.png`;

        // 3. Check for rolled 1: if true, switch to next player..
        if (diceNumber !== 1){
            currentScore+= diceNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        }else {
            // switch to the next player
            document.getElementById(`current--${activePlayer}`).textContent = 0;
            activePlayer= activePlayer === 0 ? 1 : 0;
            currentScore= 0;
            elSectionPlayer0.classList.toggle('player--active');// tooggle remove the class if its ther and if not there it will add it
            elSectionPlayer1.classList.toggle('player--active');
        }
    }
    
})

// Hold Button 
btnHold.addEventListener('click',function(){
    // 1 for users tha click on hold once score reach or overpass 100 
    if (playing){
    //1.1
    elSectionPlayer0.classList.toggle('player--active');// tooggle remove the class if its ther and if not there it will add it
    elSectionPlayer1.classList.toggle('player--active');
    //  1.1 adding score to respective player 
    if (scores[0] < 20 && scores[1] < 20){
        scores[activePlayer]+=currentScore;
        //1.2 tChek if player score is > = 100
        if (scores[activePlayer]>= 20){
          document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
          document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
          document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];  // screen
          diceEl.classList.add('hidden');
          playing = false;
        }else {
            //1.21 then... once clicking holding , reset current number to zero on value and screen
            currentScore = 0; // value
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;  // screen
        
            // setting score player on the panel 
            document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
            activePlayer= activePlayer === 0 ? 1 :0 ;
        }
    }    
    }
}
)


//  resetting game 
btnNew.addEventListener('click', function(){
    // setting array scores to 0
    for ( let i = 0 ; i < scores.length ; i++){
        scores[i] = 0;
    }
    // resetting cur scores
    elCurScore0.textContent = scores[0];
    elCurScore1.textContent = scores[1];
    elScore0.textContent= scores[0];
    elScore1.textContent= scores[1];

    //turning off black background of active player 
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    //setting background features for starting player 
    elSectionPlayer0.classList.add('player--active')
    // setting background for second player
    elSectionPlayer1.classList.remove('player--active')
})

