import ROUTES from "./routes";
import PaidIcon from '@mui/icons-material/Paid';
import SellIcon from '@mui/icons-material/Sell';

export const buttons = [
    {
        name: 'Transactions',
        route: ROUTES.TRANSACTIONS,
        startIcon: <PaidIcon />
    },
    {
        name: 'Your Products',
        route: ROUTES.PRODUCTS,
        startIcon: <SellIcon />
    }
]