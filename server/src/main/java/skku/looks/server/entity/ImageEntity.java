package skku.looks.server.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class ImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageName;

    @Lob
    private byte[] imageData;
}
