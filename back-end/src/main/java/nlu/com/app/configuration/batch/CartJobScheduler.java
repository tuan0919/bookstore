package nlu.com.app.configuration.batch;

import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * @author VuLuu
 */
@Component
@RequiredArgsConstructor
public class CartJobScheduler {

  private final JobLauncher jobLauncher;
  private final Job cartJob;

  @Scheduled(initialDelay = 10_000, fixedRate = 60_000)
  public void scheduleCartJob() {
    try {
      JobParameters params = new JobParametersBuilder()
          .addLong("time", System.currentTimeMillis())
          .toJobParameters();
      jobLauncher.run(cartJob, params);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
