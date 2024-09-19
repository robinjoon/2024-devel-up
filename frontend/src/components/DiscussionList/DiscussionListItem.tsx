import type { Discussion } from '@/types';
import * as S from './DiscussionList.styled';
import Badge from '../common/Badge';

export default function DiscussionListItem({
  title,
  mission,
  hashTags,
  member,
  commentCount,
}: Omit<Discussion, 'id'>) {
  return (
    <S.DiscussionItemContainer>
      <S.ContentWrapper>
        <S.BadgeWrapper>
          {/* TODO: Badge 색상 변경 필요 @프룬 */}
          <Badge text={mission} />
          {hashTags.map((hashTag) => (
            <Badge key={hashTag.id} text={`# ${hashTag.name}`} />
          ))}
        </S.BadgeWrapper>
        <S.Title>{title}</S.Title>
      </S.ContentWrapper>

      <S.DiscussionRight>
        <S.WriterImg src={member.imageUrl} />
        <S.CommentWrapper>
          <S.CommentCountIcon />
          <p>{commentCount}</p>
        </S.CommentWrapper>
      </S.DiscussionRight>
    </S.DiscussionItemContainer>
  );
}