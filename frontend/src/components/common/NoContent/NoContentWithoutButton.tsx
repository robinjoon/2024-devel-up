import * as S from './NoContent.styled';
import NoContentImg from '@/assets/images/noContent.svg';

interface NoContentWithoutButtonProps {
  type: 'solution' | 'discussion' | 'mission';
}

export default function NoContentWithoutButton({ type }: NoContentWithoutButtonProps) {
  const INPUT_CONTENT = {
    solution: '풀이가',
    discussion: '디스커션이',
    mission: '미션이',
  };

  return (
    <S.NoContentWrapper>
      <NoContentImg />
      <S.NoContentMessage>아직 해당 태그와 관련된 {INPUT_CONTENT[type]} 없어요!</S.NoContentMessage>
    </S.NoContentWrapper>
  );
}
