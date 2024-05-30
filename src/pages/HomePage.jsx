import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function HomePage() {
    return (
        <MainLayout>
            <div className="bg-light p-5 mt-4 rounded-3">
                <h1>Selamat datang ke POS SYSTEM milik saya</h1>
                <p className="fs-2">
                    Saya membuat sistem kasir ini karena tugas
                </p>
                <p>Jika membutuhkan bantuan tolong hubungi saya </p>
                <Link to="/pos" className="btn btn-primary">
                    Klik disini untuk melanjutkan
                </Link>
            </div>
        </MainLayout>
    );
}

export default HomePage;
