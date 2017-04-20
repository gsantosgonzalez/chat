<template lang="html">

	<div class="chat-composer">
		<input type="text" placeholder="Mensaje: " v-model="messageText" @keyup.enter = "sendMessage">
		<button class = "btn btn-primary" @click = "sendMessage">Enviar</button>
	</div>
	
</template>

<script>
	export default {
		data() {
			return {
				messageText: ''
			}
		},
		methods: {
			sendMessage() {
				this.$emit('message-sent', {
					body: this.messageText,
					user: {
						name: $('.navbar-right .dropdown-toggle').text()
					}
				});
				this.messageText = '';
			}
		}
	}
</script>

<style lang = "css">
	.chat-composer{
		display: flex;
	}

	.chat-composer input{
		border: 1px solid lightblue;
		flex: 1 auto;
		padding: .5rem 1rem;
	}
</style>