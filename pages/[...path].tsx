import { GetServerSideProps } from 'next';

export default function WildcardRedirectPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/posts',
      permanent: false,
    },
  };
};