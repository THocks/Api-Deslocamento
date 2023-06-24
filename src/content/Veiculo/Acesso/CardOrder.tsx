import { Card } from '@mui/material';
import { useFetch } from '@/hooks/useSWR';
import OrdersApi from './OrdersApi';

function CardOrder() {
  const { data, mutate } = useFetch(
    'https://api-deslocamento.herokuapp.com/api/v1/Veiculo'
  );

  if (!data) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return (
    <Card>
      <OrdersApi data={data} mutate={mutate} />
    </Card>
  );
}

export default CardOrder;
