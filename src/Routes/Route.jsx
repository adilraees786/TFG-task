

import Cart from '../ReusableComponents/Cart'

import CartDetails from '../ReusableComponents/CartDetail'
import Contactus from '../Screens/Contactus'
import Dashboard from '../Screens/Dashboard'


export const routelist = [


    {
        path: '/dashboard',
        element: <Dashboard/>
    },
    {
        path: '/cart-details',
        element: <CartDetails/>
    },
    {
        path: '/cart',
        element: <Cart/>
    },
    {
        path: '/contactus',
        element: <Contactus/>
    },
    


]


