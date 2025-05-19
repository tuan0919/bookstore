package nlu.com.app.configuration.batch;

import lombok.RequiredArgsConstructor;
import nlu.com.app.dto.cart.Cart;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@RequiredArgsConstructor
public class CartBatchJobConfig {

  private final JobRepository jobRepository;
  private final PlatformTransactionManager transactionManager;

  private final CartRedisReader cartReader;
  private final CartProcessor cartProcessor;
  private final CartWriter cartWriter;

  @Bean
  public Job cartJob() {
    return new JobBuilder("cartJob", jobRepository)
        .start(cartStep())
        .build();
  }

  @Bean
  public Step cartStep() {
    return new StepBuilder("cartStep", jobRepository)
        .<Cart, Cart>chunk(10, transactionManager)
        .reader(cartReader)
        .processor(cartProcessor)
        .writer(cartWriter)
        .build();
  }
}
