'use client';

import { Button } from "@/components/ui/button";
import { ProductType } from "@/types/Types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [newProduct, setNewProduct] = useState({name: "", price: "", image: "", description: ""});
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    
    const addProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/admin/add', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newProduct),
            });
            if (res.ok) {
                setNewProduct({name: "", price: "", image: "", description: ""})
                fetchProducts();
            }
        } catch (error) {
            console.error("Error adding Product:", error)
            
        }
    }
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
        <>
            <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl mb-4 font-bold">Admin Dashboard</h1>
                <Button onClick={logout} variant="destructive">Logout</Button> 
            </div>
            <h1 className="text-2xl mb-4 font-bold">Add Product</h1>
            <form onSubmit={addProduct} className="mb-8 space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="border p-2 w-full"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="border p-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="border p-2 w-full"
                />
                <textarea
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="border p-2 w-full"
                />
                <Button type="submit">Add Product</Button>
            </form>
            {/* Existing product list rendering */}
        </div>
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl mb-4 font-bold">Delete Product</h1> 
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
        </>
        
    )
}

export default Dashboard;