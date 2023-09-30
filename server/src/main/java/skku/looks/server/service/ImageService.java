package skku.looks.server.service;

import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class ImageService {

    /*
     입력 이미지 임시 저장
     */
    public String saveImage(MultipartFile imageFile) throws IOException {
        String fileName = StringUtils.cleanPath(imageFile.getOriginalFilename());

        String imageUploadDirectory = "../images/";
        Path uploadPath = Paths.get(imageUploadDirectory);

        if (!uploadPath.toFile().exists()) {
            uploadPath.toFile().mkdirs();
        }

        File tempFile = File.createTempFile("temp-", fileName, uploadPath.toFile());
        try (FileOutputStream fos = new FileOutputStream(tempFile)) {
            FileCopyUtils.copy(imageFile.getInputStream(), fos);
        }

        // 저장된 이미지의 URL 생성
        String imageUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("../images/")
                .path(tempFile.getName())
                .toUriString();

        return imageUrl;
    }


    /*
     DB에서 이미지 불러오기
     */
    public byte[] loadImage(String imageUrl) throws IOException {
        // 이미지 파일의 경로를 얻습니다.
        String url = imageUrl.replace("../", ""); // 이미지 URL에서 '../' 제거
        Path imagePath = Paths.get(url);

        // 해당 경로의 이미지 파일을 읽어옵니다.
        byte[] imageBytes = Files.readAllBytes(imagePath);

        return imageBytes;
    }


    /*
     임시 저장한 입력 이미지 삭제
     */
    public void deleteImage(String imageUrl) throws IOException {
        // 이미지 파일의 경로를 얻습니다.
        String imagePath = imageUrl.replace("../", ""); // 이미지 URL에서 '../' 제거
        Path imageToDelete = Paths.get(imagePath);

        // 이미지 파일을 삭제합니다.
        Files.delete(imageToDelete);
    }
}
