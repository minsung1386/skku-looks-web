package skku.looks.server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import skku.looks.server.dto.ImageDto;
import skku.looks.server.entity.ImageEntity;
import skku.looks.server.service.ImageService;
import skku.looks.server.service.PyTorchPredictionService;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class ImageController {
    private PyTorchPredictionService predictionService;
    private final ImageService imageService;

    public ImageController(PyTorchPredictionService predictionService, ImageService imageService)
    {
        this.predictionService = predictionService;
        this.imageService = imageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<byte[]> upload(@RequestParam("imageFile")MultipartFile imageFile) {
        try {
            // 입력 이미지 임시 저장 후 url 받아 오기
            String input_image_url = imageService.saveImage(imageFile);

            // 유사한 이미지 연산
            String output_image_url = predictionService.predict(input_image_url);

            // 이미지 불러오기
            byte[] output_image = imageService.loadImage(output_image_url);

            // 임시 저장한 입력 이미지 삭제
            imageService.deleteImage(input_image_url);


            return ResponseEntity.ok(output_image);
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }

    }
}
