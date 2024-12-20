import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import InfoCard from '@/components/common/InfoCard';
import * as S from './SolutionList.styled';
import useSolutionSummaries from '@/hooks/useSolutionSummaries';
import type { HashTag } from '@/types';
import type { SelectedMissionType } from '@/types/mission';
import NoContentWithoutButton from '../common/NoContent/NoContentWithoutButton';
import { usePagination } from '@/hooks/usePagination';
import { HASHTAGS } from '@/constants/hashTags';
import PageButtons from '../common/PageButtons';
import SpinnerSuspense from '../common/SpinnerSuspense';
import { useEffect, useRef } from 'react';

interface SolutionListProps {
  selectedMission: SelectedMissionType | null;
  selectedHashTag: HashTag | null;
}

export default function SolutionList({ selectedMission, selectedHashTag }: SolutionListProps) {
  const {
    currentPage,
    setTotalPages,
    goToPage,
    goToPreviousGroup,
    goToNextGroup,
    pageNumbers,
    hasPreviousGroup,
    handleInitializePage,
    hasNextGroup,
  } = usePagination();

  const prevMissionRef = useRef(selectedMission);
  const prevHashTagRef = useRef(selectedHashTag);

  useEffect(() => {
    if (prevMissionRef.current !== selectedMission || prevHashTagRef.current !== selectedHashTag) {
      handleInitializePage();
    }

    prevMissionRef.current = selectedMission;
    prevHashTagRef.current = selectedHashTag;
  }, [selectedMission, selectedHashTag, handleInitializePage]);

  const { solutionSummaries } = useSolutionSummaries({
    mission: selectedMission?.title ?? HASHTAGS.all,
    hashTag: selectedHashTag?.name ?? HASHTAGS.all,
    page: currentPage,
    onPageInfoUpdate: (totalPagesFromServer) => {
      setTotalPages(totalPagesFromServer);
    },
  });

  return (
    <>
      <SpinnerSuspense>
        {solutionSummaries.length > 0 ? (
          <S.SolutionList>
            {solutionSummaries.map(({ id, thumbnail, title, description, hashTags }) => (
              <S.SolutionItemWrapper key={id}>
                <Link to={`${ROUTES.solutions}/${id}`} draggable={false}>
                  <InfoCard
                    id={id}
                    thumbnailSrc={thumbnail}
                    title={title}
                    hashTags={hashTags}
                    description={description}
                    thumbnailFallbackText="Solution"
                  />
                </Link>
              </S.SolutionItemWrapper>
            ))}
          </S.SolutionList>
        ) : (
          <NoContentWithoutButton type="solution" />
        )}
      </SpinnerSuspense>

      {solutionSummaries.length > 0 && (
        <PageButtons
          goToNextGroup={goToNextGroup}
          goToPage={goToPage}
          goToPreviousGroup={goToPreviousGroup}
          pageNumbers={pageNumbers}
          hasPreviousGroup={hasPreviousGroup}
          hasNextGroup={hasNextGroup}
          currentPage={currentPage}
        />
      )}
    </>
  );
}
