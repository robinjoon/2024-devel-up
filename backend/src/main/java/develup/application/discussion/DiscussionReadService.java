package develup.application.discussion;

import java.util.List;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.domain.discussion.Discussion;
import develup.domain.discussion.DiscussionRepositoryCustom;
import develup.domain.discussion.comment.DiscussionCommentCounts;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class DiscussionReadService {

    private final DiscussionRepositoryCustom discussionRepositoryCustom;

    public List<SummarizedDiscussionResponse> getSummaries(String mission, String hashTagName) {
        List<Discussion> discussions = discussionRepositoryCustom.findAllByMissionAndHashTagName(mission, hashTagName);
        DiscussionCommentCounts discussionCommentCounts = new DiscussionCommentCounts(
                discussionRepositoryCustom.findAllDiscussionCommentCounts()
        );

        return discussions.stream()
                .map(discussion -> SummarizedDiscussionResponse.of(
                        discussion,
                        discussionCommentCounts.getCount(discussion))
                )
                .toList();
    }

    public List<SummarizedDiscussionResponse> getDiscussionsByMemberId(Long memberId) {
        List<Discussion> myDiscussions = discussionRepositoryCustom.findAllByMemberIdOrderByDesc(memberId);
        DiscussionCommentCounts discussionCommentCounts = new DiscussionCommentCounts(
                discussionRepositoryCustom.findAllDiscussionCommentCounts()
        );

        return myDiscussions.stream()
                .map(discussion -> SummarizedDiscussionResponse.of(
                        discussion,
                        discussionCommentCounts.getCount(discussion))
                )
                .toList();
    }

    public DiscussionResponse getById(Long id) {
        Discussion discussion = getDiscussion(id);

        return createDiscussionResponse(discussion);
    }

    public Discussion getDiscussion(Long id) {
        return discussionRepositoryCustom.findFetchById(id)
                .orElseThrow(() -> new DevelupException(ExceptionType.DISCUSSION_NOT_FOUND));
    }

    private DiscussionResponse createDiscussionResponse(Discussion discussion) {
        if (discussion.getMission() == null) {
            return DiscussionResponse.createWithoutMission(discussion);
        }

        return DiscussionResponse.from(discussion);
    }
}