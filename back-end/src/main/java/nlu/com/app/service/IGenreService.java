package nlu.com.app.service;

import java.util.List;
import nlu.com.app.dto.response.GenreResponseDTO;

/**
 * @author VuLuu
 */
public interface IGenreService {

  List<GenreResponseDTO> getAllGenre();
}
