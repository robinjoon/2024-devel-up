import * as S from './DashboardDiscussion.styled';
import type { HashTag } from '@/types';
import CommentIcon from '@/assets/images/comment-count.svg';

interface DiscussionItemProps {
  id: number;
  mission: string;
  hashTags: HashTag[];
  title: string;
  imageUrl: string;
  commentCount: number;
}

export default function DiscussionItem({
  id,
  mission,
  hashTags,
  title,
  imageUrl,
  commentCount,
}: DiscussionItemProps) {
  return (
    <S.DiscussionWrapper to={`/discussions/${id}`}>
      <S.TextWrapper>
        <S.HashTagWrapper>
          <S.HashTag $isTitle>{mission}</S.HashTag>
          {hashTags.map((hashTag) => {
            return <S.HashTag key={hashTag.id}>{hashTag.name}</S.HashTag>;
          })}
        </S.HashTagWrapper>
        <S.CommentText>{title}</S.CommentText>
      </S.TextWrapper>
      <S.ImageCommentWrapper>
        <S.ImageWrapper>
          <S.Image src={imageUrl} width={22} height={22} />
        </S.ImageWrapper>
        <S.CommentCountWrapper>
          <CommentIcon width={14} height={14} />
          <S.CommentCountText>{commentCount}</S.CommentCountText>
        </S.CommentCountWrapper>
      </S.ImageCommentWrapper>
    </S.DiscussionWrapper>
  );
}