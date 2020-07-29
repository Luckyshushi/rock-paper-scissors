const game = () => {
    let pScore = 0;
    let compScore = 0;
    let maxScore = 3;
    let start = false;

    const startGame = () => {
        const playBtn = document.querySelector(".intro button");
        const introSection = document.querySelector(".intro");
        const matchSection = document.querySelector(".match");

        playBtn.addEventListener("click", () => {
            introSection.classList.remove("fadeIn");
            introSection.classList.add("fadeOut");
            matchSection.classList.add("fadeIn");
        })

    };

    const playMatch = () => {
        const options = [document.querySelector(".option .rock"), document.querySelector(".option .paper"), document.querySelector(".option .scissors")];
        const playerHand= document.querySelector(".player-hand");
        const computerHand = document.querySelector(".computer-hand");
        const hands = [document.querySelector(".hands .player-hand"), document.querySelector(".hands .computer-hand")];

        hands.forEach(hand => {
            hand.addEventListener("animationend", function () {
                this.style.animation = "";
            })
        })
        //computer option
        const computerOptions = ["rock", "paper", "scissors"];
        options.forEach(option => {
            option.addEventListener("click", function(){
                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoise = computerOptions[computerNumber];

                playerHand.style.animation = "shakePlayer 2s ease";
                computerHand.style.animation = "shakeComputer 2s ease";

             setTimeout(() => {

                 compareHands(this.textContent, computerChoise);

                 //    Update images
                 playerHand.src = `./images/${this.textContent}.png`;
                 computerHand.src = `./images/${computerChoise}.png`;


             }, 2000)

            })
        })


    };

    const updateScore = () => {
        const playerScore = document.querySelector(".player-score p");
        const computerScore = document.querySelector(".computer-score p");
        playerScore.textContent = pScore;
        computerScore.textContent = compScore;

        if(pScore == maxScore || compScore == maxScore){
            const options = [document.querySelector(".option .rock"), document.querySelector(".option .paper"), document.querySelector(".option .scissors")];
            options.forEach(option => {
                option.setAttribute("disabled", "disabled");
            })
            setTimeout(() => {
                endGame();
            }, 500)

        }

    };

    const compareHands = (playerChoise,computerChoise) => {
        const winner = document.querySelector(".winner");
        if (playerChoise === computerChoise){
            winner.textContent = "It is a tie";
            updateScore();
            return;
        }
        //check for rocks
        if (playerChoise === "rock"){
            if (computerChoise === "scissors"){
                //scissors
                winner.textContent = "Player wins";
                pScore++;
                updateScore();
                return;
            }else{
                //paper
                winner.textContent = "Computer wins";
                compScore++;
                updateScore();
                return;
            }

        }
        //check for paper
        if (playerChoise === "paper"){
            if (computerChoise === "scissors"){
                winner.textContent = "Computer wins";
                compScore++;
                updateScore();
                return;
            }else{
                //rock
                winner.textContent = "Player wins";
                pScore++;
                updateScore();
                return;
            }

        }
        //check for scissors
        if (playerChoise === "scissors"){
            if (computerChoise === "rock"){
                winner.textContent = "Computer wins";
                compScore++;
                updateScore();
                return;
            }else{
                //paper
                winner.textContent = "Player wins";
                pScore++;
                updateScore();
                return;
            }

        }

    };

    const updateVars = () => {
        pScore = 0;
        compScore = 0;
        const playerScore = document.querySelector(".player-score p");
        const computerScore = document.querySelector(".computer-score p");
        const playerHand= document.querySelector(".player-hand");
        const computerHand = document.querySelector(".computer-hand");
        const winner = document.querySelector(".winner");
        const options = [document.querySelector(".option .rock"), document.querySelector(".option .paper"), document.querySelector(".option .scissors")];

        playerScore.textContent = pScore;
        computerScore.textContent = compScore;
        playerHand.src = `./images/rock.png`;
        computerHand.src = `./images/rock.png`;
        winner.textContent = "Choose an option";
        options.forEach(option => {
            option.removeAttribute("disabled", "disabled");
        })
    };

    const endGame = () => {
        const matchSection = document.querySelector(".match");
        const winner = document.querySelector(".winner");
        const endWinner = document.querySelector(".end .fs-100");
        const endSection = document.querySelector(".end");
        const playAgainBtn = document.querySelector(".end .play-again");
        const quitBtn = document.querySelector(".end .quit");

        matchSection.classList.remove("fadeIn");
        matchSection.classList.add("fadeOut");
        endSection.classList.remove("fadeOut");
        endSection.classList.add("fadeIn");
        endWinner.textContent = winner.textContent;

        playAgainBtn.addEventListener("click", function () {
            endSection.classList.remove("fadeIn");
            endSection.classList.add("fadeOut");
            const introSection = document.querySelector(".intro");
            introSection.classList.add("fadeIn");
            updateVars();

        });
        quitBtn.addEventListener("click", function () {
            endSection.classList.remove("fadeIn");
            endSection.classList.add("fadeOut");
            const quitSection = document.querySelector(".quit-section");
            quitSection.classList.remove("fadeOut");
            quitSection.classList.add("fadeIn");
            updateVars();
        })

    };
    do{
        startGame();
        playMatch();
    }while(start)


};

game();