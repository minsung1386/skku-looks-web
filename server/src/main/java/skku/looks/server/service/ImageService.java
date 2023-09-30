package skku.looks.server.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import skku.looks.server.repository.ImageRepository;

@Service
public class ImageService {
    private final ImageRepository imageRepository;

    // 이미지 저장

    // 유사도 계산
    public Image predict(MultipartFile imageFile) {
        // 이미지 파일을 ViT 모델에 입력으로 전달
        try {
            // 전처리

            //
        }
    }
}
