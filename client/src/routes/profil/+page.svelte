<script>
	import Footer from '$lib/assets/components/Footer.svelte';
	import Header from '$lib/assets/components/Header.svelte';
</script>

<Header />

<div class="profil-container">
	<h1 class="title-page">Mes informations</h1>
	<div class="profil-wrapper">
		<form class="profil-form">
			<div class="form-fields">
				<div class="form-group">
					<span class="form-name">
						<label for="name">Nom </label>
						<input type="text" id="name" name="name" placeholder="Dupont" />
					</span>
					<span class="form-firstname">
						<label for="firstname">Prénom </label>
						<input type="text" id="firstname" name="firstname" placeholder="Jean" />
					</span>
				</div>
				<div class="form-groups">
					<span class="form-email">
						<label for="email">E-mail</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="jean.dupont@email.com"
							required
						/>
					</span>
					<span class="form-password">
						<label for="password">Mot de passe</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Modifier mon mot de passe"
							required
						/>
					</span>
				</div>
				<div class="btn-modify">
					<button class="btn-update" type="submit">Enregistrer les modifications</button>
					<button class="btn-cancel" type="submit">Annuler</button>
				</div>
			</div>

			<div class="avatar-box">
				<button class="avatar-edit" type="button">✎</button>
				<div class="avatar-icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#94a3b8"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
						<circle cx="12" cy="7" r="4" />
					</svg>
				</div>
			</div>
		</form>
	</div>
</div>

<Footer />

<style>
	:global(body) {
		background-color: #f3f0eaff;
	}

	.title-page {
		text-align: center;
		color: #1d4e89;
		margin-bottom: 20px;
	}

	.profil-container {
		max-width: 100%;
		margin: 2rem auto;
		padding: 0 1.5rem;
	}
.form-fields {
    display: flex;
    flex-direction: column;
    flex: 1;
}
	.profil-form {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
		gap: 20px;
		background-color: white;
		padding: 40px;
		border-radius: 20px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.profil-wrapper {
		display: block;
	}

	.form-name input,
	.form-firstname input,
	.form-email input,
	.form-password input {
		border-radius: 10px;
		padding: 10px;
		margin-bottom: 20px;
		border: 1px solid lightgray;
	}

	.form-name label,
	.form-firstname label {
		margin-bottom: 10px;
	}

	.form-firstname,
	.form-name {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.form-group {
		display: flex;
		gap: 20px;
	}

	.form-groups {
		display: flex;
		gap: 20px;
	}

	.form-email label,
	.form-password label {
		margin-bottom: 10px;
	}

	.form-email,
	.form-password {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.btn-update {
		text-align: center;
		padding: 15px;
		cursor: pointer;
		background-color: #1d4e89;
		border-radius: 10px;
		border: none;
		color: white;
		font-weight: bold;
		margin-top: 10px;
	}

	.btn-update:hover {
		background-color: rgb(29, 78, 137, 0.8);
	}

	.btn-cancel {
		text-align: center;
		padding: 15px;
		cursor: pointer;
		background-color: white;
		border-radius: 10px;
		border: 1px solid rgb(245, 240, 240);
		color: black;
		margin-top: 10px;
		margin-left: 10px;
	}

	.btn-cancel:hover {
		background-color: rgb(245, 240, 240);
	}

	.avatar-box {
		position: relative;
		width: 110px;
		height: 110px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.avatar-icon {
		width: 100%;
		height: 100%;
		background: #e8edf5;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.2rem;
	}

	.avatar-icon svg {
		width: 100%;
		height: 100%;
	}

	.avatar-edit {
		position: absolute;
		top: 6px;
		right: 6px;
		width: 22px;
		height: 22px;
		border-radius: 4px;
		background: #fff;
		border: 1px solid #e5e7eb;
		font-size: 0.7rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
	}
</style>
