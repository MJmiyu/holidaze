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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
};

export const HolidazeHead = () => {
  return <CustomHead />;
};

export const HolidazeAdminHead = () => {
  return <CustomHead admin />;
};
