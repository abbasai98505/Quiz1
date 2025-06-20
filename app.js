// Quiz Game Application
class QuizGame {
    constructor() {
        this.gameState = {
            currentPlayer: 1,
            players: [
                { id: 1, name: '', score: 0, correctAnswers: 0, wrongAnswers: [] },
                { id: 2, name: '', score: 0, correctAnswers: 0, wrongAnswers: [] },
                { id: 3, name: '', score: 0, correctAnswers: 0, wrongAnswers: [] },
                { id: 4, name: '', score: 0, correctAnswers: 0, wrongAnswers: [] }
            ],
            activePlayers: 1,
            currentQuestionIndex: 0,
            totalQuestions: 10,
            isGameComplete: false,
            timeRemaining: 30,
            hasAnswered: false
        };
        
        this.questions = [];
        this.timer = null;
        this.timerInterval = null;
        
        this.initializeEventListeners();
        this.hideLoading();
    }
    
    initializeEventListeners() {
        // Player count selection
        document.querySelectorAll('.player-count-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectPlayerCount(e.target.closest('.player-count-btn')));
        });
        
        // Player inputs
        document.getElementById('player1-name').addEventListener('input', () => this.validateInputs());
        document.getElementById('player2-name').addEventListener('input', () => this.validateInputs());
        document.getElementById('player3-name').addEventListener('input', () => this.validateInputs());
        document.getElementById('player4-name').addEventListener('input', () => this.validateInputs());
        
        // Start game
        document.getElementById('start-game').addEventListener('click', () => this.startGame());
        
        // Next question
        document.getElementById('next-question').addEventListener('click', () => this.nextQuestion());
        
        // Play again
        document.getElementById('play-again').addEventListener('click', () => this.resetGame());
        
        // Share result
        document.getElementById('share-result').addEventListener('click', () => this.shareResult());
    }
    
    hideLoading() {
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('start-screen').classList.remove('hidden');
        }, 1000);
    }
    
    selectPlayerCount(button) {
        // Remove active class from all buttons
        document.querySelectorAll('.player-count-btn').forEach(btn => btn.classList.remove('active'));
        
        // Add active class to selected button
        button.classList.add('active');
        
        // Get player count
        const playerCount = parseInt(button.dataset.count);
        this.gameState.activePlayers = playerCount;
        
        // Show/hide player inputs
        document.getElementById('player2-input').classList.toggle('hidden', playerCount < 2);
        document.getElementById('player3-input').classList.toggle('hidden', playerCount < 3);
        document.getElementById('player4-input').classList.toggle('hidden', playerCount < 4);
        
        this.validateInputs();
    }
    
    validateInputs() {
        const player1Name = document.getElementById('player1-name').value.trim();
        const player2Name = document.getElementById('player2-name').value.trim();
        const player3Name = document.getElementById('player3-name').value.trim();
        const player4Name = document.getElementById('player4-name').value.trim();
        const startBtn = document.getElementById('start-game');
        
        let isValid = player1Name.length > 0;
        
        if (this.gameState.activePlayers >= 2) isValid = isValid && player2Name.length > 0;
        if (this.gameState.activePlayers >= 3) isValid = isValid && player3Name.length > 0;
        if (this.gameState.activePlayers >= 4) isValid = isValid && player4Name.length > 0;
        
        startBtn.disabled = !isValid;
    }
    
    startGame() {
        // Get player names
        this.gameState.players[0].name = document.getElementById('player1-name').value.trim();
        this.gameState.players[1].name = document.getElementById('player2-name').value.trim();
        if (this.gameState.activePlayers >= 3) this.gameState.players[2].name = document.getElementById('player3-name').value.trim();
        if (this.gameState.activePlayers >= 4) this.gameState.players[3].name = document.getElementById('player4-name').value.trim();
        
        // Reset game state
        this.gameState.currentPlayer = 1;
        this.gameState.currentQuestionIndex = 0;
        this.gameState.isGameComplete = false;
        this.gameState.timeRemaining = 30;
        this.gameState.hasAnswered = false;
        
        // Reset player scores
        for (let i = 0; i < this.gameState.activePlayers; i++) {
            this.gameState.players[i].score = 0;
            this.gameState.players[i].correctAnswers = 0;
            this.gameState.players[i].wrongAnswers = [];
        }
        
        // Get random questions
        this.questions = getRandomQuestions(this.gameState.totalQuestions);
        
        // Switch to game screen
        this.showScreen('game-screen');
        this.initializeGameScreen();
        this.displayQuestion();
        this.startTimer();
    }
    
    initializeGameScreen() {
        // Show/hide player cards
        document.getElementById('player2-card').classList.toggle('hidden', this.gameState.activePlayers < 2);
        document.getElementById('player3-card').classList.toggle('hidden', this.gameState.activePlayers < 3);
        document.getElementById('player4-card').classList.toggle('hidden', this.gameState.activePlayers < 4);
        
        // Update player names and reset scores
        for (let i = 0; i < this.gameState.activePlayers; i++) {
            document.getElementById(`player${i+1}-display`).textContent = this.gameState.players[i].name;
            document.getElementById(`player${i+1}-score`).textContent = '0';
            document.getElementById(`player${i+1}-card`).classList.remove('active');
        }
        
        // Set first player as active
        document.getElementById('player1-card').classList.add('active');
        
        // Update question counter
        document.getElementById('total-questions').textContent = this.gameState.totalQuestions;
        
        // Reset progress
        this.updateProgress();
    }
    
    displayQuestion() {
        const question = this.questions[this.gameState.currentQuestionIndex];
        
        // Update question text
        document.getElementById('question-text').textContent = question.q;
        
        // Update question counter
        document.getElementById('current-question').textContent = this.gameState.currentQuestionIndex + 1;
        
        // Update current player indicator
        const currentPlayerName = this.gameState.players[this.gameState.currentPlayer - 1].name;
        document.getElementById('current-player-indicator').textContent = `${currentPlayerName}'s Turn`;
        
        // Highlight current player card
        document.querySelectorAll('.player-card').forEach(card => card.classList.remove('active'));
        document.getElementById(`player${this.gameState.currentPlayer}-card`).classList.add('active');
        
        // Create choice buttons
        const choicesContainer = document.getElementById('choices-container');
        choicesContainer.innerHTML = '';
        
        question.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice';
            button.textContent = choice;
            button.addEventListener('click', () => this.answerQuestion(index));
            choicesContainer.appendChild(button);
        });
        
        // Reset timer
        this.gameState.timeRemaining = 30;
        this.gameState.hasAnswered = false;
        document.getElementById('next-question').classList.add('hidden');
    }
    
    startTimer() {
        this.updateTimerDisplay();
        
        this.timerInterval = setInterval(() => {
            this.gameState.timeRemaining--;
            this.updateTimerDisplay();
            
            if (this.gameState.timeRemaining <= 0) {
                this.timeUp();
            }
        }, 1000);
    }
    
    updateTimerDisplay() {
        const timerText = document.getElementById('timer-text');
        const timerProgress = document.getElementById('timer-progress');
        
        timerText.textContent = this.gameState.timeRemaining;
        
        // Calculate progress (283 is the circumference of the circle)
        const progress = (this.gameState.timeRemaining / 30) * 283;
        timerProgress.style.strokeDashoffset = 283 - progress;
        
        // Change color based on time remaining
        if (this.gameState.timeRemaining <= 5) {
            timerProgress.style.stroke = '#FF0000'; // Red
        } else if (this.gameState.timeRemaining <= 10) {
            timerProgress.style.stroke = '#FF6B6B'; // Light red
        } else {
            timerProgress.style.stroke = '#DC143C'; // Primary red
        }
    }
    
    answerQuestion(answerIndex) {
        if (this.gameState.hasAnswered) return;
        
        this.gameState.hasAnswered = true;
        clearInterval(this.timerInterval);
        
        const question = this.questions[this.gameState.currentQuestionIndex];
        const isCorrect = answerIndex === question.answer;
        const currentPlayer = this.gameState.players[this.gameState.currentPlayer - 1];
        
        // Update player stats
        if (isCorrect) {
            currentPlayer.score++;
            currentPlayer.correctAnswers++;
        } else {
            currentPlayer.wrongAnswers.push({
                question: question.q,
                userAnswer: question.choices[answerIndex],
                correctAnswer: question.choices[question.answer]
            });
        }
        
        // Update player score display
        document.getElementById(`player${this.gameState.currentPlayer}-score`).textContent = currentPlayer.score;
        
        // Show correct/wrong answers
        const choices = document.querySelectorAll('.choice');
        choices.forEach((choice, index) => {
            choice.classList.add('disabled');
            if (index === question.answer) {
                choice.classList.add('correct');
            } else if (index === answerIndex && !isCorrect) {
                choice.classList.add('wrong');
            }
        });
        
        // Show next button
        document.getElementById('next-question').classList.remove('hidden');
        
        // Play sound feedback
        this.playFeedbackSound(isCorrect);
    }
    
    timeUp() {
        if (this.gameState.hasAnswered) return;
        
        this.gameState.hasAnswered = true;
        clearInterval(this.timerInterval);
        
        const question = this.questions[this.gameState.currentQuestionIndex];
        const currentPlayer = this.gameState.players[this.gameState.currentPlayer - 1];
        
        // Add as wrong answer
        currentPlayer.wrongAnswers.push({
            question: question.q,
            userAnswer: "Time ran out",
            correctAnswer: question.choices[question.answer]
        });
        
        // Show correct answer
        const choices = document.querySelectorAll('.choice');
        choices.forEach((choice, index) => {
            choice.classList.add('disabled');
            if (index === question.answer) {
                choice.classList.add('correct');
            }
        });
        
        document.getElementById('next-question').classList.remove('hidden');
        this.playFeedbackSound(false);
    }
    
    nextQuestion() {
        this.gameState.currentQuestionIndex++;
        
        if (this.gameState.currentQuestionIndex >= this.gameState.totalQuestions) {
            this.endGame();
            return;
        }
        
        // Switch to next player
        this.gameState.currentPlayer = (this.gameState.currentPlayer % this.gameState.activePlayers) + 1;
        
        this.updateProgress();
        this.displayQuestion();
        this.startTimer();
    }
    
    updateProgress() {
        const progressPercentage = ((this.gameState.currentQuestionIndex + 1) / this.gameState.totalQuestions) * 100;
        document.getElementById('progress-fill').style.width = `${progressPercentage}%`;
    }
    
    endGame() {
        this.gameState.isGameComplete = true;
        this.showScreen('result-screen');
        this.displayResults();
    }
    
    displayResults() {
        // Show/hide player result cards
        document.getElementById('final-player3-score').classList.toggle('hidden', this.gameState.activePlayers < 3);
        document.getElementById('final-player4-score').classList.toggle('hidden', this.gameState.activePlayers < 4);
        
        // Determine winner(s)
        const maxScore = Math.max(...this.gameState.players.slice(0, this.gameState.activePlayers).map(p => p.score));
        const winners = this.gameState.players.slice(0, this.gameState.activePlayers).filter(p => p.score === maxScore);
        
        // Update result title
        if (winners.length === 1) {
            document.getElementById('result-title').textContent = `${winners[0].name} Wins!`;
            document.getElementById('result-subtitle').textContent = 'Congratulations!';
        } else {
            const winnerNames = winners.map(w => w.name).join(' & ');
            document.getElementById('result-title').textContent = `${winnerNames} Tie!`;
            document.getElementById('result-subtitle').textContent = 'Great game!';
        }
        
        // Update final scores for all active players
        for (let i = 0; i < this.gameState.activePlayers; i++) {
            const player = this.gameState.players[i];
            document.getElementById(`final-player${i+1}-name`).textContent = player.name;
            document.getElementById(`final-player${i+1}-score`).textContent = player.score;
            document.getElementById(`final-player${i+1}-accuracy`).textContent = 
                `${this.calculateAccuracy(player)}% Accuracy`;
        }
        
        // Save to local storage
        this.saveGameToLocalStorage();
    }
    
    calculateAccuracy(player) {
        const totalAnswered = player.correctAnswers + player.wrongAnswers.length;
        return totalAnswered === 0 ? 0 : Math.round((player.correctAnswers / totalAnswered) * 100);
    }
    
    resetGame() {
        // Clear any running timers
        clearInterval(this.timerInterval);
        
        // Reset form
        document.getElementById('player1-name').value = '';
        document.getElementById('player2-name').value = '';
        document.getElementById('player3-name').value = '';
        document.getElementById('player4-name').value = '';
        
        // Show start screen
        this.showScreen('start-screen');
        this.validateInputs();
    }
    
    shareResult() {
        const maxScore = Math.max(...this.gameState.players.slice(0, this.gameState.activePlayers).map(p => p.score));
        const winners = this.gameState.players.slice(0, this.gameState.activePlayers).filter(p => p.score === maxScore);
        
        let resultText;
        if (winners.length === 1) {
            resultText = `🏆 ${winners[0].name} won the Knowledge Challenge quiz with ${winners[0].score}/${this.gameState.totalQuestions} points!`;
        } else {
            const winnerNames = winners.map(w => w.name).join(' & ');
            resultText = `🤝 ${winnerNames} tied in Knowledge Challenge quiz with ${maxScore}/${this.gameState.totalQuestions} points!`;
        }
        
        if (navigator.share) {
            navigator.share({
                title: 'Knowledge Challenge Quiz Result',
                text: resultText,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(resultText).then(() => {
                alert('Result copied to clipboard!');
            });
        }
    }
    
    saveGameToLocalStorage() {
        const gameHistory = JSON.parse(localStorage.getItem('quizGameHistory') || '[]');
        const gameRecord = {
            id: Date.now(),
            date: new Date().toISOString(),
            players: this.gameState.players.slice(0, this.gameState.activePlayers),
            totalQuestions: this.gameState.totalQuestions
        };
        gameHistory.unshift(gameRecord);
        
        // Keep only last 10 games
        if (gameHistory.length > 10) {
            gameHistory.splice(10);
        }
        
        localStorage.setItem('quizGameHistory', JSON.stringify(gameHistory));
    }
    
    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => screen.classList.add('hidden'));
        
        // Show target screen
        document.getElementById(screenId).classList.remove('hidden');
    }
    
    playFeedbackSound(isCorrect) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            if (isCorrect) {
                // Success sound
                oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
                oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
            } else {
                // Error sound
                oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(200, audioContext.currentTime + 0.1);
            }
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            // Silently fail if audio context is not available
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuizGame();
});