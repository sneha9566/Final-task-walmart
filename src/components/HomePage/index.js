import React from 'react'
import { Typography, Paper, Avatar, Button } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import Image from 'material-ui-image';

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
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
	
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
})

function HomePage(props) {
	const { classes } = props
	return (
		<main className={classes.main}>
			<div class="homepage">
			<Paper className={classes.paper}>
					<Image className="image-walmart"
						src={`https://i.ibb.co/xYT5yx8/walmart-logo-24.jpg`}									
					/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					component={Link}
					to="/register"
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
					Login
          		</Button>
			</Paper>
			</div>
		</main>
	)
}

export default withStyles(styles)(HomePage)