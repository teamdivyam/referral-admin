import React, { useState } from "react";

const SetAdminToken = () => {
    const [email, setEmail] = useState("");
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(
                "https://divyam.com/api/admin-main/set-token",
                {
                    method: "POST",
                    credentials: "include", // Required for cookies
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: "test@example.com" }),
                }
            )
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error("Error:", error));
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <div className="p-6 max-w-lg mx-auto mt-10 bg-white shadow-md rounded">
            <h2 className="text-2xl font-semibold mb-4">Set Admin Token</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Enter admin email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Generate Token
                </button>
            </form>

            {response && (
                <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded">
                    <p>
                        <strong>Success:</strong> {response.message}
                    </p>
                    {response.token && (
                        <p>
                            <strong>Token:</strong>{" "}
                            <code className="break-all">{response.token}</code>
                        </p>
                    )}
                    {response.user && (
                        <p>
                            <strong>User:</strong> {response.user.email} (
                            {response.user.role})
                        </p>
                    )}
                </div>
            )}

            {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded text-red-700">
                    <p>
                        <strong>Error:</strong> {error}
                    </p>
                </div>
            )}
        </div>
    );
};

export default SetAdminToken;
