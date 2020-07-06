import React, { useState } from 'react'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../firebase'
import Image from 'material-ui-image';

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block',
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
})

function Register(props) {
	const { classes } = props
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	return (
		<main className={classes.main}>
			<div class="homepage">
			<Paper className={classes.paper}>
					<Image className="image-walmart"
						src={`https://i.ibb.co/xYT5yx8/walmart-logo-24.jpg`}									
					/>
				<Typography component="h1" variant="h5">
					Register Account
       			</Typography>
				<form className={classes.form} onSubmit={e => e.preventDefault() && false }>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="name">Name</InputLabel>
						<Input id="name" name="name" autoComplete="off" autoFocus value={name} onChange={e => setName(e.target.value)} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="email">Email Address</InputLabel>
						<Input id="email" name="email" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)}  />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)}  />
					</FormControl>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={onRegister}
						className={classes.submit}>
						Register
          			</Button>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						component={Link}
						to="/login"
						className={classes.submit}>
						Go back to Login
          			</Button>
				</form>
			</Paper>
			</div>
		</main>
	)

	async function onRegister() {
		try {
			await firebase.register(name, email, password)
			props.history.replace('/')
		} catch(error) {
			alert(error.message)
		}
	}
}

export default withRouter(withStyles(styles)(Register))