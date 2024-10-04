package develup.domain.discussion.comment;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DiscussionCommentRepository extends JpaRepository<DiscussionComment, Long> {

    @Query("""
             SELECT dc
             FROM DiscussionComment dc
             JOIN FETCH dc.member
             WHERE dc.discussion.id = :discussionId
             ORDER BY dc.createdAt ASC
            """)
    List<DiscussionComment> findAllByDiscussionIdOrderByCreatedAtAsc(Long discussionId);

    @Query("""
            SELECT new develup.domain.discussion.comment.MyDiscussionComment(
                dc.id, dc.discussion.id, dc.content, dc.createdAt, d.title.value
            )
            FROM DiscussionComment dc
            JOIN dc.discussion d
            JOIN dc.member m
            WHERE dc.member.id = :memberId AND dc.deletedAt IS NULL
            """)
    List<MyDiscussionComment> findAllMyDiscussionComment(Long memberId);
}
