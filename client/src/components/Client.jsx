import ClientRow from './ClientRow';
import Spinner from './loadingCard';

import { useQuery } from '@apollo/client';
import { GET_CLIENTS } from '../queries/clientQueries';

function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return <p>SOMETHING WENT WRONG</p>;

  return (
    <>
      {!loading && !error && (
        <div>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.clients.map((client) => (
                <ClientRow key={client.id} client={client} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Clients;
