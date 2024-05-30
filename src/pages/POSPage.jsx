import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
import { toast } from "react-toastify";
import { ComponentToPrint } from "../components/ComponentToPrint";
import { useReactToPrint } from "react-to-print";

function POSPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const toastOptions = {
        autoClose: 500,
        pauseOnHover: true,
    };

    const fetchProducts = async () => {
        setIsLoading(true);
        const result = await axios.get("products");
        setProducts(await result.data);
        setIsLoading(false);
    };

    const addProductToCart = async (product) => {
        // check if the adding product exist
        let findProductInCart = await cart.find((i) => {
            return i.id === product.id;
        });

        if (findProductInCart) {
            let newCart = [];
            let newItem;

            cart.forEach((cartItem) => {
                if (cartItem.id === product.id) {
                    newItem = {
                        ...cartItem,
                        quantity: cartItem.quantity + 1,
                        totalAmount: cartItem.price * (cartItem.quantity + 1),
                    };
                    newCart.push(newItem);
                } else {
                    newCart.push(cartItem);
                }
            });

            setCart(newCart);
            toast.success(`Menambahkan jumlah ${newItem.name}`, toastOptions);
        } else {
            let addingProduct = {
                ...product,
                quantity: 1,
                totalAmount: product.price,
            };
            setCart([...cart, addingProduct]);
            toast.success(`Menambahkan  ${product.name} `, toastOptions);
        }
    };

    const removeProduct = async (product) => {
        const newCart = cart.filter((cartItem) => cartItem.id !== product.id);
        setCart(newCart);
    };

    const componentRef = useRef();

    const handleReactToPrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handlePrint = () => {
        handleReactToPrint();
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        let newTotalAmount = 0;
        cart.forEach((icart) => {
            newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
        });
        setTotalAmount(newTotalAmount);
    }, [cart]);

    return (
        <MainLayout>
            <div className="row">
                <div className="col-lg-8">
                    {isLoading ? (
                        "Loading"
                    ) : (
                        <div className="row">
                            {products.map((product, key) => (
                                <div key={key} className="col-lg-4 mb-4">
                                    <div
                                        className="pos-item px-3 text-center border"
                                        onClick={() =>
                                            addProductToCart(product)
                                        }
                                    >
                                        <p>{product.name}</p>
                                        <img
                                            src={product.image}
                                            className="img-fluid"
                                            alt={product.name}
                                        />
                                        <p>Rp:{product.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="col-lg-4">
                    <div style={{ display: "none" }}>
                        <ComponentToPrint
                            cart={cart}
                            totalAmount={totalAmount}
                            ref={componentRef}
                        />
                    </div>
                    <div className="table-responsive ">
                        <table className="table table-responsive table-hover table-bordered border-dark border-2 table-striped table-lg">
                            <thead>
                                <tr>
                                    <td>id</td>
                                    <td>Produk</td>
                                    <td>Harga</td>
                                    <td>Jumlah</td>
                                    <td>Total</td>
                                    <td>Aksi</td>
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
                                              <td>
                                                  <button
                                                      className="btn btn-danger btn-sm"
                                                      onClick={() =>
                                                          removeProduct(
                                                              cartProduct
                                                          )
                                                      }
                                                  >
                                                      Hapus
                                                  </button>
                                              </td>
                                          </tr>
                                      ))
                                    : "No Item in Cart"}
                            </tbody>
                        </table>
                        <h2 className="px-2 text-dark">
                            Total Harga: Rp:{totalAmount}
                        </h2>
                    </div>

                    <div className="mt-3">
                        {totalAmount !== 0 ? (
                            <div>
                                <button
                                    className="btn btn-primary"
                                    onClick={handlePrint}
                                >
                                    Bayar Sekarang
                                </button>
                            </div>
                        ) : (
                            "Tolong Masukkan sebuah produk ke dalam keranjang"
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default POSPage;
