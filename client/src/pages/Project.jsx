import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/loadingCard';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';
import ClientInfo from '../components/ClientInfo';
import DeleteProjectButton from '../components/DeleteProjectButton';
import EditProjectsForm from '../components/EditProjectsForm';

function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div className='mx-auto w-75 card p-4 pb-2 mb-2'>
          <Link to='/' className='btn btn-light btn-sm w-45 d-inline ms-auto'>
            Back
          </Link>
          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>

          <h5>Project Status:</h5>
          <p>{data.project.status}</p>

          <ClientInfo client={data.project.client} className='mb-2' />

          <hr className='mt-4' />

          <EditProjectsForm project={data.project} />

          <DeleteProjectButton projectId={data.project.id} />
        </div>
      )}
    </>
  );
}

export default Project;
