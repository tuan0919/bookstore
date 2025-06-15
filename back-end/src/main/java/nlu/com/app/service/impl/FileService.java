package nlu.com.app.service.impl;

import lombok.RequiredArgsConstructor;
import nlu.com.app.dto.request.PutObjectDTO;
import nlu.com.app.exception.ApplicationException;
import nlu.com.app.exception.ErrorCode;
import nlu.com.app.service.IFileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.HeadObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.io.File;
import java.io.IOException;
import java.time.Duration;

@Service
@RequiredArgsConstructor
public class FileService implements IFileService {
    @Value("${app.aws.bucket.name}")
    private String bucketName;
    @Value("${app.aws.bucket.request-timeout}")
    private int requestTimeout;
    private final S3Presigner s3Presigner;
    private final S3Client s3Client;

    @Override
    public String signPutObjectRequest(PutObjectDTO dto) {
        String key = dto.getKey();
        if (doesObjectExist(key)) {
            throw new ApplicationException(ErrorCode.S3_KEY_OBJECT_DUPLICATED);
        }
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(dto.getKey())
                .build();
        PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                .putObjectRequest(putObjectRequest)
                .signatureDuration(Duration.ofSeconds(requestTimeout))
                .build();
        return s3Presigner.presignPutObject(presignRequest).url().toString();
    }

    @Override
    public String uploadFile(MultipartFile file) {
        try {
            String key = file.getResource().getFilename();
//            if (doesObjectExist(key)) {
//                throw new ApplicationException(ErrorCode.S3_KEY_OBJECT_DUPLICATED);
//            }
            // write this to temp folder
            var tempFile = writeToTempFolder(file, "");
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .contentType(file.getContentType())
                    .build();
            s3Client.putObject(putObjectRequest, RequestBody.fromFile(tempFile));
            return "https://cdn1.anhtuan.online/"+key;
        } catch (IOException e) {
            e.printStackTrace();
            throw new ApplicationException(ErrorCode.UNEXPECTED_BEHAVIOR);
        }
    }

    public String uploadFile(File file, String key) {
//        if (doesObjectExist(key)) {
//            throw new ApplicationException(ErrorCode.S3_KEY_OBJECT_DUPLICATED);
//        }
        // write this to temp folder
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();
        s3Client.putObject(putObjectRequest, RequestBody.fromFile(file));
        return "https://cdn1.anhtuan.online/"+key;
    }

    public File writeToTempFolder(MultipartFile file, String folder) throws IOException {
        File tempDir = new File(folder);
        if (!tempDir.exists()) {
            tempDir.mkdirs(); // create the directory if not exists
        }
        File tempFile = new File(folder +"/"+ file.getResource().getFilename());
        file.transferTo(tempFile);
        return tempFile;
    }

    private boolean doesObjectExist(String key) {
        try {
            HeadObjectRequest headObjectRequest = HeadObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();
            s3Client.headObject(headObjectRequest);
            return true;
        } catch (S3Exception e) {
            if (e.statusCode() == 404) {
                return false;
            }
            throw e;
        }
    }
}
