package nlu.com.app.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;

@Configuration
public class AmazonConfiguration {
    @Value("${app.aws.access-key-id}")
    private String accessKeyId;
    @Value("${app.aws.secret-access-key}")
    private String accessKeySecret;

    @Bean
    public S3Presigner getS3Presigner() {
        AwsBasicCredentials awsBasicCredentials =
                AwsBasicCredentials.create(accessKeyId, accessKeySecret);
        return S3Presigner.builder()
                .region(Region.AP_NORTHEAST_1)
                .credentialsProvider(StaticCredentialsProvider.create(awsBasicCredentials))
                .build();
    }

    @Bean
    @Scope("prototype")
    public S3Client getS3Client() {
        AwsBasicCredentials awsBasicCredentials =
                AwsBasicCredentials.create(accessKeyId, accessKeySecret);
        return S3Client.builder()
                .region(Region.AP_NORTHEAST_1)
                .credentialsProvider(StaticCredentialsProvider.create(awsBasicCredentials))
                .build();
    }
}
