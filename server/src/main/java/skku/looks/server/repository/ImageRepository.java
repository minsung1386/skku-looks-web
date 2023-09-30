package skku.looks.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import skku.looks.server.entity.ImageEntity;

public interface ImageRepository extends JpaRepository<ImageEntity, Long> {
}
