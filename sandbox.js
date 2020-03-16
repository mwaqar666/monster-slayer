new Vue({
    el: '#app',
    data: {

        // Game States Are:
        // 0: Initial State
        // 1: In Progress
        // 2: Result Screen
        gameState: 0,

        // Player Current Health
        myHealth: 25,

        // Monster Current Health
        monsterHealth: 57,

        // HealthShot
        healthShot: 0,

        // Inflicting Damage
        damage: 0,

        // Monster Actions
        monsterActions: ['basicAttack', 'specialAttack', 'heal'],

        // Messages Log
        messages: [],

        // Game Result
        result: '',
    },
    methods: {

        // Attack Can Be Of Two Types
        // 0: Basic Attack ( 0 - 5 Damage )
        // 1: Special Attack ( 0 - 20 Damage )
        //
        // Second Parameter Defines The Attacker
        attack: function(type, by) {
            this.damage = type === 0 ? this.getRandomInt(1, 10) : this.getRandomInt(10, 20);
            if (by === 'me') {
                this.damage > this.monsterHealth ? this.damage = this.monsterHealth: undefined;
                this.monsterHealth -= this.damage;
            } else {
                this.damage > this.myHealth ? this.damage = this.myHealth: undefined;
                this.myHealth -= this.damage;
            }
        },

        // Heal Self
        heal: function(entity) {
            this.healthShot = this.getRandomInt(5, 10);
            if (entity === 'me') {
                this.healthShot > (100 - this.myHealth) ? this.healthShot = (100 - this.myHealth) : undefined;
                this.myHealth += this.healthShot;
            } else {
                this.healthShot > (100 - this.monsterHealth) ? this.healthShot = (100 - this.monsterHealth) : undefined;
                this.monsterHealth += this.healthShot;
            }
        },

        // Enable Or Disable Heal Button
        enableOrDisableHeal: function () {
            return this.myHealth >= 100;
        },

        // Fill The Health Bar
        HealthBar: function (entity) {
            return entity === 'mine' ? { 'width': this.myHealth + '%' } : { 'width': this.monsterHealth + '%' };
        },

        // Show Health Color
        HealthColor: function (entity) {
            return entity === 'mine' ? [
                { 'green': this.myHealth >= 65 },
                { 'yellow': (this.myHealth >= 30) && (this.myHealth < 65) },
                { 'red': this.myHealth < 30 },
            ] : [
                { 'green': this.monsterHealth >= 65 },
                { 'yellow': (this.monsterHealth >= 30) && (this.monsterHealth < 65) },
                { 'red': this.monsterHealth < 30 },
            ]
        },

        // Initiate The Game
        initiateGame: function() {
            this.myHealth = 100;
            this.monsterHealth = 100;
            this.gameState = 1;
        },

        // Initiate My Action
        initiateMyAction: function (type, attackType = null) {
            if (type === 'heal') {
                this.heal('me');
            } else if (type === 'attack') {
                (attackType === 'basic') ? this.attack(0, 'me') : this.attack(1, 'me');
            } else {

            }
            this.initiateMonsterAction();
        },

        // Initiate Monster Action
        initiateMonsterAction: function () {
            let action = this.monsterActions[Math.round(Math.random() * (this.monsterActions.length - 1))];
            if (action === 'heal') {
                this.monsterHealth < 100 ? this.heal('monster') : action = this.monsterActions[Math.round(Math.random() * (this.monsterActions.length - 2))];
            }
            if (action === 'basicAttack') {
                this.attack(0, 'monster');
            }
            if (action === 'specialAttack') {
                this.attack(1, 'monster');
            }
        },

        // Generates A Random Number In Given Range
        getRandomInt: function (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
});
