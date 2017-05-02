
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('chat-message', require('./components/ChatMessage.vue'));
Vue.component('chat-log', require('./components/ChatLog.vue'));
Vue.component('chat-composer', require('./components/ChatComposer.vue'));

const app = new Vue({
    el: '#app',
    data: {
    	messages: [],
        usersInRoom: []
    },
    methods: {
    	addMessage(message) {
            //Show the message in the log
    		this.messages.push(message);

            //Persist it to the database
            axios.post('/messages', message).then(response => {
                console.log(message);
            });
    	}
    },
    created() {
        axios.get('/messages').then(response => {
            this.messages = response.data;
        });

        Echo.join('chatroom')
            .here((users) => {
                this.usersInRoom = users;
            })
            .joining((user) => {
                this.usersInRoom.push(user);
            })
            .leaving((user) => {
                this.usersInRoom = this.usersInRoom.filter(u => u != user)
            })
            .listen('MessagePosted', (e) => {
                console.log(e);
                this.messages.push({
                    body: e.message.body,
                    user: e.user
                });
        });
    }
});
