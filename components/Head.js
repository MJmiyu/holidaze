import Head from 'next/head';

const CustomHead = ({ admin }) => {
  return (
    <Head>
      <title>{admin ? 'Holidaze Admin' : 'Holidaze'}</title>
      <meta
        name="description"
        content={admin ? 'Admin page for holidaze' : 'Hotels in Bergen'}
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export const HolidazeHead = () => {
  return <CustomHead />;
};

export const HolidazeAdminHead = () => {
  return <CustomHead admin />;
};
