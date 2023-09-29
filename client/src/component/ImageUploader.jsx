import React, { useState } from 'react';
import { Button, Container, CssBaseline, Typography, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

function ImageUploader() {
	const [selectedFile, setSelectedFile] = useState(null);

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

	const handleUpload = () => {
		if (!selectedFile) {
			alert('파일을 선택하세요.');
			return;
		}

		const formData = new FormData();
		formData.append('image', selectedFile);

		axios
			.post('YOUR_UPLOAD_API_ENDPOINT', formData)
			.then((response) => {
				console.log('업로드 성공:', response.data);
				// 업로드 성공 후에 필요한 작업을 수행하세요.
			})
			.catch((error) => {
				console.error('업로드 실패:', error);
			});
	};

	const handleReset = () => {
		setSelectedFile(null);
	};

	const fileInputRef = React.createRef();

	const openFileInput = () => {
		fileInputRef.current.click();
	};

	return (
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
								파일을 드래그 앤 드롭하세요 또는
							</Typography>
							<Button
								variant="contained"
								color="primary"
								startIcon={<CloudUploadIcon />}
								onClick={openFileInput}
							>
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
					onClick={handleUpload}
					style={{ marginTop: '20px' }}
				>
					업로드
				</Button>
			</Paper>
		</Container>
	);
}

export default ImageUploader;
