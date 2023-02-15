import React from "react"
import {
	signInAuthUserWithEmail,
	signInWithGooglePopup,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils"
import FormInput from "../form-input/form-input-component"
import Button from "../button/button.component"
import "./sign-in-form.styles.scss"

const defaultFormFields = {
	email: "",
	password: "",
}

const SignInForm = () => {
	const [formFields, setFormFields] = React.useState(defaultFormFields)
	const { email, password } = formFields

	const resetFormFields = () => {
		setFormFields(defaultFormFields)
	}

	const signInWithGoogle = async () => {
		const { user } = await signInWithGooglePopup()
		await createUserDocumentFromAuth(user)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		try {
			const { user } = await signInAuthUserWithEmail(email, password)
			resetFormFields()
		} catch (error) {
			console.log("user login failed", error)
		}
	}

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormFields({ ...formFields, [name]: value })
	}

	return (
		<div className="sign-up-container">
			<h2>I already have an account</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Email"
					type="email"
					required
					onChange={handleChange}
					name="email"
					value={email}
				/>
				<FormInput
					label="Password"
					type="password"
					required
					onChange={handleChange}
					name="password"
					value={password}
				/>
				<div className="buttons-container">
					<Button type="submit">Sign In</Button>
					<Button
						id="google-btn"
						buttonType="google"
						onClick={signInWithGoogle}
					>
						Sign In With Google
					</Button>
				</div>
			</form>
		</div>
	)
}

export default SignInForm
