import React, { useState } from 'react';
import { Button, Container, CssBaseline, Typography, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

function ImageUploader() {
	axios.defaults.baseURL = 'http://localhost:8080';

	const [selectedFile, setSelectedFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [imageData, setImageData] = useState(null);

	const handleFileChange = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	const handleFileDrop = (e) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		setSelectedFile(file);
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	const handleSearchImage = () => {
		setLoading(true);

		if (!selectedFile) {
			alert('파일을 선택하세요.');
			return;
		}

		const formData = new FormData();
		formData.append('image', selectedFile);

		axios
			.post('/api/upload', formData, { responseType: 'arraybuffer' })
			.then((response) => {
				const blob = new Blob([response.data], { type: 'image/jpeg' });
				const imageUrl = URL.createObjectURL(blob);

				setImageData(imageUrl);
				setLoading(false);
			})
			.catch((error) => {
				console.error('업로드 실패:', error);
			});
	};

	const handleReset = () => {
		setSelectedFile(null);
		setImageData(null);
	};

	const fileInputRef = React.createRef();

	const openFileInput = () => {
		fileInputRef.current.click();
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'row' }}>
			{/* 이미지 선택 component */}
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Paper elevation={3} style={{ padding: '20px' }}>
					<Typography variant="h5" gutterBottom>
						이미지 업로드
					</Typography>
					<div
						onDrop={handleFileDrop}
						onDragOver={handleDragOver}
						style={{
							border: '2px dashed #cccccc',
							borderRadius: '5px',
							textAlign: 'center',
							padding: '20px',
							cursor: 'pointer',
						}}
					>
						{selectedFile ? (
							<div>
								<img
									src={URL.createObjectURL(selectedFile)} // 선택한 이미지 미리 보기
									alt="선택한 이미지"
									style={{
										maxWidth: '100%',
										maxHeight: '200px',
										marginBottom: '10px',
									}}
								/>
								<Typography variant="body1" gutterBottom>
									파일 선택됨: {selectedFile.name}
								</Typography>
								<Button
									variant="contained"
									color="secondary"
									startIcon={<DeleteIcon />}
									onClick={handleReset}
								>
									다시 선택
								</Button>
							</div>
						) : (
							<div>
								<Typography variant="body1" color="textSecondary" gutterBottom>
									파일 드래그앤드롭
								</Typography>
								<Typography variant="body1" color="textSecondary" gutterBottom>
									또는
								</Typography>
								<Button variant="contained" color="primary" onClick={openFileInput}>
									파일 선택
								</Button>
								<input
									type="file"
									accept="image/*"
									onChange={handleFileChange}
									ref={fileInputRef}
									style={{ display: 'none' }}
								/>
							</div>
						)}
					</div>
					<Button
						variant="contained"
						color="primary"
						startIcon={<CloudUploadIcon />}
						onClick={handleSearchImage}
						style={{ marginTop: '20px' }}
					>
						찾기
					</Button>
				</Paper>
			</Container>
			{/* 결과 이미지 component */}
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Paper elevation={3} style={{ padding: '20px' }}>
					<div
						style={{
							display: 'flex',
							border: '2px dashed #cccccc',
							borderRadius: '5px',
							textAlign: 'center',
							padding: '20px',
							cursor: 'pointer',
							maxWidth: '100%',
							height: '420px',
						}}
					>
						{loading && <p>로딩중...</p>}
						{imageData && (
							<div>
								<img
									style={{ width: '300px', height: 'auto' }}
									className="imageResult"
									alt="검색된 이미지"
									src={imageData}
								/>
							</div>
						)}
					</div>
				</Paper>
			</Container>
		</div>
	);
}

export default ImageUploader;
