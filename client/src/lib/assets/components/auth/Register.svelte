<script>
/** Il faut importer le logo */
</script>

<!-- Composant d'inscription -->
<div class="register-container">
	<h1>Inscription</h1>
	<span class="introduction"><p>Rejoins SkillFusion gratuitement</p></span>
	<form class="register-form">
		<label for="name">Pseudo</label>
		<input type="text" id="name" name="name" placeholder="Jeannot#336" required />

		<label for="email">E-mail</label>
		<input type="email" id="email" name="email" placeholder="JeanPaul@nanana.com" required />

		<label for="password">Mot de passe</label>
		<input type="password" id="password" name="password" placeholder="••••••••" required />

		<label for="confirm-password">Confirmer</label>
		<input
			type="password"
			id="confirm-password"
			name="confirm-password"
			placeholder="••••••••"
			required
		/>

		<button class="btn-register" type="submit">S'inscrire</button>

		<div>
			<p class="already-account">
				Déjà inscrit ?
				<a class="btn-login" href="/connexion">Se connecter</a>
			</p>
		</div>
	</form>
</div>

<style>
	:global(body) {
		background-color: #f3f0eaff;
	}

	.already-account {
		text-align: center;
		margin-top: 20px;
	}

	h1 {
		text-align: center;
		margin-bottom: 0px;
        color: #1d4e89;
	}

    p {
        margin-top: 5px;
    }

	.introduction {
		text-align: center;
		margin-bottom: 20px;
	}

	.btn-register {
		text-align: center;
		padding: 10px 20px;
		cursor: pointer;
		background-color: orange;
		border-radius: 10px;
		border: none;
		color: #1d4e89;
		font-weight: bold;
		margin-top: 10px;
	}

	.btn-login {
		text-decoration: none;
        color: #1d4e89;
	}

    .btn-login:hover {
        text-decoration: underline;
    }

	.register-container {
		max-width: 400px;
		margin: 0 auto;
		padding: 20px;
		margin-top: 100px;
	}

	.register-form {
		display: flex;
		flex-direction: column;
		background-color: white;
		padding: 40px;
		border-radius: 20px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.register-form label {
		margin-bottom: 5px;
	}

	.register-form input {
		margin-bottom: 10px;
		padding: 5px;
		border-radius: 10px;
		border: 1px solid lightgray;
	}

	@media (min-width: 1024px) {
		.register-container {
			margin-top: 150px;
		}
	}

	@media (max-width: 768px) {
		.register-container {
			padding: 10px;
		}

		.register-form {
			padding: 20px;
		}

		.introduction {
			display: none;
		}
        h1 {
            margin-bottom: 20px
        }
	}
</style>
