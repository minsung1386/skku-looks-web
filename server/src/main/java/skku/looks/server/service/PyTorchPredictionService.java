package skku.looks.server.service;

import org.pytorch.Tensor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import skku.looks.server.dto.ImageDto;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

@Service
public class PyTorchPredictionService {

    String ViTScriptPath = "../model/oml_pretrained.py";

    public PyTorchPredictionService() {

    }

    public String predict(String input_image_url) {
        try {
            // Python 스크립트 호출
            Process process = Runtime.getRuntime().exec("python " + ViTScriptPath + " " + input_image_url);

            // Python 스크립트의 출력 받기
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line);
            }

            return output.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return "예측 실패";
        }
    }
}
