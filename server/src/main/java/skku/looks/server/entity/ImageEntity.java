package skku.looks.server.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Entity
@Getter
public class ImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageName;

    private String imageUrl;

    @Lob
    private byte[] imageData;

    public ImageEntity(String originalFilename, byte[] bytes) {
        this.imageName = originalFilename;
        this.imageData = bytes;
    }
}
