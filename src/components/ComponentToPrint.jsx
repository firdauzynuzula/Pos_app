import React from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
    const { cart, totalAmount } = props;
    return (
        <div ref={ref} className="p-5">
            <h2 className="text-center">Nota Pembelian</h2>
            <table className="table table-bordered table-striped border-dark table-sm">
                <thead>
                    <tr>
                        <td>id</td>
                        <td>Produk</td>
                        <td>Harga</td>
                        <td>Total barang</td>
                        <td>Total</td>
                    </tr>
                </thead>
                <tbody>
                    {cart
                        ? cart.map((cartProduct, key) => (
                              <tr key={key}>
                                  <td>{cartProduct.id}</td>
                                  <td>{cartProduct.name}</td>
                                  <td>{cartProduct.price}</td>
                                  <td>{cartProduct.quantity}</td>
                                  <td>{cartProduct.totalAmount}</td>
                              </tr>
                          ))
                        : ""}
                </tbody>
            </table>
            <h2 className="px-2">Total Harga: Rp:{totalAmount}</h2>
        </div>
    );
});
