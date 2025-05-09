'use client';

import { Button } from "@/components/ui/button";
import { ProductType } from "@/types/Types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();


    const fetchProducts = async () => {
        const response = await fetch('/api/bagella-db');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteproduct = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            const res = await fetch(`/admin/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            console.log("Product Deleted Successfully");
            fetchProducts();
        } else {
            console.error("Failed to delete product:", res.statusText);
            alert(`Failed to delete product: ${res.statusText}`);
        }
        } catch (error) {
            console.error("Error deleting product:", error);
        alert("An error occurred while deleting the product.");
        }
        
        
    }

    const logout = () => {
        document.cookie = "admin-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        router.push('/admin/login');
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl mb-4 font-bold">Admin Dashboard</h1>
                <Button onClick={logout} variant="destructive">Logout</Button> 
            </div>
           {loading ? <p>Loading...</p> : (
                <table className="w-full table-auto border">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>£{product.price}</td>
                                <td>
                                    <Button onClick={() => console.log("deleteProduct",deleteproduct(product._id))}>Delet</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Dashboard;