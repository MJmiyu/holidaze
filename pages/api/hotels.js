import hotels from '../../fakeHotels';

const handler = (req, res) => {
  res.status(200).json(hotels);
};

export default handler;
