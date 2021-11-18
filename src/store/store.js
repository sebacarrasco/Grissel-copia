import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { adminReducer } from '../reducers/adminReducer';
import { adminSaleReducer } from '../reducers/adminSaleReducer';
import { adminPackReducer} from "../reducers/adminPackReducer";
import { authReducer } from '../reducers/authReducer';
import { cartReducer } from '../reducers/cartReducer';
import { uiReducer } from '../reducers/uiReducer';
import { searchReducer } from '../reducers/searchReducer';
import { checkoutReducer } from '../reducers/checkoutReducer';
import { categoryReducer } from '../reducers/categoryReducer';
import { adminSelectReducer } from '../reducers/adminSelectReducer';
import { lineChartReducer } from '../reducers/lineChartReducer';
import { barChartReducer } from '../reducers/barChartReducer';
import { popularProductsReducer } from '../reducers/popularProductsReducer';

// Para redux devtools
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ["lineChart", "barChart"]
}
const reducers = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    ui:  uiReducer,
    admin: adminReducer,
    search: searchReducer,
    checkout: checkoutReducer,
    category: categoryReducer,
    adminSale: adminSaleReducer,
    adminPack: adminPackReducer,
    adminSelect: adminSelectReducer,
    lineChart: lineChartReducer,
    barChart: barChartReducer,
    popularProductsDates: popularProductsReducer
    });

const persistedReducer = persistReducer(persistConfig, reducers);


export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk)) //Para resolver acciones asíncronas
);

export const persistor = persistStore(store);