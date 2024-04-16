export { getPaginatedProductsWithImages } from "./shop/product/get-product-pagination";
export { getStockBySlug } from "./shop/product/get-stock-by-slug";
export { getProductBySLug } from "./shop/product/get-product-by-slug";
export { createUpdateProduct } from "./shop/product/create-update-product";
export {
  createOrReplaceAddress,
  setUserAddress,
} from "./shop/checkout/set-user-address";
export { deleteProductImage } from "./shop/product/delete-product-image";
export { getPaginatedOrders } from "./shop/admin/get-paginated-orders";
export { getCategories } from "./shop/admin/get-categories";
export { getOrderById } from "./shop/checkout/get-order-by-id";
export { setTransactionId } from "./payments/set-transaction-id";
export { getOrdersByUser } from "./shop/checkout/get-orders-by-users";
export { getCountries } from "./shop/checkout/get-countries";
export { deleteUserAddress } from "./shop/checkout/delete-user-address";
export { placeOrder } from "./shop/checkout/place-order";
export { getUserAddress } from "./shop/checkout/get-user-address";

export { authenticate } from "./auth/login";
export { logout } from "./auth/logout";
export { registerUser } from "./auth/register";

export { getPaginatedUsers } from "./users/get-users";
export { changeUserRole } from "./users/change-user-role";
