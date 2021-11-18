import api from "../api";


const createProduct = (product,token) => {
    return api.post("products", {
        ...product,
        price: parseInt(product.price),
        stock: parseInt(product.stock),
        criticalStock: parseInt(product.criticalStock)
    },{headers: { 'Authorization': `Bearer ${token}` }},);
}

const editProduct = (product,token) => {
    return api.patch(`products/${product.id}`, {
        ...product,
        price: parseInt(product.price),
        stock: parseInt(product.stock)
    },{headers: { 'Authorization': `Bearer ${token}` }},);
}

const editStock = (product,token) => {
    return api.patch(`products/stock/${product.id}`, {
        stock: parseInt(product.stock)
    },{headers: { 'Authorization': `Bearer ${token}` }},);
}

const createDeal = (deal,token) => {
    return api.post("/unregistered/deals", {
        ...deal,
    },{headers: { 'Authorization': `Bearer ${token}` }},);
}

const editDeal = (deal,token) => {
    return api.put(`deals/${deal.id}`, {
        ...deal,
        state: deal.state
    },{headers: { 'Authorization': `Bearer ${token}` }},);
}

const createOffer = (discount, token) => {
    return api.post('discounts', {
        ...discount,
        discountPercent: parseInt(discount.discountPercent)/100,
        active: true,
        productId: parseInt(discount.productId),
    },{headers: { 'Authorization': `Bearer ${token}` }},);
}

const editOffer = (discount, token) => {
    return api.patch(`discounts/${discount.productId}`, {
        discountPercent: parseInt(discount.discountPercent)/100,
    },{headers: { 'Authorization': `Bearer ${token}` }},);
}

export const adminRequests = {
    create: {
        message: "El producto ha sido creado",
        method: createProduct
    },
    edit: {
        message: "El producto ha sido actualizado",
        method: editProduct
    },
    stock: {
        messagge: "El stock ha sido actualizado",
        method: editStock
    },
    createDeal: {
        message: "La venta ha sido creada",
        method: createDeal
    },
    editDeal: {
        message: "La venta ha sido actualizada",
        method: editDeal
    },
    createOffer: {
        message: "El descuento ha sido aplicado",
        method: createOffer
    },
    editOffer: {
        message: "El descuento ha sido actualizado",
        method: editOffer
    },
}