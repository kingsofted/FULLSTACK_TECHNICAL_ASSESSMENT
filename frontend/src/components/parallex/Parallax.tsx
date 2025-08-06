import { Container } from 'react-bootstrap'
import { STRINGS } from '../../constants/constant'
import './Parallax.css'

const Parallax = () => {
	return (
		<div className="parallax mb-5">
			<Container className="text-center px-5 py-5 justify-content-center text-white">
				<div className="animated-texts bounceIn">
					<h1>
						Explore the Best jobs at <span className="job-color">{STRINGS.APPLICATION_NAME}</span>
					</h1>
					<h3>Start Your Journey to a Better Career</h3>
				</div>
			</Container>
		</div>
	)
}

export default Parallax
