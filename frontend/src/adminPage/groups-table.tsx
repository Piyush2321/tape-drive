interface Group {
  id: number;
  name: string;
  description: string;
}

interface GroupsTableProps {
  groups: Group[];
}

export function GroupsTable({ groups }: GroupsTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 flex justify-between items-center bg-slate-800 text-white">
        <h2 className="text-xl font-semibold">Manage Groups</h2>
        <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
          Add New Group
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Group Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Description</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {groups.map((group) => (
              <tr key={group.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">{group.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{group.description}</td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

