import { useSuspenseQuery } from '@tanstack/react-query';
import { getMissions } from '@/apis/missionAPI';
import { missionKeys } from './queries/keys';
import { HASHTAGS } from '@/constants/hashTags';
import { useEffect } from 'react';
import { DEFAULT_PAGE_SIZE } from '@/constants/pagination';

interface UseMissionsOptions {
  filter?: string;
  page?: number;
  onPageInfoUpdate?: (currentPage: number, totalPage: number) => void;
}

const useMissions = ({
  filter = HASHTAGS.all,
  page = 0,
  onPageInfoUpdate,
}: UseMissionsOptions = {}) => {
  const { data: missionsResponse } = useSuspenseQuery({
    queryKey: [...missionKeys.all, filter, page],
    queryFn: () => getMissions({ hashTag: filter, page: page.toString(), size: DEFAULT_PAGE_SIZE }),
  });

  const { data, currentPage, totalPage } = missionsResponse;

  useEffect(() => {
    if (onPageInfoUpdate) {
      onPageInfoUpdate(currentPage, totalPage);
    }
  }, [currentPage]);

  return { missions: data, currentPageFromServer: currentPage, totalPage };
};

export default useMissions;
