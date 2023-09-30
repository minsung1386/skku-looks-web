import React from 'react';
import { Typography } from '@mui/material';
import ImageResult from '../component/ImageResult';

function ResultPage() {
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
			<Typography style={subtitleStyle}>찾은 이미지</Typography>
			<ImageResult />
		</div>
	);
}

export default ResultPage;
