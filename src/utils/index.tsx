import { format } from 'date-fns';

export const formatDate = (data: string | any): string => {
  const formattedDate = format(new Date(data), 'yyyy/MM/dd');
  return formattedDate;
};
