import brain from './brain.png';
import baby from './baby.png';
import product from './products.svg';
import ROUTES from './routes';

const data = [
    {
        name: 'Child Development Program',
        image: brain,
        route: ROUTES.CHILD_DEVELOPMENT
    },
    {
        name: 'National Level Kids Contest',
        image: baby,
        route: ROUTES.BABY_CONTEST
    },
    {
        name: 'Buy Products',
        image: product,
        route: ROUTES.PRODUCTS
    }
];

export const features = [
    'Certificate for all the Participants',
    'Win Gifts / Cash prizes worth ₹11000',
    'Compete among hundreds of participants',
]

export default data;