import React from "react";

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // placeholder — later fetch user by id using adminApi.getUserById
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">User details</h2>
      <div className="p-4 bg-neutral-900 rounded-md">
        <p className="font-semibold">ID: {id}</p>
        <p className="text-sm text-gray-400">Name: John Doe</p>
        <p className="text-sm text-gray-400">Email: john@example.com</p>
      </div>
    </div>
  );
}
