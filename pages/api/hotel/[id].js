import hotels from '../../../fakeHotels';

const handler = (req, res) => {
  const { id } = req.query;
  const hotel = hotels.find((hotel) => hotel.id == id);
  res.status(200).json(hotel);
};

export default handler;
