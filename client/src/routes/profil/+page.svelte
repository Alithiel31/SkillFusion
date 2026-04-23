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
						stroke="#1d4e89"
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
		<div class="badges-card">
			<h2 class="badges-title">Mes badges</h2>
			<div class="badges-list">
				<div class="badge-item">
					<div class="badge-icon badge-icon--gold">☆</div>
					<span class="badge-label">Première réalisation</span>
				</div>
				<div class="badge-item">
					<div class="badge-icon badge-icon--green">✓</div>
					<span class="badge-label">Cours terminé</span>
				</div>
				<div class="badge-item">
					<div class="badge-icon badge-icon--blue">↝</div>
					<span class="badge-label">En progression</span>
				</div>
				<div class="badge-item">
					<div class="badge-icon badge-icon--gray">☆</div>
					<span class="badge-label">À débloquer</span>
				</div>
			</div>
		</div>
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
		background-color: #dbeafe;
	}

	.avatar-icon svg {
		width: 100%;
		height: 100%;
	}

	.avatar-edit {
		position: absolute;
		top: -15px;
		right: 0;
		border-radius: 10px;
		background: #fff;
		border: 1px solid #e5e7eb;
		font-size: 0.7rem;
		cursor: pointer;
		padding: 5px;
	}

	.avatar-edit:hover {
		background-color: #f3f4f6;
	}

	.badges-card {
		background: white;
		border-radius: 20px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		padding: 30px 40px;
		margin-top: 20px;
	}

	.badges-title {
		color: #1d4e89;
		font-size: 1rem;
		font-weight: 700;
		margin-bottom: 20px;
	}

	.badges-list {
		display: flex;
		gap: 24px;
	}

	.badge-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
	}

	.badge-icon {
		width: 52px;
		height: 52px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.3rem;
		border: 2px solid;
	}

	.badge-icon--gold {
		border-color: #f59e0b;
		color: #f59e0b;
		background: #fffbeb;
	}
	.badge-icon--green {
		border-color: #22c55e;
		color: #22c55e;
		background: #f0fdf4;
	}
	.badge-icon--blue {
		border-color: #1d4e89;
		color: #1d4e89;
		background: #eff6ff;
	}
	.badge-icon--gray {
		border-color: #d1d5db;
		color: #d1d5db;
		background: #f9fafb;
	}

	.badge-label {
		font-size: 0.72rem;
		color: #6b7280;
		text-align: center;
		max-width: 60px;
		line-height: 1.3;
	}

	@media screen and (max-width: 768px) {
		.profil-form {
			flex-direction: column;
			padding: 20px;
		}

		.form-group,
		.form-groups {
			flex-direction: column;
			gap: 10px;
		}

		.form-name,
		.form-firstname,
		.form-email,
		.form-password {
			width: 100%;
		}

		.btn-modify {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}

		.btn-cancel {
			margin-left: 0;
		}

		.avatar-box {
			align-self: center;
			margin-top: 10px;
		}

		.badges-list {
			flex-wrap: wrap;
			justify-content: center;
			gap: 16px;
		}

		.badge-item {
			width: 70px;
		}

		.badges-card {
			padding: 20px;
		}

		.title-page {
			font-size: 1.4rem;
		}

		.profil-form {
			flex-direction: column;
		}

		.avatar-box {
			order: -1;
			align-self: center;
			margin-bottom: 20px;
		}

		.form-fields {
			order: 1;
		}
	}
</style>
