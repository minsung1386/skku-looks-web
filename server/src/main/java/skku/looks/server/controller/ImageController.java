package skku.looks.server.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5000", "http://localhost:3000"})
public class ImageController {
    public ImageController() {}
    private final Logger log = LoggerFactory.getLogger(this.getClass().getSimpleName());
    private final String location = "/tmp/";
    private final Path rootLocation = Paths.get(location);

    Path destinationFile;

    // Flask API 엔드포인트 URL
    String flaskServerUrl = "http://localhost:5000/predict";

    @PostMapping("/upload")
    public ResponseEntity<byte[]> upload(@RequestParam("image")MultipartFile imageFile) throws IOException {
        destinationFile = this.rootLocation.resolve(
                        Paths.get(imageFile.getOriginalFilename()))
                        .normalize().toAbsolutePath();
        try (InputStream inputStream = imageFile.getInputStream()) {
            Files.copy(inputStream, destinationFile,
                    StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            log.error("file save error = {}", e.getMessage());
        }


        try {
            // Flask 서버에 이미지를 전송하기 위해 RestTemplate을 사용
            RestTemplate restTemplate = new RestTemplate();

            // HTTP 요청 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);


            // 이미지 파일을 Flask 서버로 전송
            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("image", new FileSystemResource(destinationFile));
            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            ResponseEntity<byte[]> response = restTemplate.postForEntity(flaskServerUrl, requestEntity, byte[].class);

            if (response.getStatusCode() == HttpStatus.OK) {
                // Flask 서버에서 반환한 이미지를 클라이언트에 반환
                HttpHeaders responseHeaders = new HttpHeaders();
                responseHeaders.setContentType(MediaType.IMAGE_JPEG); // 이미지 타입으로 설정 (이미지 포맷에 따라 변경)

                return new ResponseEntity<>(response.getBody(), responseHeaders, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
