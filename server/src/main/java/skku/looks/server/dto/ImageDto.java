package skku.looks.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import skku.looks.server.entity.ImageEntity;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ImageDto {
    private String imageName;
    private byte[] imageData;

    public static ImageDto fromEntity(ImageEntity entity) {
        ImageDto dto = new ImageDto(entity.getImageName(), entity.getImageData());
        return dto;
    }
}
