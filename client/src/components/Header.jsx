import animationData from './assets/graphql.json';
import Lottie from 'lottie-react';

export default function Header() {
  return (
    <nav className='navbar bg-light mb-4 p-0'>
      <div className='container'>
        <a className='navbar-brand' href='/'>
          <div className='d-flex'>
            <Lottie
              animationData={animationData}
              loop={true}
              style={{
                maxWidth: '10%',
                maxHeight: '10%',
              }}
              alt='logo'
              className='mr-2'
            />
            <h1 className='ms-3 mt-1'>Project Managment</h1>
          </div>
        </a>
      </div>
    </nav>
  );
}
