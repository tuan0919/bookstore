package nlu.com.app.controller;

import lombok.RequiredArgsConstructor;
import nlu.com.app.dto.AppResponse;
import nlu.com.app.dto.request.PutObjectDTO;
import nlu.com.app.service.IFileService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/api/v1/file")
@RestController
@RequiredArgsConstructor
public class FileController {
    private final IFileService fileService;

    @PutMapping("/sign-upload")
    public AppResponse<String> generatePresignedURL(@RequestBody PutObjectDTO putObjectDTO) {;
        return AppResponse.<String>builder()
                .result(fileService.signPutObjectRequest(putObjectDTO))
                .build();
    }

    @PutMapping("/upload")
    public AppResponse<String> uploadFiles(@RequestParam("files") MultipartFile[] files) {
        for (MultipartFile file : files) {
            fileService.uploadFile(file);
        }
        return AppResponse.<String>builder()
                .result("OK")
                .build();
    }
}
