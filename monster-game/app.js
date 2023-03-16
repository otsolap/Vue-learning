function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

let currentRound = 0

const app = Vue.createApp({
    // variable container so to speak.
    // for example we contain the health bars here.
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            battleLogs: [],
        }
    },
    watch: {
        playerHealth(value) {
            if(value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw'
            } else if (value <= 0) {
                this.winner = 'monster'
            }
        },
        monsterHealth(value) {
            if(value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw'
            } else if (value <= 0) {
                this.winner = 'player'
            }
        }
    },
    // actions that happen in vueJS.
    // for example clicks.
    methods: {
        startGame() { 
            this.playerHealth = 100
            this.monsterHealth = 100
            this.winner = null
            this.currentRound = 0
            this.battleLogs = []
        },
        attackMonster() {
            this.currentRound++
            const attackValue = getRandomValue(5, 12)
            this.monsterHealth -= attackValue
            this.addLogMessage('player', 'attack', attackValue)
            this.attackPlayer()
        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 15)
            this.playerHealth -= attackValue
            this.addLogMessage('monster', 'attack', attackValue)
        },
        specialAttackMonster() {
            this.currentRound++
            const attackValue = getRandomValue(10, 25)
            this.monsterHealth -= attackValue
            currentRound++
            this.addLogMessage('player', 'special attack', attackValue)
            this.attackPlayer()
        },
        healPlayer() {
            this.currentRound++
            const healthValue = getRandomValue(8, 20)
            if (this.playerHealth + healthValue > 100) {
                this.playerHealth = 100
            } else {
                this.playerHealth += healthValue
                this.addLogMessage('player', 'health', healthValue)
            }
            this.attackPlayer()
        },
        surrender() {
            this.winner = 'monster'
        },
        addLogMessage(who, what, value) {
            this.battleLogs.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth < 0) {
                return { width: '0%' }
            }
            return { width: this.monsterHealth + '%' }
        },
        playerBarStyles() {
            if (this.playerHealth < 0) {
                return { width: '0%' }
            }
            return { width: this.playerHealth + '%' }
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0
        }
    },
})

app.mount('#game')

