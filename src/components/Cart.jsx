import { useCart } from '../context/CartContext';
import CartSvg from './CartSvg';

const Cart = () => {
    const { cartCount } = useCart();
    return (
        <div className="flow-root">
            <a href="#" className="group -m-2 flex items-center p-2">
                <CartSvg />
                <span className="ml-1 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartCount}</span>
                <span className="sr-only">items in cart, view bag</span>
            </a>
        </div>
    );
};

export default Cart;