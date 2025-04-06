package nlu.com.app.service;

import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.constant.EGenre;
import nlu.com.app.entity.Genre;
import nlu.com.app.repository.GenreRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author VuLuu
 */
@Service
@RequiredArgsConstructor
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class GenreService {

  GenreRepository genreRepository;

  public void initData() {
    Genre comedy = Genre.builder().name(EGenre.COMEDY).build();
    Genre fantasy = Genre.builder().name(EGenre.FANTASY).build();
    Genre shounen = Genre.builder().name(EGenre.SHOUNEN).build();
    Genre action = Genre.builder().name(EGenre.ACTION).build();
    Genre adventure = Genre.builder().name(EGenre.ADVENTURE).build();
    Genre drama = Genre.builder().name(EGenre.DRAMA).build();
    Genre sciFi = Genre.builder().name(EGenre.SCI_FI).build();
    Genre supernatural = Genre.builder().name(EGenre.SUPERNATURAL).build();

    genreRepository.saveAll(List.of(comedy, fantasy, shounen, action, adventure
        , drama, sciFi, supernatural));
  }

}
