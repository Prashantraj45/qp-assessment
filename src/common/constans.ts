export const DBENUM = 'DB_CONNECTION';
export enum TableBank {
    orders = 'orders',
    order_items = 'order_items',
    inventory = 'inventory',
    users = 'users',
    admin = 'admin',
    categories = 'categories',
    grocery_items = 'grocery_items',
    tokens = 'tokens',
    pricing = 'pricing',
}
export enum REPOENUM {
    USERREPO = 'USERREPO',
    ORDERREPO = 'ORDERREPO',
    INVENTORYREPO = 'INVENTORYREPO',
    CATEGORYREPO = 'CATEGORYREPO',
    ORDERSREPO = 'ORDERSREPO',
    ORDERITEMREPO = 'ORDERITEMREPO',
    ADMINREPO = 'ADMINREPO',
    TOKENREPO = 'TOKENREPO',
    GROCERYITEMREPO = 'GROCERYITEMREPO',
    PRICINGREPO = 'PRICINGREPO',
}