import React from 'react';
import { Typography } from '@mui/material';
import ImageUploader from '../component/ImageUploader';

function Landing() {
	const titleStyle = {
		textAlign: 'center',
		marginTop: '4vh',
		fontSize: '3rem',
		fontWeight: 'bold',
	};

	const subtitleStyle = {
		textAlign: 'center',
		marginTop: '6vh',
		marginBottom: '6vh',
		fontSize: '1.5rem',
		fontWeight: 'bold',
	};

	return (
		<div>
			<Typography variant="h1" style={titleStyle}>
				SKKU-LOOKS
			</Typography>
			<Typography style={subtitleStyle}>찾고 싶은 이미지를 업로드해주세요.</Typography>

			<ImageUploader />
		</div>
	);
}

export default Landing;
