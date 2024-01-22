import React from 'react';

const Orders = ({ orders, products, lineItems })=> {
  let totalItems = []
  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {
          orders.filter(order => !order.is_cart).map( order => {
            const orderLineItems = lineItems.filter(lineItem => lineItem.order_id === order.id);
            return (
              <div>
              <li key={ order.id }>
                ({ new Date(order.created_at).toLocaleString() })
                <ul>
                  {
                    orderLineItems.map( lineItem => {
                      const product = products.find(product => product.id === lineItem.product_id);
                      {totalItems.push(product.price * lineItem.quantity)}
                      return (
                        <li key={ lineItem.id }>
                          { product ? product.name: '' }
                        </li>
                      );
                    })
                  }
                </ul>
              </li>
              <section>
                {order.shipping}
              </section>
              </div>
            );
          })
        }
      </ul>
      <section className="totalOrderPrice">
      Total Price: ${totalItems.reduce((arr, curr) => arr += curr, 0)}
      </section>
    </div>
  );
};

export default Orders;
