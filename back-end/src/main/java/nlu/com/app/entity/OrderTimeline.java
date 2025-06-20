package nlu.com.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import nlu.com.app.constant.EOrderStatus;

import java.time.LocalDateTime;

/**
 * @author Nguyen Tuan
 */
@Entity
@Table(name = "order_timeline")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderTimeline {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long orderTimelineId;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
    @Column(name = "order_status")
    @Enumerated(EnumType.STRING)
    private EOrderStatus orderStatus;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
}
