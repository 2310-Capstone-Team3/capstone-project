import React from 'react';

const Orders = ({ orders, products, lineItems })=> {
  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {
          orders.filter(order => !order.is_cart).map( order => {
            const orderLineItems = lineItems.filter(lineItem => lineItem.order_id === order.id);
            let orderStr = order.shipping.replace(/[{}"]/g, "")
            return (
              <li key={ order.id }>
                ({ new Date(order.created_at).toLocaleString() })
                <br />
                <br />
                <section>
                  {orderStr.split(',').map(line => <span key={Math.random()}>{line},<br/></span>)}
                  <br />
                  ${order.pricetotal}
                </section>
                <ul>
                  {
                    orderLineItems.map( lineItem => {
                      const product = products.find(product => product.id === lineItem.product_id);
                      return (
                        <li key={ lineItem.id }>
                          { product ? product.name: '' } ({lineItem.quantity})
                        </li>
                      );
                    })
                  }
                </ul>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Orders;
